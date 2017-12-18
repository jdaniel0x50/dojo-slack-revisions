var mongoose = require('mongoose');
var User = mongoose.model('User'),
    Message = mongoose.model('Message'),
    Comment = mongoose.model('Comment'),
    Team = mongoose.model('Team'),
    Channel = mongoose.model('Channel');
const CmntController = require('../controllers/commentController');

module.exports = {
    getAll: function (req, res) {
        Message.find({})
            .populate('_author')
            .populate('_channel')
            .populate('comments')
            .sort('createdAt')
            .exec(function (err, items) {
                if (err) {
                    console.log("There was an error in the message find!")
                    console.log(err);
                    return null;
                }
                else {
                    console.log("Successfully found the messages!");
                    return res.json(items);
                }
            });
    },

    create: function (req, res) {
        User.findOne({ _id: req.body._author }, function (err, user) {
            // find the user that authored the message
            // allows ability to push the message to the user
            if (err) {
                console.log("Could not find user!");
                console.log(err);
                return res.json(err);
            }
            else { 
                if (user) {
                    // continue only if the user is found
                    Channel.findOne({ _id: req.body._channel }, function (err, channel) {
                        // find the message channel
                        // allows the ability to push the message to the channel
                        if (err) { 
                            console.log("Could not find channel!");
                            console.log(err);
                            return res.json(err);
                        }
                        else { 
                            if (channel) {
                                // continue only if the channel is found
                                var item = new Message({
                                    content: req.body.content,
                                    content_type: req.body.content_type,
                                    _author: req.body._author,
                                    _channel: req.body._channel,
                                });
                                item.save(function (errItem, result) {
                                    if (errItem) {
                                        console.log("There were errors in the message save");
                                        console.log(errItem);
                                        return res.json(errItem);
                                    }
                                    else {
                                        console.log("succesfully added a message document!");
                                        channel.messages.push(item);
                                        channel.save(function (errChannel, channelResult) {
                                            if (errChannel) {
                                                console.log("There were errors in the channel save");
                                                console.log(errChannel);
                                                return res.json(errChannel);
                                            }
                                            else {
                                                // db save was successful
                                                console.log("successfully added message to channel!");
                                                return res.json(result);
                                            }
                                        })
                                    }
                                });
                            } 
                            else {
                                console.log("Could not find channel!");
                                console.log(err);
                                return res.json(err);
                            }
                        }
                    })
                }
                else {
                    console.log("Could not find user!");
                    console.log(err);
                    return res.json(err);
                }
            }
        })
    },

    update: function (req, res) {
        Message.findById(req.params.id, function (errMsg, item) {
            // find message to confirm the author is logged in user before update
            if (errMsg) {
                console.log("Could not find the message!");
                console.log(errMsg)
                return res.json(errMsg);
            }
            else {
                // confirm the author is the logged in user before updating
                if (item._author == req.session.id) {
                    Messasge.findByIdAndUpdate(req.params.id, {
                        content: req.body.content,
                        content_type: req.body.content_type,
                        _author: req.body._author,
                        _channel: req.body._channel,
                    }, function (err, item) {
                        if (err) {
                            console.log("There were errors in the message update submission");
                            console.log(err);
                            return res.json(err);
                        }
                        else {
                            // db save was successful
                            console.log("successfully updated message document!");
                            return res.json(item);
                        }
                    })
                }
                else {
                    // logged in user is not the message author
                    console.log("You do not have permission to update this message");
                    return res.json(item);
                }
            }
        })
    },

    destroy: function (req, res) {
        Message.findById(req.params.id, function (errMsg, item) {
            // find item and remove from channel list before deleting the item
            if (errMsg) {
                console.log("Could not find the message!");
                console.log(errMsg)
                return res.json(errMsg);
            }
            else {
                // confirm the author is the logged in user before deleting
                if (item._author == req.session.id) {
                    Channel.findByIdAndUpdate(item._channel, {
                        $pull: { messages: req.params.id }
                    }, function (errChannel, channel) {
                        if (errChannel) {
                            console.log("There were errors in the attempt to remove the message from the channel");
                            console.log(errChannel);
                        }
                        else {
                            // delete message comments, if any
                            CmntController.destroyFromMessage(req.params.id);
                            Message.findByIdAndRemove(req.params.id, function (err, msg) {
                                if (err) {
                                    console.log("There were errors in the attempt to delete the message");
                                    console.log(err);
                                    return res.json(err);
                                }
                                else {
                                    // db remove was successful
                                    console.log("successfully removed the message!");
                                    return res.json(msg);
                                }
                            });
                        }
                    });
                }
                else {
                    // logged in user is not the message author
                    console.log("You do not have permission to delete this message");
                    return res.json(item);
                }
            }
        })
    },

    getById: function (req, res) {
        Message.findById(req.params.id)
            .populate('_author')
            .populate('comments')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the find message by id");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db find by id was successful
                    console.log("successfully found the message document!");
                    return res.json(item);
                }
            });
    },

    getByChannel: function (req, res) {
        Message.find({ _channel: req.params._channel })
            .populate('_author')
            .populate('comments')
            .sort('createdAt')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the find message by channel");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db find by id was successful
                    console.log("successfully found the message documents!");
                    return res.json(item);
                }
            });
    },

    getByAuthor: function (req, res) {
        Message.find({ _author: req.params._author })
            .populate('_author')
            .populate('comments')
            .sort('createdAt')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the find message by author");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db find by id was successful
                    console.log("successfully found the message documents!");
                    return res.json(item);
                }
            });
    },

    getBySearchContent: function (req, res) {
        // search content for any variation of the search term
        // term can be in beginning, middle, end, or entire content
        Message.find({ $or: [
            { 'content': new RegExp(
                '(' + req.params.search + ')(.+)|' +
                '(.+)(' + req.params.search + ')|' +
                '(.+)(' + req.params.search + ')(.+)', "i" ) 
            },
            { 'content': new RegExp(req.params.search, "i") }
        ] } )
            .populate('_userPosted')
            .sort('createdAt')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the search");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db save was successful
                    console.log("successfully found the documents!");
                    return res.json(item);
                }
            });
    },
}