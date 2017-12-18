const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    _author: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    _message: {
        type: Schema.Types.ObjectId, ref: 'Message',
    },
}, { timestamps: true });


mongoose.model('Comment', CommentSchema);