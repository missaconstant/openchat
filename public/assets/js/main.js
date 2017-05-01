var messages = {
	send: function(message){
		/* send with socket */
		socket.emit('usermessage',{
			from: server.me,
			to: server.conversationwith,
			message: message
		}) ;
		/**/
		new this.create(message,'own') ;
		/* register to bd */
		this.addmsgtobd(server.me,server.conversationwith,message,'own') ;
	},

	receive: function(sender,message){
		if(server.conversationwith==sender){
			new this.create(message) ;
			server.ring() ;
		}
		else{
			_('#'+sender).css({background:'rgba(245,141,71,0.5)'}) ;
			server.ring() ;
		}
		/* register message to bd */
		this.addmsgtobd(sender,server.me,message) ;
	},

	create: function(content,type=false){
		var top = this ;

		return (function(content,type){
			this.parent = _('div.body div.content') ;
			this.wrapper = _createElement('div', {class:'a-message'+(type&&type.length?' '+type:'')}) ;
			this.message = _createElement('div', {class:'message'}, false, this.wrapper, content) ;
			/* for playing */
			this.playbtn = _createElement('i',{class:'ion-ios-play'},{cursor:'pointer'}) ;
			/* for download */
			this.downbtn = _createElement('a',{class:'dwnd',download:"true"},false,false,'<i class="ion-ios-download-outline"></i>') ;

			/* msg is an emoticon */
			if(/\[[a-zA-Z0-9]+\:[a-zA-Z0-9]+\]/.test(content)){
				var emosparsed = content.split('[')[1].split(']')[0].split(':') ;
				this.message.innerHTML = '' ;
				this.message.css({background:'none'}) ;
				this.message.appendChild(_createElement('img',{
					src: 'assets/emoticons/'+emosparsed[0]+'/'+emosparsed[1]+'.png'
				})) ;
			}
			else if(/data\:audio\/wav;base64,/.test(content)){
				this.message.innerHTML = '' ;
				this.playbtn.addto(this.message) ;
				this.message.innerHTML += ' : Audio file' ;
				this.message.attr({'data-aux':content}) ;
			}
			else if(/file\:[a-zA-Z0-9]+/.test(content)){

				var fname = content.split(':')[2].split(']')[0] ;
				this.message.innerHTML = '' ;
				/*download btn*/
				this.downbtn.href = 'server/files_uploaded/'+fname ;
				this.downbtn.download = 'server/files_uploaded/'+fname ;
				this.downbtn.addto(this.message) ;
				
				if(content.split(':')[1].toLowerCase()=='image'){
					this.message.appendChild(_createElement('img',{
						src: 'server/files_uploaded/'+fname
					})) ;
				}
				else{
					this.message.appendChild(_createElement('img',{
						src: 'assets/images/file.png'
					},{
						maxWidth: '200px'
					})) ;
				}
			}

			this.wrapper.css({transform:'translateX('+(type?'30':'-30')+'px)'}) ;
			this.wrapper.addto(this.parent) ;
			this.wrapper.css({transform:'translateX(0)'}) ;

			scrollChat() ;

			this.message.addEventListener('click',function(e){
				if(e.target.className=='ion-ios-play'){
					server.audioPlayer.play(this.attr('data-aux')) ;
				}
			},false) ;
		})(content,type) ;
	},

	toogleconversation: function(username){
		/* top */ var top = this ;
		this.box.innerHTML = '' ;
		/* getting messages from bd */
		var messages = this.getmessages(username) ;
		if(messages){
			messages.forEach(function(m){
				new top.create(m.message,m.type) ;
			}) ;
		}
	},

	addmsgtobd: function(sender,to,msg,type){
		var user = window.localStorage.getItem('openchatUser') ;
			user = JSON.parse(user) ;
			/* who with am i conversiong ? */
			var converser = sender==server.me ? to : sender ;
			/* if exists conversation with this user */
			if(user.discussions[converser]){
				/* formatting the message */
				var newmessage = this.formatmsg(sender,to,msg,type) ;
				/* adding the message to discussion db */
				user.discussions[converser].push(newmessage) ;
			}
			/* if no conversation exists */
			else{
				/* creating discution with sender */
				user.discussions[converser] = [] ;
				/* formatting the message */
				var newmessage = this.formatmsg(sender,to,msg,type) ;
				/* adding the message to the fresh conversation */
				user.discussions[converser].push(newmessage) ;
			}
			/* convert back user to bd format */
			user = JSON.stringify(user) ;
			/* update bd */
			window.localStorage.setItem('openchatUser',user) ;
	},

	formatmsg: function(sender,to,msg,type){
		return {
			to: to,
			sender: sender,
			message: msg,
			type: type ? type : '',
			date: new Date()
		} ;
	},

	getmessages: function(username){
		var user = JSON.parse(window.localStorage.getItem('openchatUser')) ;
		return user.discussions[username] ;
	},

	parseemostext: function(mtext){
		return mtext.split('[')[1].split(']')[0].split(':') ;
	},

	box: _('div.body div.content')
}

