var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
mongoose.Promise = global.Promise;

var app = express();
app.use(session({secret: "SomeString"}))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/angular/dist'));

require('./server/config/mongoose.js');

var routes = require('./server/config/routes')
routes(app);

var serverMain = app.listen(8000, function(){
    console.log('====LISTENING ON PORT 8000====')
});
var serverSocket = app.listen(4000, function() {
    console.log('====SOCKET LISTENING ON PORT 4000====')
});

// setup socket to listen for changes to mongo data
var io = require('socket.io').listen(serverSocket);
var Message = mongoose.model('Message');
io.sockets.on('connection', function (socket) {
    console.log("###########################");
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // console.log("Client id is: ", socket.client.id);
    // console.log("Client sockets is: ", socket.client.sockets);
    // console.log("Client namespaces is: ", socket.client.nsps);
    // console.log("Client - server namespaces is: ", socket.client.server.nsps);
    // console.log("Server namespaces is: ", socket.server.nsps);

    // emit changes to message data when new message created
    socket.on("create_message", function (data) {
        console.log("A new message was submitted through emit (create_message)!");
        console.log("Emitted Message", data);
        Message.findById(data._id)
            .populate('_author', 'first_name last_name username email status teams profile_picture')
            .populate('comments')
            .exec(function (err, msg) {
                socket.broadcast.emit("new_message", { message: msg });
                console.log("Completed all messages emit");
        });
    });

    // emit changes to message data when new comment created
    socket.on("create_comment", function (data) {
        console.log("A new comment was submitted!");
        console.log(data);
        socket.emit();
        console.log("Completed all comment emit");
    });
    socket.on("msg_board_comp", function() {
        console.log("Message Component loaded!");
    })
    socket.on("new_msg_component", function () {
        console.log("New Message Component loaded!");
    })
});
