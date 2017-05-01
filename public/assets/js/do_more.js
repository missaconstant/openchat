/* written by Dream'dev 2015*/

	var proto = HTMLElement.prototype ;


	proto.css = function(styl,delay,handler){
		var top = this ;
		/* to set */
		var set = function(){
			for(var prop in styl){
				if(getComputedStyle(top,null)[prop]!=(null && false)){
					top.style[prop] = styl[prop] ;
				}
				else{
					console.log('undefined property '+prop) ;
				}
			}
			if(handler) handler() ;
		} ;
		/* to get */
		var get = function(){
			return getComputedStyle(top,null)[styl] ;
		} ;

		if(typeof styl==='object'){
			if(delay){
				setTimeout(function(){ set(); },delay||0) ;
			}
			else set() ;
			return top ;
		}
		else if(typeof styl==='string'){
			get() ;
		}
	} ;


	/* cette methode permet de reccuperer ou d'assigner une largeur à un élement */
	proto._width = function(val,delay){
		var top = this ;

		var apply = function(){
			if(val) top.css({width:(typeof val=='number') ? val+'px' : val}) ;
		} ;

		if(delay){
			setTimeout(function(){
				apply() ;
			},delay||0) ;
		}
		else{
			apply() ;
		}
		return (val) ? top : top.offsetWidth ;
	} ;


	/* cette methode permet de reccuperer ou d'assigner une hauteur à un élement */
	proto._height = function(val,delay){
		var top = this ;

		var apply = function(){
			if(val) top.css({height:(typeof val=='number') ? val+'px' : val}) ;
		} ;
		
		if(delay){
			setTimeout(function(){
				apply() ;
			},delay||0) ;
		}
		else{
			apply() ;
		}
		return (val) ? top : top.offsetHeight ;
	} ;

	proto._left = function(val,delay){
		var top = this, ret ;

		setTimeout(function(){
			if(val){
				ret = top ;
				if(top.css('position')=='absolute' || top.css('position')=='fixed'){
					top.css({left:(typeof val=='number') ? val+'px' : val}) ;
				}else{
					top.css({marginLeft:(typeof val=='number') ? val+'px' : val}) ;
				}
			}
		},delay||0) ;

		if(!val){
			ret = (top.css('position')=='absolute' || top.css('position')=='fixed') ? top.css('left').split('p')[0] : top.css('marginLeft').split('p')[0] ;
		}
		else ret = top ;

		return ret ;
	} ;

	proto._top = function(val,delay){
		var top = this, ret ;

		setTimeout(function(){
			if(val){
				ret = top ;
				if(top.css('position')=='absolute' || top.css('position')=='fixed'){
					top.css({top:(typeof val=='number') ? val+'px' : val}) ;
				}else{
					top.css({marginTop:(typeof val=='number') ? val+'px' : val}) ;
				}
			}
		},delay||0) ;

		if(!val){
			ret = (top.css('position')=='absolute' || top.css('position')=='fixed') ? top.css('top').split('p')[0] : top.css('marginTop').split('p')[0] ;
		}
		else ret = top ;
		
		return ret ;
	} ;
	

	proto.centerX = function(delay){ // element have to be absolute on his parent
		var top = this ;
		var exec = function(){
			if(top.css('position')=='absolute'){
				var lefts = (top.parentNode.offsetWidth/2) - (top.offsetWidth/2) +'px' ;
				top.css({'left':lefts}) ;
			}
			else{
				var lefts = (top.parentNode.offsetWidth/2) - (top.offsetWidth/2) +'px' ;
				top.parentNode.css({'paddingLeft':lefts}) ;
			}
		} ;

		if(delay){
			setTimeout(function(){
				exec() ;
			},delay||0) ;
		}else
			exec() ;

		return top ;
	} ;
	
	proto.centerY = function(delay){ // element have to be absolute on his parent
		var top = this ;
		var exec = function(){
			if(top.css('position')=='absolute'){
				var tops = (top.parentNode.offsetHeight/2) - (top.offsetHeight/2) +'px' ;
				top.css({'top':tops}) ;
			}
			else{
				var tops = (top.parentNode.offsetHeight/2) - (top.offsetHeight/2) +'px' ;
				top.parentNode.css({'paddingTop':tops}) ;
			}
		} ;

		if(delay){
			setTimeout(function(){
				exec() ;
			},delay||0) ;
		}
		else
			exec() ;
		
		return top ;
	} ;
	
	proto.centerXY = function(delay){ // element have to be absolute on his parent
		var ti = this ;
		setTimeout(function(){
			ti.centerX().centerY() ;
		},delay||0) ;
		return ti ;
	} ;
	
	proto._hide = function(delay){
		var top = this ;
		var apply = function(){
			top.css({'display':'none'}) ;
		} ;

		if(delay){
			setTimeout(function(){
				apply() ;
			},delay||0) ;
		}
		else apply() ;
		return this ;
	} ;
	
	proto._show = function(delay){
		var top = this ;
		var apply = function(){
			top.css({'display':'inherit'}) ;
		} ;

		if(delay)
			setTimeout(function(){ apply(); },delay||0) ;
		else
			apply() ;

		return this ;
	} ;
	
	proto.addto = function(parent,delay){
		var top = this ;
		var apply = function(){
			parent.appendChild(top) ;
		} ;
		if(delay){
			setTimeout(function(){
				apply() ;
			},delay||0) ;
		}
		else{
			apply() ;
		}
		return top ;
	} ;
	
	proto._before = function(target,delay){
		var top = this ;
		setTimeout(function(){
			target.parentNode.insertBefore(top,target) ;
		},delay||0) ;
		return top ;
	} ;
	
	proto._after = function(target,delay){
		var top = this ;
		setTimeout(function(){
			if(target.nextSibling)
				target.parentNode.insertBefore(top,target.nextSibling) ;
			else
				target.parentNode.appendChild(top) ;
		},delay||0) ;
		return top ;
	} ;
	
	proto._remove = function(delay,handler){
		var top = this ;
		setTimeout(function(){
			top.parentNode.removeChild(top) ;
			top = false ;
			if(handler) handler() ;
		},delay||0) ;
		return (!top)?true:false ;
	} ;

	proto._childs = function(pos,enableTextNode){
		var top = this, childs = [] ;
		top.childNodes.forEach(function(child){
			if(enableTextNode && child.nodeName=="#text"){
				childs.push(child) ;
			}
			else if(child.nodeName!="#text"){
				childs.push(child) ;
			}
		}) ;
		/* returns */
		return pos || pos==0 ? childs[pos] : childs ;
	} ;
	
	proto.attr = function(attributes){
		if(typeof attributes === 'object'){ 
			for(var at in attributes){
				
					this.setAttribute(at,attributes[at]) ;
		
				if(attributes[at].length==0){
					this.removeAttribute(at) ;
				}
			}
			return this ;
		}
		else if(typeof attributes === 'string'){
			return this.getAttribute(attributes) ;
		}
	} ;

	proto.adclax = function(className,delay){
		var top = this ;

		var _apply = function(){
			if(top.className.length<=1){
				top.className = className ;
			}
			else{
				var classes = top.className ;
				if(classes.trim().split(' ').length>1){
					classes = classes.trim().split(' ') ;
					var new_class = '' ;
					for(var i=0; i<classes.length; i++){
						if(classes[i].trim().length>0) new_class += ' '+classes[i] ;
					}
					new_class += ' '+className ;
					top.className = new_class.trim() ;
				}
				else if(classes.trim().split(' ').length==1){
					top.className = classes.trim() + ' '+ className ;
				}
			}
		} ;

		if(delay){
			setTimeout(function(){
				_apply() ;
			},delay||0) ;
		}
		else{
			_apply() ;
		}

		return top ;
	} ;

	proto.removeclax = function(className,delay){
		var top = this ;
		setTimeout(function(){
			var classes = top.className ;
			if(classes.trim().split(' ').length==1 && classes.trim()==className) top.attr({'class':''}) ;
			else if(classes.trim().split(' ').length>1){
				classes = classes.trim().split(' ') ;
				var count = 0 ; // count matches
				for(var i=0; i<classes.length; i++){
					if(classes[i].trim()==className){
						classes[i] = '' ;
						count++ ;
					}
				}

				if(count==0) console.error('la classe que vous essayez de retirer n\'est pas définie.') ;
				else {
					top.className = classes.join(' ') ;
					top.className = top.className.trim() ;
				}
			}
		},delay||0) ;
		return top ;
	} ;

	/*
	* Cette methode permettra de verifier si l'objet sur lequel elle est appliquée
	* a la classe "classeName" passée en paramètre
	* USAGE : elHtml.hasclax(classeAverifier) ;
			  retourne vrai si l'élément a bien la classe
			  retourne faux si l'élément n'a pas la classe
	*/
	proto.hasclax = function(className){
		var top = this, has = false ;
			var classes = top.className.split(' ') ;
			for(var i=0; i<classes.length; i++){
				if(className==classes[i].trim()){
					has = true ;
					break ;
				}
			}
		return has ;
	} ;


	/*
	* Cette methode permettra de verifier :
	*	- soit si l'élement à un ou des éléments enfants
	*	- soir si l'élément à un ou plusieurs éléments enfants dont qui peuvent être identifiés par le paramètre rensigné.
	*/

	proto.haschild = function(val){
		var top = this, res = false ;
		if(!val){
			for(var i=0; i<top.childNodes.length; i++){
				if(top.childNodes[i].nodeName != '#text'){ res = true; break; }
			}
		}
		else{
			top.adclax('_searching_on_this_now') ;
			if(_('._searching_on_this_now > '+val)) res = true ;
		}

		return res ;
	} ;



	/*
	*	cette methode permet d'envoyer simplement un formulaire par iframe
	*/
	proto.targed = function(handler,options){
		var top = this ;
		if(top.nodeName=='FORM'){
			var frame = document.createElement('iframe') ;
			var targedDOC = {'_document':false, '_html':false, '_text':false, '_json':false} ;
			une_var = 'du text' ;
			frame.attr({'id':'helpframe','name':'helpframe','src':''}) ;
			frame.style.display = 'none' ;
			document.body.appendChild(frame) ;
			top.target = 'helpframe' ;
			top.submit() ;
			
			frame.onload = function(){
				targedDOC._document = frame.contentDocument ;
				targedDOC._html = targedDOC._document.body.innerHTML ;
				targedDOC._text = targedDOC._document.body.textContent ;
				if(options && options.json==true) targedDOC._json = JSON.parse(targedDOC._text) ;
				frame.parentNode.removeChild(frame) ;
				if(handler) handler(targedDOC) ;
			} ;
		}
		else{
			console.log('method utilisable que sur element FORM.') ;
		}
		return top ;
	} ;

	proto.ajaxed = function(opts){
		var top = this;
		if(top.nodeName.toLowerCase()!="form") console.error("function utilisable seulement sur balise FORM") ;
		else{
			var q = new XMLHttpRequest(), form = new FormData(top) ;
			q.open(top.method,top.action) ;
			q.timeout = (opts.timeout)?opts.timeout:10000 ;
			q.send(form) ;
			q.onload = function(){
				if(q.status==200){
					if(opts.success) opts.success(q.responseText) ;
				}
				else{
					if(opts.error) opts.error() ;
				}
			} ;
			q.onprogress = function(e){
				if(opts.progress) opts.progress(((e.loaded*100)/e.total)) ;
			}
		}
	} ;
	
	/*
	* autocomplete received data format : 
	* <div class="_auto_">
	*	<img src="yourimage"/>
	*	<span>there you text</span>
	* </div>
	*/
	proto._autocomplete = function(datas,handler){
		/*	datas proprieties and methods
			class : means the css class of auto box
			movingdefaultcss : correspond to default style attributed to element on selection in auto
			outputdefaultcss : correspond to default style attributed to auto
			value : Tell if user want to send value to server
			onselection : correspond to function which is execute when user select an item on auto
		*/
		var top = this, position = 0, written = "" ;
		if(top.nodeName=='INPUT' && top.getAttribute("type")=="text" || top.getAttribute("type")=="search"){
			var q = new XMLHttpRequest(),
			    auto = document.createElement('div') ;

			    datas.class = (datas.class)?datas.class:'_box' ; // giving auto class
			    auto.css({
			    	width: top.parentNode._childs(0).offsetWidth+"px",
			    	minHeight: "0px",
			    	/* "maxHeight":"70px",
			    	"overflow":"auto",*/
			    	position: "absolute",
			    	left: /*top.offsetLeft - top.parentNode.offsetLeft +*/ "0px",
			    	top: top.parentNode._childs(0).offsetHeight+"px",
			    	background: "white",
			    	color: "black",
			    	/* boxShadow: "0px 0px 2px 0px", */
			    	textAlign: "left",
			    	padding: "0px",
			    	zIndex: "2000",
			    	borderTop: "1px solid #e7e7e7"
			    	/*"border":"1px solid #000"*/
			    },100).attr({"class":datas.class}) ;
			    if(top.parentNode.css('position')=='static') top.parentNode.css({"position":"relative"}) ;
			    auto.addto(top.parentNode) ;
			    top.autocomplete = "off" ;
			    
			    datas.movingdefaultcss = {
			    	"background":"#f7f7f7",
			    	"color":"#319cee",
			    	"padding":"5px"
			    }
			    datas.outputdefaultcss = {
			    	"background":"#fff",
			    	"color":"#535353",
			    	"padding":"5px",
			    	"minHeight":"30px"
			    }
			
			top.onkeyup = function(e){
				if(top.value.length>0 && e.which!=18 && e.which!=17 && e.which!=16 && e.which!=20){
					switch(e.which){
						case 13:
							if(_('.h') && auto.css('display')!='none'){
								auto._hide() ;
								if(datas.onselection) datas.onselection(_('.h')) ;
							}
						break;

						case 27:
							auto._hide() ;
							top.value = written ;
						break ;

						case 38:
							e.preventDefault() ;
							if(!_('.h')){
								/* console.log(auto.childNodes.length) ; */
								var ft = auto.childNodes[auto.childNodes.length-1].nodeName=="#text"?auto.childNodes[auto.childNodes.length-1].previousSibling:auto.childNodes[auto.childNodes.length-1] ;
								ft.css(datas.movingdefaultcss) ;
								ft.adclax('h') ;
								setTimeout(function(){
									top.value = _('.h span').textContent ;
								},50) ;
							}
							else{
								var now = _('.h'), working = null ;
								/* Search for working div */
								if(now.previousSibling){
									if(now.previousSibling.nodeName=="#text"){
										if(now.previousSibling.previousSibling){
											working = now.previousSibling.previousSibling ;
										}
										else{
											top.value = written ;
											top.focus() ;
										}
									}
									else{
										working = now.previousSibling ;
									}
								}
								else{
									top.value = written ;
									top.focus() ;
								}
								/* end of search */

								now.css(datas.outputdefaultcss) ;
								now.removeclax('h') ;
								if(now.previousSibling){	
									working.css(datas.movingdefaultcss) ;
									working.adclax('h') ;
									setTimeout(function(){
										top.value = _('.h span').textContent ;
									},50) ;
								}
							}
						break;

						case 40:
							e.preventDefault() ;
							if(!_('.h')){
								auto._childs(0).css(datas.movingdefaultcss) ;
								auto._childs(0).adclax('h') ;
								setTimeout(function(){
									top.value = _('.h span').textContent ;
								},50) ;
							}
							else{
								var now = _('.h'), working = null ;
								// Search for working div
								if(now.nextSibling){
									if(now.nextSibling.nodeName=="#text"){
										if(now.nextSibling.nextSibling) working = now.nextSibling.nextSibling ;
										else{
											top.value = written ;
											top.focus() ;
										}
									}
									else{
										working = now.nextSibling ;
									}
								}
								else{
									top.value = written ;
									top.focus() ;
								}
								// end of search

								now.css(datas.outputdefaultcss) ;
								now.removeclax('h') ;
								if(now.nextSibling){
									// now.attr({style:""}) ;	
									working.css(datas.movingdefaultcss) ;
									working.adclax('h') ;
									setTimeout(function(){
										top.value = _('.h span').textContent ;
									},50) ;
								}
							}
						break;

						default:
							if(written!=top.value) auto._hide() ;
							written = top.value ; // memorizing top value
							q.open('GET',datas.to+(datas.sep?'?':'')+datas.keyword+((top.value)?'='+top.value:'')) ;
							q.send(null) ;
							q.onload = function(){
								// console.log(q.responseText) ;
								if(q.responseText.trim().length){
									auto.innerHTML = q.responseText.trim() ;
									auto._childs().forEach(function(child){
										child.css({padding:'5px'});
										/* counting with image presence */
										var begin = 0 ;
										/* image width */
										if(child._childs(0).nodeName=='IMG'){
											child._childs(0).css(datas.thumbstyle?datas.thumbstyle:{width:'35px'}) ;
											begin = 0 ;
										}else begin = -1 ;
										/* description text */
										if(child._childs(begin+2) && child._childs(begin+2).nodeName=='P'){
											child._childs(begin+2).css(datas.descstyle?datas.descstyle:{
												fontSize: '12px',
												color: '#ddd',
												marginLeft: (child._childs(0).nodeName=='IMG') ? '39px' : '0',
												marginTop: (child._childs(0).nodeName=='IMG') ? '-5px' : '0'
											}) ;
										}
									}) ;
									auto._show(100) ;
								}
								else{
									auto.innerHTML = '' ;
									auto._hide() ;
								}
							} ;
						break;
					}
					// 
					// others event handling
					// 
					auto.onmouseover = function(e){
						// 
					} ;

					auto.onclick = function(e){
						var ti = e.target ;
						while(ti.hasclax && !ti.hasclax('_auto_')) ti = ti.parentNode ; 
						if(datas.onselection) datas.onselection(ti) ;
						if(_('.h')) _('.h').removeclax('h') ;
						ti.adclax('h') ;
						setTimeout(function(){ top.value = _('.h span').textContent ; },50) ;
						auto._hide() ;
						top.focus() ;
					} ;

				}

				else if(top.value.length==0){
					if(e.which==8) auto._hide() ;
				}
			}
		}
		else{console.log("ceci n'est pas le bon element sur lequel appliquer !");}
	} ;
	
	proto.addinput = function(attrs){
		var top = this ;
		if(top.nodeName=='FORM'){
			var input = document.createElement('input') ;
			//input.attr({'type':'text'}) ;
			input.attr(attrs) ;
			input.addto(top) ;
		}
		else{
			console.log('methode utilisable que sur element FORM') ;
		}
		return top ;
	} ;

	proto._on = function(evt,func,bubble=false){
		this.addEventListener(evt,func,bubble) ;
	} ;

	proto.choicepreview = function(img,handler){
		var top = this ;
		if(this.nodeName!='INPUT' || this.type!='file'){
			console.error('cette methode ne s\'applique qu\'aux élements input.') ;
			return ;
		}
		var reader = new FileReader() ;
		this.onchange = function(){
			reader.readAsDataURL(this.files[0]) ;
		} ;
		reader.onload = function(){
			img.src = reader.result ;
			if(handler) handler(reader.result) ;
		} ;

		return top ;
	} ;


	/* cette methode permettra de faire d'une balise div, ayant une certaine, un slider 
	*  La structure etant :
	*
	*  <div class="_screen">
	*		<div class="_pic-contain">
	*			<div><img src="img/a.jpg"></div>
	*			<div><img src="img/c.jpg"></div>
	*			<div><img src="img/b.jpg"></div>
	*		</div>
	*	</div>
	*
	*   En cours de finition
	*/
	proto.slideit = function(options){
		var top = this, delay = options.delay || 0 ;

		/* vérification de la structure */
			 if(!top.childNodes[1] || top.childNodes[1].nodeName!='DIV'){
			 	console.error('do_more: La structure de votre slider ne respecterais pas la structure imposée.') ;
			 }
			 else if(!top.childNodes[1].childNodes[1] || top.childNodes[1].childNodes[1].nodeName!='DIV'){
			 	console.error('do_more: La structure de votre slider ne respecterais pas la structure imposée.') ;
			 }
		/* Retrait des éléments n'ayant pas leur place ... */
			top.childNodes.each(function(el,rank){
				if(rank>=2) top.childNodes[rank].parentNode.removeChild(top.childNodes[rank]) ;
			}) ;

			top.childNodes[1].childNodes.each(function(el,rank){
				if(el.nodeName!='DIV') el.parentNode.removeChild(el) ;
			}) ;
		/* Application des styles adéquats */
			top.childNodes[1]._width(top._width()*_('._screen img',true).length + 100) ;
			top.childNodes[1]._height(top._height()) ;
			top.childNodes[1].childNodes.each(function(a,b){ a._width(top._width()) ; a._height(top._height()) ; a.css({display:'inline-block',verticalAlign:'top'}); }) ;
			_('._screen img',true).each(function(a,b){ a._width('100%') ; }) ;
		/* --- */

		setTimeout(function(){
			/* à continuer ... */
		}, delay) ;
		return top ;
	} ;
	
	proto.redirectframe = function(src,delay){
		var top = this ;
		if(top.nodeName.toLowerCase()=='iframe'){
			setTimeout(function(){
				top.src = src ;
			},delay||0) ;
		}else{
			console.log("cette fonction n'est applicable que sur les objets de type iframe.") ;
		}
	} ;
	
	proto.presentYou = function(){
		present = '{"id":"'+this.id+
				'", "class":"'+this.className+
				'", "childs":"'+this.childNodes.length+
			'"}' ;
		present = JSON.parse(present) ;
		return present ;
	} ;
	
	
	// here goes usual function
	
	function _(sel,toArray){ // this to reduce querySelector
		if(toArray)
			return document.querySelectorAll(sel) ;
		else if(document.querySelectorAll(sel).length > 1)
			return document.querySelectorAll(sel) ;
		else 
			return document.querySelector(sel) ;
	}

	function _ajax(opts){
		var params = '' ;
		var q = new XMLHttpRequest() ;
			q.open(opts.type,opts.url,true) ;
			if(opts.params && typeof opts.params === 'object'){
				for(var a in opts.params){
					params += a+"="+opts.params[a]+"&" ;
				}
				/*remove last "&" in params*/ params = params.substring(0,params.length-1) ;
				/* check for adaptive params in params var */
			}
			else if(opts.params && typeof opts.params === 'string'){
				params = opts.params ;
			}

			if(opts.type.toLowerCase()=='post'){
				if(params=='' || params.length==0){
					console.error("paramètres requis pour une requète de type POST") ;
					return ;
				}
				else{
					// console.log(params) ;
					q.setRequestHeader('Content-Type','application/x-www-form-urlencoded') ;
					q.send(params) ;
				}
			}
			else if(opts.type.toLowerCase()=='get'){
				q.send(null) ;
			}

			// if(q.timeout) q.timeout = opts.timeout || 10000 ;

			q.onload = function(e){
				if(q.readyState==q.DONE){
					if(q.status==200) if(opts.success) opts.success(q.responseText) ;
					else if(q.status!=200) if(opts.error) opts.error() ;
				}
				else console.error("problème survenu avec la requète !") ;
			} ;

			q.onprogress = function(e){
				var percent = (e.loaded*100)/e.total ;
				if(opts.progress) opts.progress(percent) ;
			} ;
	}

	function _getCoordsFromIp(ip,handle){
		_ajax({
		   type:"get",
		   url: "http://ipinfo.io/"+ip,
		   success: function(data){
		      	var d = data ;
		      	d = d.split('<pre class="example-results-basic">') ;
		      	d = d[1].split('</pre>') ;
		      	d = d[0].replace(/&quot;/g,'"') ;
		      	d = JSON.parse(d) ;
		   		/* handle fail */
		   		if(!d.loc) return ;
		   		/**/
		      	/* adding lat and lng on object */
		      	d.lat = d.loc.split(',')[0] ;
		      	d.lng = d.loc.split(',')[1] ;
		      	if(handle) handle(d) ;
		   },
		   error: function(){
		   	console.error("Impossible de reccuperer les coordonnées de l'adresse "+ip) ;
		   }
		}) ;
	}

	// modified ---------------------------------------------------------------------------------//////-----------//////----------
	function _createElement(elName,properties,css_prop,addto,content){
		var top = this ;
		var el = document.createElement(elName) ;
		if(css_prop) el.css(css_prop) ;
		if(properties) el.attr(properties) ;
		if(content) el.innerHTML = content ;
		if(addto) el.addto(addto) ;
		return el ;
	}

	function _onEach(array,handler,delay){
		var apply = function(){
			for(var i=0; i<array.length; i++){
				handler(array[i],i) ;
			}
		} ;
		if(delay){
			setTimeout(function(){ apply() ; },delay||0) ;
		}
		else{ apply() ; }
	}
	
	function redirectwindow(src,delay){
		setTimeout(function(){
			if(window) window.location.href = src ; else return ;
		},delay||0) ;
	}

	function _pregMatch(exp, handle){
		var len = exp.length, exploiting = '', isOn = false ;
		for(var i=0; i<handle.length; i++){
			exploiting = '' ;
			for(var j=i; j<(i+len); j++){
				if(!handle[j]) break ;
				else exploiting += handle[j] ;
			}
			// console.log(exploiting) ;
			if(exploiting==exp){
				isOn = true ;
				break ;
			}
		}
		return isOn ;
	}
	
	
	// animate functions
	
	proto._animate = function(opts){
		var start = new Date ;
		var top = this ;

		var id = setInterval(function(){
			var timePassed = new Date - start ;
			var progress = timePassed/opts.duration ;

			if(progress>1) progress = 1 ;

			var delta = funcs[opts.type](progress) ;
			opts.step(delta) ;

			if(progress==1) clearInterval(id) ;
		}, opts.delay||10) ;

		var funcs = {
			linear : function linear(p){ return p ; },
			slowFast : function slowFast(p){ return Math.pow(p, 2) ; },
			slowFast_1 : function slowFast_1(p){ return Math.pow(p, 4) ; },
			back : function back (p){ return Math.pow(p, 2) * ((0.5 + 1) * p - 0.5) ; }
		} ;
	}

