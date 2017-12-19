const mongoose = require('mongoose');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Channel = mongoose.model('Channel');
const ChannelController = require('../controllers/channelController');

module.exports = {
    create: function (req, res) {
        console.log('===INSIDE TEAM CREATE CONTROLLER===')
        //Create team by first finding logged in user to set as admin
        console.log("SESSION", req.session.userId);
        User.findOne({ _id: req.session.userId }, 
            function (errors, userQuery){
                console.log("USER", userQuery)
                if(errors || userQuery == null){
                    return res.json({ Error: 'Need to be logged in to create a team' })
                }
            let newTeam = new Team({
                name: req.body.name,
                _admin: userQuery._id
            });
            console.log("NEW TEAM", newTeam.name)
            newTeam.save(function (err, team) {
                if (err) {
                    return res.json({Error: 'Team could not be saved'})
                } else {
                    console.log("User to create team", userQuery);
                    console.log("TeamID to add:", team._id)
                    User.update({_id: req.session.userId},
                    {
                        $addToSet: {teams: team._id}
                    },
                    function (err, user){
                        if(err){
                            console.log("Update error", err)
                        } else {
                            console.log("Updated User", user)
                        }
                    });
                    let defaultChannel = new Channel({
                        name: "General",
                        created_by: userQuery._id,
                        _team: team._id
                    });
                    defaultChannel.users.push(userQuery._id)
                    defaultChannel.save(function (err, channel){
                        if (err) {
                            return res.json({Error: "General Channel could not be created"})
                        } else {
                            Team.update({_id: newTeam._id}, 
                            {
                                $addToSet: {
                                    users: req.session.userId, 
                                    channels: channel._id
                                }
                            }, 
                            function (teamErr, teamRes) {
                                if(teamErr){
                                    return res.json({Error: 'User already on team'})
                                } else {
                                    return res.json(teamRes);
                                }
                            });
                        }
                    });
                }
            });
        });
    },
    getUserTeams: function(req, res) {
        console.log("===INSIDE getUserTeams TEAM CONTROLLER===")
        User.findOne({_id: req.session.userId}, 
            function(err, userResponse){
                if(err){ 
                    return res.json({Error: "Could not find User Session"})
                }
                else {
                    console.log("Getting user's teams", userResponse)
                    return res.json(userResponse.teams);
                }
            });
    },
    getTeam: function(req, res) {
        Team.findOne({_id: req.body._id})
        .populate('_admin')
        .populate('channels')
        .populate('users')
        .exec(function(err, teamResponse){
            if(err){
                return res.json({Error: "Could not find team"});
            } else {
                console.log("Get choosen team:", teamResponse)
                return res.json(teamResponse);
            }
        });
    },
    // ADD USER NEEDS A CUSTOM OBJECT FROM FRONT END WITH 'user' field
    addUser: function(req, res) {
        User.findOne({_id: req.body.user},
        function(err, addResonse){
            if(err){
                return res.json({Error: "Could not find user to add to team"})
            } else {
                Team.update({_id: req.body._id},
                {
                    $addToSet: {users: addResonse._id},
                },
                function (teamErr, teamRes){
                    if(teamErr){
                        return res.json({Error: "Could not update user to team"})
                    } else {
                        return res.json(teamRes)
                    }
                });
            }
        });
    },
    destroyTeam: function(req, res) {
        Team.findById({_id: req.params.id}, function(err, item){
            if(err){
                console.log(err);
                return res.json(err)
            } else {
                ChannelController.removeTeamChannels(item._id)
                item.remove();
            }
        })
    },
    

}