var server = {
	/* me */
	me: '',
	/* who is conving with */
	conversationwith: '',
	/**/
	message: {
		container: _('div.srv-msg-ctn'),
		content: _('.srv-msg-ctt .contnt'),
		left: _('.srv-msg-left'),
		right: _('.srv-msg-right'),
		type: 'success',
		send: function(type,message){
			/* setting type */
			if(type){
				this.left.className = this.left.className.split(' ')[0]+' '+type ;
			}
			/**/
			this.left.innerHTML = '<i class="ion-checkmark-circled"></i>' ;
			this.content.innerHTML = message ;
			this.container.
				css({transform:'translateX(0px)', opacity:'1'}).
				css({transform:'translateX(500px)', opacity:'0'},2000) ;
		}
	},

	user: function(username){
		/* top */var top1 = this ;
		return (function(pseudo){
			/* top */var top2 = this ;
			this.pseudo = pseudo ;
			this.parent = _('div.left div.bottom div.users') ;
			this.me = _createElement('div',{class:'user',id:pseudo}) ;
			this.thumb = _createElement('div',{class:'thumb'},false,this.me,pseudo.split('')[0].toUpperCase()) ;
			this.username = _createElement('div',{class:'username'},false,this.me,'<b>'+pseudo+'</b><span>Lorem ipsum dolor sit amet, ...</span>') ;
			/* adding to visual list */
			this.me.addto(this.parent) ;
			this.me.css({transform:'translateX(0px)'}) ;
			/* events */
			this.me.onclick = function(e){
				changeUserConv(pseudo) ;
				this.style.background = '';
			} ;

		})(username) ;
	},

	adduser: function(username){
		this.users[username] = new this.user(username) ;
	},

	goto: function(url,timeout){
		var apply = function(){
			window.location = url ;
		} ;
		/**/
		if(timeout)
			setTimeout(function(){
				apply() ;
			},timeout) ;
		else
			apply() ;
	},

	audio: false,

	audioPlayer: {
		player: _createElement('audio',{src:''},{display:'none'},document.body),
		play: function(link){
			this.player.src = link ;
			this.player.play() ;
		}
	},

	ring: function(){
		if(this.audio)
			this.audio.play() ;
	},

	users: {}
}

function scrollChat(){
	$('div.body div.content').animate({
		scrollTop: _('div.body div.content').scrollHeight
	},500) ;
}

(function(source){
	server.audio = _createElement('audio',{src:source},{display:'none'},document.body) ;
})('assets/songs/01.mp3') ;

function changeUserConv(username){
	/* change user name on the top */
	_('.userlastseen b').textContent = username ;
	_('.userlastseen span').textContent = "Last seen 10 hours ago" ;
	/* change conversation user name */
	server.conversationwith = username ;
	/* toogle conversation */
	messages.toogleconversation(username) ;
	/* if hidebefore, hide it */
	_('.hidebefore')._hide() ;
}

/* receiver deamon */
(function(s){
	if(!s) return ;
	s.on('receivingmessage',function(data){
		if(data.to==server.me){
			messages.receive(data.from,data.message) ;
		}
	}) ;
})(socket) ;