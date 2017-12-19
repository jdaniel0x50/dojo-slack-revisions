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

app.listen(8000, function(){
    console.log('====LISTENING ON PORT 8000====')
})