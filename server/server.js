const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const publicPath = path.join(__dirname, "..", "/public");
// console.log(__dirname + "../public");

const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath))

var server = http.createServer(app);
var io = socketIo(server);


io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newEmail', {
        from: 'mike@example.com',
        text: 'Hey What is going on?',
        createAt: new Date()
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);

    })

    socket.on('disconnect', () => {
        console.log('Disconnected the client');
    })
});

server.listen(port, () => {
    console.log('listening on port 3000');
})