const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
// TODO: Move to server.js
let mongo = require("mongodb");
let monk = require("monk");
let bodyParser = require("body-parser");
var usersDB = monk('localhost:27017/users');

// TODO: Move to server.js
app.use(bodyParser.urlencoded({
  extended: false
}));
// TODO: Move to server.js
app.use(bodyParser.json());
// TODO: Move to server.js
app.use(function(req,res,next){
    req.db = usersDB;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});
// TODO: Move to server.js
app.post('/chat', (req, res) => {
  var userDB = req.db;
  var collection = userDB.get("users");
  collection.insert({
    "email": req.body.email,
    "password": req.body.password,
    "alias": req.body.username
  });
  res.redirect("chat");
});
// TODO: Move to server.js
app.get('/chat', (req, res) => {
  var userDB = req.db;
  var collection = userDB.get("users");
  collection.find({},{},function(e,docs){
    res.render('chat.ejs', {"users" : docs});
  });
});

io.on('connection', (socket) => {
    socket.on('newUser', (user) => {
        socket.username = user;
        //New user is online
        socket.broadcast.emit('newUser', `${user}: Is now online!`);
        //You are online
        socket.on('userOnline', (user) => {
            socket.emit('userOnline', `You ${user} are online`);
        });
        // is Typing
        socket.on('typing', (isTyping) => {
            socket.broadcast.emit('updateTyping', user, isTyping);
        });
    });
    socket.on('chat message', function (chatObject) { //Lyssnar på eventet 'chat message'
      
    //The server recieves a JSON string object and sends it further to all clients connected to the socket.
    socket.broadcast.emit('chat message', JSON.parse(chatObject));

    //HTTP request till servern, Post request fetch
    });
    socket.on('disconnect', (user) => {
        socket.broadcast.emit('newUser', socket.username + ' Disconnected')
    });
});

http.listen(5000, function () {
    console.log('listening on *:5000');
});
