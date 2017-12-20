const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    content_type: {
        type: String,
        trim: true
    },
    _author: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    _channel: {
        type: Schema.Types.ObjectId, ref: 'Channel',
    },
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }]
}, { timestamps: true });


mongoose.model('Message', MessageSchema);