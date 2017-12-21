const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

function getDefaultImgFiles(filesArr) {
    // create a variable that points to the path where default images exist
    var img_path = path.join(__dirname, '../../angular/src/assets/img/default');
    // read all files in img_path
    fs.readdirSync(img_path).forEach(function (file) {
        if (file.indexOf('.jpg') >= 0) {
            // push each .jpg file to the files array
            filesArr.push(file);
        }
    });
}

module.exports = {
    create: function (req, res) {
        console.log('===INSIDE USER CREATE CONTROLLER===')
        if (req.body.password !== req.body.password_conf) {
            console.log('===Passwords do not match===')
            return res.json({ Error: 'Password and Password confirmation do not match' });
        }
        let newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // assign random profile img by default
        let filesArr = [];
        getDefaultImgFiles(filesArr);
        console.log(filesArr);
        let randImg = Math.floor(Math.random() * filesArr.length);
        newUser.profile_picture = "assets/img/default/" + filesArr[randImg];

        newUser.save(function (newUserErrors, user) {
            if (newUserErrors) {
                console.log('===ERRORS SAVING NEW USER===')
                console.log(newUserErrors)
                return res.json({ Error: 'User could not be saved' })
            } else {
                console.log('===SUCCESSFULLY SAVED USER===')
                console.log(user)
                req.session.userId = newUser._id
                let response = {
                    _id: newUser._id,
                    first_name: newUser.first_name,
                    last_name: newUser.last_name,
                    email: newUser.email,
                    username: newUser.username,
                    profile_picture: newUser.profile_picture,
                }
                return res.json(response)
            }
        });
    },
    login: function (req, res) {
        console.log('===INSIDE USER LOGIN CONTROLLER===')
        console.log('req.body:', req.body)
        User.findOne({ email: req.body.email }, function (errors, queryResponse) {
            console.log('QueryResponse:', queryResponse)
            if (errors || queryResponse == null) {
                console.log('===ERROR FINDING USER===')
                return res.json({ Error: 'Password or email does not match' })
            } else {
                console.log('===COMPARING PASSWORD===')
                console.log('req.body.password:', req.body.password)
                if (bcrypt.compareSync(req.body.password, queryResponse.password)) {
                    let response = {
                        _id: queryResponse._id,
                        first_name: queryResponse.first_name,
                        last_name: queryResponse.last_name,
                        email: queryResponse.email,
                        username: queryResponse.username,
                        profile_picture: queryResponse.profile_picture,
                        loggedIn: true
                    }
                    req.session.userId = queryResponse._id
                    console.log("SESSION ID: ", req.session.userId)
                    return res.json(response)
                } else {
                    console.log('===FAILED COMPARING PASSWORDS===')
                    return res.json({ Error: 'Password or email does not match', loggedIn: false })
                }
            }
        });
    },
    read: function (req, res) {
        console.log('===INSIDE USER FIND USER CONTROLLER===')
        console.log('POST DATA:', req.body)
        if (req.session.userId) {
            User.find({ $or: [
                {first_name: { $regex: req.body.input, $options: 'i'}}, 
                {last_name: { $regex: req.body.input, $options: 'i'}},
                {username: { $regex: req.body.input, $options: 'i'}}
            ]}, function (errors, queryResponse) {
                if (errors) {
                    console.log('===ERROR FINDING USER===')
                    return res.json({ Error: 'Error finding user' })
                } else {
                    console.log('User search results:', queryResponse)
                    return res.json(queryResponse)
                }
            });
        } else {
            console.log('===USER NOT IN SESSION===')
            return res.json({ Error: 'User not in session' })
        }
    },
    update: function (req, res) {
        console.log('===INSIDE USER UPDATE CONTROLLER===')
        console.log('SESSION:', req.session.userId)
        if (req.session.userId) {
            User.findOneAndUpdate({ _id: req.body._id },
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email
                }
                , function (errors, queryResponse) {
                    if (errors || queryResponse == null) {
                        console.log('===ERROR UPDATING USER===')
                        return res.json({ Error: 'Error updating user' })
                    } else {
                        let response = {
                            _id: queryResponse._id,
                            first_name: queryResponse.first_name,
                            last_name: queryResponse.last_name,
                            email: queryResponse.email
                        }
                        return res.json(response)
                    }
                });
        } else {
            console.log('===USER NOT IN SESSION===')
            return res.json({ Error: 'User not in session' })
        }
    },
    destroy: function (req, res) {
        console.log('===INSIDE USER DESTROY CONTROLLER===')
        console.log('SESSION:', req.session.userId)
        if (req.session.userId) {
            User.remove({ _id: req.body._id }, function (errors) {
                if (errors) {
                    console.log('===ERROR DESTROYING USER===')
                    return res.json({ Error: 'Error removing user' })
                }
            });
        } else {
            console.log('===USER NOT IN SESSION===')
            return res.json({ Error: 'User not in session' })
        }
    },
    logout: function (req, res) {
        console.log('===INSIDE USER LOGOUT CONTROLLER===')
        console.log('SESSION:', req.session.userId)
        if (req.session.userId) {
            req.session.destroy();
        } else {
            console.log('===USER NOT IN SESSION===')
            return res.json({ Error: 'User not in session' })
        }
    }
}