const UserController = require('../controllers/userController');

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
}