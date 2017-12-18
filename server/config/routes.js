const UserController = require('../controllers/userController');
const TeamController = require('../controllers/teamController');

module.exports = function(app){
    app.post('/RegisterUser', function(req, res){
        UserController.create(req, res);
    });
    app.post('/LoginUser', function(req, res){
        UserController.login(req, res);
    });
    app.post('/ReadUser', function(req, res){
        UserController.read(req, res);
    });
    app.post('/UpdateUser', function(req, res){
        UserController.update(req, res);
    });
    app.post('/DestroyUser', function(req, res){
        UserController.destroy(req, res);
    });
    app.get('/LogoutUser', function(req, res){
        UserController.logout(req, res);
    });

    //Team Routes
    app.post('/api/team/create', function(req, res){
        TeamController.create(req, res);
    });
    app.post('/api/team/adduser', function(req, res){
        TeamController.addUser(req, res);
    });
    app.get('/api/user/teams', function(req, res){
        TeamController.getUserTeams(req, res);
    });
    app.get('/api/team/:id', function (req, res){
        TeamController.getTeam(req, res);
    });
    app.get('/api/team/:id/destroy', function (req, res){
        TeamController.getTeam(req, res);
    })
}