const mongoose = require('mongoose');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Channel = mongoose.model('Channel');
const TeamController = require('../controllers/teamController');

module.exports = {
    removeTeamChannels: function(id){
        Channel.remove({_team: id}).next(
            MessageController.destroyFromChannel(id)
        );
    },
}