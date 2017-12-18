const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    purpose: {
        type: String,
        minlength: 2,
        trim: true
    },
    _created_by: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    messages: [{
        type: Schema.Types.ObjectId, ref: 'Message',
    }],
    highlights: [{
        type: Schema.Types.ObjectId, ref: 'Message',
    }],
    users: [{
        type: Schema.Types.ObjectId, ref: 'User',
    }]
}, { timestamps: true });


mongoose.model('Channel', ChannelSchema);