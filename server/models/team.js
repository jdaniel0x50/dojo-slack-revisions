
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    _admin: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    channels: [{
        type: Schema.Types.ObjectId, ref: 'Channel',
    }],
    users: [{
        type: Schema.Types.ObjectId, ref: 'User',
    }]
}, { timestamps: true });


mongoose.model('Team', TeamSchema);