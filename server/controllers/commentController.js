var mongoose = require('mongoose');
var User = mongoose.model('User'),
    Message = mongoose.model('Message'),
    Comment = mongoose.model('Comment'),
    Team = mongoose.model('Team'),
    Channel = mongoose.model('Channel');

module.exports = {
    getAll: function (req, res) {
        Comment.find({})
            .populate('_author')
            .populate('_message')
            .sort('createdAt')
            .exec(function (err, items) {
                if (err) {
                    console.log("There was an error in the comment find!")
                    console.log(err);
                    return null;
                }
                else {
                    console.log("Successfully found the comments!");
                    return res.json(items);
                }
            });
    },

    create: function (req, res) {
        Message.findOne({ _id: req.body._author }, function (err, msg) {
            // find the message for the comment
            // allows ability to push the comment to the message
            if (err) {
                console.log("Could not find message!");
                console.log(err);
                return res.json(err);
            }
            else {
                if (msg) {
                    // continue only if the message is found
                    var item = new Comment({
                        content: req.body.content,
                        _author: req.body._author,
                        _message: req.body._message,
                    });
                    item.save(function (errItem, result) {
                        if (errItem) {
                            console.log("There were errors in the comment save");
                            console.log(errItem);
                            return res.json(errItem);
                        }
                        else {
                            console.log("succesfully added a comment document!");
                            message.comments.push(item);
                            message.save(function (errMsg, msgResult) {
                                if (errMsg) {
                                    console.log("There were errors in the message save");
                                    console.log(errMsg);
                                    return res.json(errMsg);
                                }
                                else {
                                    // db save was successful
                                    console.log("successfully added comment to the message!");
                                    return res.json(result);
                                }
                            })
                        }
                    });
                }
                else {
                    // message was not found
                    console.log("Could not find message!");
                    console.log(err);
                    return res.json(err);
                }
            }
        })
    },

    update: function (req, res) {
        Comment.findById(req.params.id, function (errMsg, item) {
            // find comment to confirm the author is logged in user before update
            if (errMsg) {
                console.log("Could not find the comment!");
                console.log(errMsg)
                return res.json(errMsg);
            }
            else {
                // confirm the author is the logged in user before deleting
                if (item._author == req.session.id) {
                    Comment.findByIdAndUpdate(req.params.id, {
                        content: req.body.content,
                        _author: req.body._author,
                        _message: req.body._message,
                    }, function (err, item) {
                        if (err) {
                            console.log("There were errors in the comment update submission");
                            console.log(err);
                            return res.json(err);
                        }
                        else {
                            // db save was successful
                            console.log("successfully updated comment document!");
                            return res.json(item);
                        }
                    });
                }
                else {
                    // logged in user is not the comment author
                    console.log("You do not have permission to update this comment");
                    return res.json(item);
                }
            }
        });
    },

    destroy: function (req, res) {
        Comment.findById(req.params.id, function (errMsg, item) {
            // find item and remove from message list before deleting the item
            if (errMsg) {
                console.log("Could not find the comment!");
                console.log(errMsg)
                return res.json(errMsg);
            }
            else {
                // confirm the author is the logged in user before deleting
                if (item._author == req.session.id) {
                    Message.findByIdAndUpdate(item._message, {
                        $pull: { comments: req.params.id }
                    }, function (errMessage, msg) {
                        if (errMessage) {
                            console.log("There were errors in the attempt to remove the comment from the message");
                            console.log(errMessage);
                        }
                        else {
                            Comment.findByIdAndRemove(req.params.id, function (err, comment) {
                                if (err) {
                                    console.log("There were errors in the attempt to delete the comment");
                                    console.log(err);
                                    return res.json(err);
                                }
                                else {
                                    // db remove was successful
                                    console.log("successfully removed the comment!");
                                    return res.json(comment);
                                }
                            });
                        }
                    });
                }
                else {
                    // logged in user is not the comment author
                    console.log("You do not have permission to delete this comment");
                    return res.json(item);
                }
            }
        })
    },

    destroyFromMessage: function (msgId) {
        Comment.find({ _message: msgId }, function (err, comments) {
            // delete each comment in comments -- related to the message id
            comments.forEach( function (comment) {
                Comment.findByIdAndRemove(comment._id, function (err, item) {
                    if (err) {
                        console.log("There were errors in the attempt to delete the comment");
                        console.log(err);
                    }
                    else {
                        // db remove was successful
                        console.log("successfully removed the comment!");
                    }
                });
            });
        });
    },

    getById: function (req, res) {
        Comment.findById(req.params.id)
            .populate('_author')
            .populate('_message')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the find comment by id");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db find by id was successful
                    console.log("successfully found the comment document!");
                    return res.json(item);
                }
            });
    },

    getByMessage: function (req, res) {
        Comment.find({ _message: req.params._message })
            .populate('_author')
            .populate('_message')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the find comment by message");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db find by id was successful
                    console.log("successfully found the comment documents!");
                    return res.json(item);
                }
            });
    },

    getByAuthor: function (req, res) {
        Comment.find({ _author: req.params._author })
            .populate('_author')
            .populate('_message')
            .exec(function (err, item) {
                if (err) {
                    console.log("There were errors in the find comment by author");
                    console.log(err);
                    return res.json(err);
                }
                else {
                    // db find by id was successful
                    console.log("successfully found the comment documents!");
                    return res.json(item);
                }
            });
    },

    getBySearchContent: function (req, res) {
        // search content for any variation of the search term
        // term can be in beginning, middle, end, or entire content
        Comment.find({
            $or: [
                {
                    'content': new RegExp(
                        '(' + req.params.search + ')(.+)|' +
                        '(.+)(' + req.params.search + ')|' +
                        '(.+)(' + req.params.search + ')(.+)', "i")
                },
                { 'content': new RegExp(req.params.search, "i") }
            ]
        })
            .populate('_author')
            .populate('_message')
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