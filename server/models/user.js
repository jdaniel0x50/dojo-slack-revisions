
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name must be entered"],
        minlength: [2, "First name must be at least two characters"],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Last name must be entered"],
        minlength: [2, "Last name must be at least two characters"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email must be entered"],
        unique: true,
        validate: {
            validator: function (value) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: "Email must be a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Password must be entered"],
        minlength: 2,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    },
    username: {
        type: String,
        minlength: 2,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
    profile_picture: {
        type: String,
        trim: true
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    console.log("======INSIDE PRE SAVE=====")
    bcrypt.hash(this.password, 10).then(hashed_password => {
        console.log("====inside hasher======")
        console.log(hashed_password)
        this.password = hashed_password;
        next() //This is were it finally saves to Mongo
    }).catch(error => {
        next()
    });
})

mongoose.model('User', UserSchema);