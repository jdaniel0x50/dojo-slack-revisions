const mongoose = require('mongoose');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Channel = mongoose.model('Channel');
const TeamController = require('../controllers/teamController');
const MessageController = require('../controllers/msgController');

module.exports = {
    create: function(req, res){
        console.log('===INSIDE CHANNEL CREATE CONTROLLER===')
        //Assumes team id is in route path
        Team.findOne({_id: req.body._team},
        function(err, team){
            let newChannel = new Channel({
                name: req.body.name,
                _created_by: req.session.id,
                _team: team._id
            });
            newChannel.users.push(req.session.id);
            newChannel.save(function (err){
                if(err){
                    return res.json({Error: "Could not create new channel"})
                } else {
                    return res.json(newChannel);
                }
            }) ;
        });
    },
    getChannel: function(req, res) {
        Channel.findOne({_id: req.params.id})
        .populate('users')
        .populate('messages')
        .populate('highlights')
        .exec(function(err, channelResponse){
            if(err){
                return res.json({Error: "Could not find channel"})
            } else {
                console.log("Get choosen team:", channelResponse)
                return res.json(channelResponse);
            }
        });
    },
    updatePurpose: function(req, res){
        Channel.findOneAndUpdate({id: req.body._id},
            {
                purpose: req.body.purpose
            },
            function(err, channel){
                if(err){
                    console.log("Could not update purpose")
                    return res.json({Error: "Error updating purpose"})
                } else {
                    return res.json(channel)
                }
        });
    },
    updateName: function(req, res){
        Channel.findOneAndUpdate({id: req.body._id},
            {
                name: req.body.name
            },
            function(err, channel){
                if(err){
                    console.log("Could not update purpose")
                    return res.json({Error: "Error updating purpose"})
                } else {
                    return res.json(channel)
                }
        });
    },
    destroyChannel: function(req, res){
        Channel.findByIdAndRemove(req.params.id, function(err){
            if(err){
                console.log("Error removing channel");
                return res.json({Error: "Error removing channel"})
            } else {
                MessageController.destroyFromChannel(req.params.id)
            }
        });
    },
    removeTeamChannels: function(id){
        Team.findById(id, function(err, team){
            Console.log("Found team, now calling delete messages function for each Channel")
            team.foreach(function (channel){
                MessageController.destroyFromChannel(channel._id)
            });
        });
        console.log('Deleting all channels for team id', id)
        Channel.remove({_team: id})
    },
}