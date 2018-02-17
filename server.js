var iofile = require("socketio-file-upload");
var fs = require("fs") ;
var express = require('express') ;
var app = express() ;
var server = require('http').createServer(app) ;
var io = require('socket.io')(server);

iofile.listen(server);

/**/
app.use(express.static(__dirname + '/public')) ;

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/index.html') ;
}) ;

app.get('/chat',function(req,res){
	res.sendFile(__dirname + '/public/chat.html') ;
}) ;

app.get('/download',function(req,res){
	res.sendFile(__dirname + '/public/chat.html') ;
}) ;
/**/

var users = {} ;



io.on('connection', function(socket){
	console.log("connection entrante !") ;

	var uploader = new iofile() ;
		uploader.dir = __dirname + "/public/files_uploaded" ;
		uploader.listen(socket) ;
		uploader.on('saved',function(evt){
			socket.broadcast.emit('receivingmessage',"[file:"+evt.name+"]") ;
			console.log(evt) ;
		});

	/* try login */
	socket.on('trylogin',function(data){
		/* login verifying */
		if(data.username.length<2)
			socket.emit('errors','Login trop court ou incorrect') ;
		else if(users[data.username])
			socket.emit('errors','Le pseudo entré est deja utilisé !') ;
		else{
			users[data.username] = {
				username: data.username,
				password: data.password
			} ;
			/* success back to user */
			socket.emit('loginsuccess',"Connection réussie !") ;
			/* boadcast message that one more user */
			socket.broadcast.emit('newuser',users[data.username].username) ;
		}
	}) ;

	/* user knowing verify */
	socket.on('doyouknowme',function(user){
		/**/
		if(users[user])
			socket.emit('knowyou','true') ;
		else
			socket.emit('knowyou','false') ;
	}) ;

	/* getting connected users */
	socket.on('getconnectedusers',function(user){
		var founded = [] ;
		for(var username in users){
			if(username!=user)
				founded.push(username) ;
		}
		/* sending founded */
		socket.emit('usersconnected',founded) ;
	}) ;

	/* user sends message */
	socket.on('usermessage',function(data){
		/* get it to users */
		socket.broadcast.emit('receivingmessage',data) ;
	}) ;

	/* user is writting */
	socket.on('iswritting',function(data){
		console.log(data.writter+" is writting to "+data.to) ;
		socket.broadcast.emit('iswritting',data) ;
	}) ;
	socket.on('endwritting',function(data){
		console.log(data.writter+" finish writting to "+data.to) ;
		socket.broadcast.emit('endwritting',data) ;
	}) ;
});


server.listen(process.env.PORT||8080) ;