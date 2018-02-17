var socket = io.connect('http://192.168.43.56:8080') ;

/* socket uploader */
var uploader = new SocketIOFileUpload(socket);
	uploader.listenOnInput(document.getElementById("filetogo"));

	uploader.addEventListener("progress", function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
    });

    uploader.addEventListener('complete', function(event){
    	var extension = event.file.type.split('/')[0] ;
    	messages.send("[file:"+(extension||"unknown")+":"+event.file.name+"]") ;
    }) ;

/**/
window.onload = function() {
	var isLogged = false
	/* is user logged on ? */
	var st = window.localStorage ;
	/* if not get him back to login page */
	if (!st.getItem('openchatUser')) {
		server.goto('/') ;
	}
	/* asking to socket if he know me */
	socket.emit('doyouknowme',JSON.parse(st.getItem('openchatUser')).username) ;
	socket.on('knowyou',function (rep) {
		if (rep=='true') {
			isLogged = JSON.parse(st.getItem('openchatUser')).username ;
			if (isLogged) {
				/* setting pseudo */
				server.me = isLogged ;
				/* getting connected users */
				socket.emit('getconnectedusers',isLogged) ;
			}
		}
		else {
			server.goto('index.html') ;
		}
	}) ;

	/* is writting */
	_('div.textarea').onfocus = function() {
		socket.emit('iswritting',{
			writter: server.me,
			to: server.conversationwith
		}) ;
	} ;
	_('div.textarea').onblur = function() {
		socket.emit('endwritting',{
			writter: server.me,
			to: server.conversationwith
		}) ;
	} ;
} ;

/* socket events */

	/* getting connected user list */
socket.on('usersconnected',function(users){
	users.forEach(function(username){
		var registeredUser = JSON.parse(window.localStorage.getItem('openchatUser')) ;
		if(registeredUser.username != username)
			server.adduser(username) ;
	}) ;
}) ;

	/* getting new user */
socket.on('newuser',function(username){
	var registeredUser = JSON.parse(window.localStorage.getItem('openchatUser')) ;
	if(!server.users[username] && registeredUser.username != username){
		server.adduser(username) ;
	}
	server.message.send('info','<b>'+username+'</b> est maintenant en ligne !') ;
}) ;

	/* user is writting */
socket.on('iswritting',function(data){
	if(data.to==server.me){
		if(data.writter==server.conversationwith)
			_('.userlastseen span').textContent = "est en train d'écrire ..." ;
		else{
			// somthing
		}
	}
}) ;

socket.on('endwritting',function(data){
	if(data.to==server.me){
		_('.userlastseen span').textContent = "Last seen 10 hours ago" ;
	}
}) ;