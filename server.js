const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/chat', (req, res) => {
    res.render('chat.ejs');
});

io.on('connection', (socket) => {
    socket.on('newUser', (user) => {
        socket.username = user;
        console.log(user + ' connected');

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
    socket.on('chat message', function (msg) { //Lyssnar på eventet 'chat message'
        socket.broadcast.emit('chat message', socket.username + ": " + msg); //Servern tar emot det vi skrivit in och skriver ut vad användaren har skrivit.

    });
    socket.on('disconnect', (user) => {
        socket.broadcast.emit('newUser', socket.username + ' Disconnected')
    });
});

http.listen(5000, function () {
    console.log('listening on *:5000');
});