// here is created the alert object
		function __alert(){
			// this for alert() 
			var back = _createElement('div',{},{
				background:"rgba(0,0,0,0.4)",
				position:"fixed",
				top: "0",
				width:"100%", height:"100%", zIndex:"300000",
				display: "none" ,
				transition: "all 0.2s ease"
			}, document.body) ;
			var box = _createElement('div',{},{
				background: "#fff",
				borderTop: "30px solid #319cee",
				position: "absolute",
				width: "40%",
				maxWidth: "350px",
				borderRadius: "7px",
				padding: "20px 10px",
				opacity: "0",
				transition: "all 0.2s ease"
			}, back) ;
			var close = _createElement('button',{},{
				width: "20px",
				height: "20px",
				position: "absolute",
				background: "#e63e5e",
				top: "-25px",
				right: "10px",
				borderRadius: "10px",
				fontFamily: "arial",
				color: "#fff",
				border: "none"
			}, box) ; close.textContent = "" ;
			var text = _createElement('div',{},{
				textAlign: "center",
				fontSize: "1.2em"
			}, box) ;
			// end of for alert and now for prompt
			var input = _createElement('input',{type:'text',id:'_prompt'},{
				width: "70%",
				padding: "7px",
				border: "1px solid #ccc",
				marginTop: "10px"
			}) ;
			var valid = _createElement('button',{},{
				width: "30px",
				height: "30px",
				border: "none",
				background: "#aaa",
				borderRadius: "25px",
				marginLeft: "10px"
			}) ; valid.textContent = "ok" ;
			var reject = _createElement('button',{},{
				width: "30px",
				height: "30px",
				border: "none",
				background: "#ff2222",
				borderRadius: "25px",
				marginLeft: "10px"
			}) ; reject.textContent = "no" ;
			// now for small alert
			var smallbox = _createElement('div',{class:"smallbox"},{
				width: '170px',
				padding: '5px',
				borderRadius: '3px',
				border: '1px solid #aaa',
				background: '#fff',
				position: 'absolute',
				top: '-170px',
				left: '-170px',
				opacity: '0',
				transition: 'all 0.1s ease'
			},document.body) ;
			var index = _createElement('span',{},{
				position: 'absolute',
				bottom: '-6px',
				left: '20px',
				width: '10px',
				height: '10px',
				background: '#fff',
				border: '0px solid #ccc',
				borderBottom: '1px solid #aaa',
				borderRight: '1px solid #aaa',
				transform: 'rotate(45deg)',
				zIndex: '1000'
			},smallbox) ;
			var smalltext = _createElement('div',{},{
				color: '#636363',
				fontSize: '13px',
			},smallbox) ;
			var smallinput = _createElement('input',{type:'text'},{
				border: '1px solid #ccc',
				padding: '4px',
				width: '70%'
			}) ;
			var smallvalid = _createElement('button',{},{
				width: '23px',
				height: '23px',
				border: 'none',
				background: '#ccc',
				borderRadius: '15px',
				fontSize: '11px',
				marginLeft: '12px'
			}) ; smallvalid.textContent = 'ok' ;
			var closemin = function(){
				smallbox.css({opacity:'0'}).css({top:'-500px',left:'-170px'},100) ;
				if(smallvalid.parentNode){ smallvalid._remove(); smallinput._remove(); }
			} ;


			this._alert = function(message,style,events){
				text.innerHTML = message ;
				if(style) box.css(style) ;
				back.css({display:"block",opacity:"1"}) ;
				box.centerXY() ;
				box.css({opacity:'1'}) ;
				close.onclick = function(){
					back.css({opacity:"0"}).css({display:"none"},300) ;
					if(events && events.close) events.close() ;
				} ;
			} ;

			this._prompt = function(message,events,style){
				text.css({margin:'-10px 0 10px 0',fontSize:'17px'}).innerHTML = message ;
				input.addto(box) ;
				valid.addto(box) ;
				box.css({textAlign:'center'}) ;
				back.css({display:"block",opacity:"1"}) ;
				box.centerXY() ;
				box.css({opacity:'1'}) ;
				if(style) box.css(style) ;
				close.onclick = function(){
					back.css({opacity:"0"}).css({display:"none"},300) ;
					input._remove() ;
					valid._remove() ;
					if(events.close) events.close() ;
				} ;
				valid.onclick = function(){
					back.css({opacity:"0"}).css({display:"none"},300) ;
					if(events.confirm) events.confirm(input.value) ;
				} ;
			} ;

			this._choose = function(message,events,style){
				text.css({margin:'-10px 0 10px 0',fontSize:'17px'}).innerHTML = message ;
				reject.addto(box) ;
				valid.addto(box) ;
				box.css({textAlign:'center'}) ;
				back.css({display:"block",opacity:"1"}) ;
				box.centerXY() ;
				box.css({opacity:'1'}) ;
				if(style) box.css(style) ;
				close.onclick = function(){
					back.css({opacity:"0"}).css({display:"none"},300) ;
					input._remove() ;
					valid._remove() ;
					if(events.close) events.close() ;
				} ;
				valid.onclick = function(){
					back.css({opacity:"0"}).css({display:"none"},300) ;
					if(events.confirm) events.confirm() ;
				} ;
				reject.onclick = function(){
					back.css({opacity:"0"}).css({display:"none"},300) ;
					if(events.reject) events.reject() ;
				} ;
			} ;

			this._minalert = function(msg,el,setStyle){
				if(el instanceof HTMLElement == false || el.nodeName=='BODY'){
					console.error("L'élément passé en paramètre à _minalert n'est pas un élément html ou n'est pas autorisé pour cette fonction.") ;
					return ;
				}
				if(_('.smallbox')) _('.smallbox')._remove() ;
				smallbox.addto(document.body) ;
				smalltext.innerHTML = msg ;
				if(setStyle) smallbox.css(setStyle) ;
				smallbox.css({left:el.offsetLeft+'px', top:(el.offsetTop-smallbox.offsetHeight)+'px'}).css({opacity:'1'},300) ;
				smallbox.onclick = function(){ closemin() ; } ;
			} ;
		}
//  end of alert object creating





	/**** md5 ****/


/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function _md5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
 
