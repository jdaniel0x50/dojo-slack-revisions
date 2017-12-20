var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')


var app = express();
app.use(session({secret: "SomeString"}))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/angular/dist'));

require('./server/config/mongoose.js');

var routes = require('./server/config/routes')
routes(app);

var server = app.listen(8000, function(){
    console.log('====LISTENING ON PORT 8000====')
});

// setup socket to listen for changes to mongo data
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var Message = mongoose.model('Message');
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);

    // emit changes to message data when new message created
    socket.on("create_message", function (data) {
        console.log("A new message was submitted!");
        console.log(data);
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
});
