const mongoose = require('mongoose');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Channel = mongoose.model('Channel');

module.exports = {
    create: function (req, res) {
        console.log('===INSIDE TEAM CREATE CONTROLLER===')
        //Create team by first finding logged in user to set as admin
        User.findOne({ _id: req.session.id }, 
            function (errors, userQuery){
                if(errors || userQuery == null){
                    return res.json({ Error: 'Need to be logged in to create a team' })
                }
            let newTeam = new Team({
                name: req.body.name,
                _admin: userQuery._id
            });
            newTeam.save(function (err) {
                if (err) {
                    return res.json({Error: 'Team could not be saved'})
                } else {
                    let defaultChannel = new Channel({
                        name: "General",
                        created_by: userQuery._id,
                    });
                    defaultChannel.users.push(userQuery._id)
                    defaultChannel.save(function (err){
                        if (err) {
                            return res.json({Error: "General Channel could not be created"})
                        } else {
                            newTeam.update({_id: newTeam._id}, 
                            {
                                $addToSet: {users: userQuery._id},
                                $addToSet: {channels: defaultChannel._id}
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
        User.findOne({_id: req.session.id}, 
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
                TeamController.removeTeamChannels(item._id)
                item.remove();
            }
        })
    },
    

}