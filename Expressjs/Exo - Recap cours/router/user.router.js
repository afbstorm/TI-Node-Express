const UserController = require('../controllers/user.controller');
const express = require('express');
const UserRouter = express.Router();

UserRouter.route('/login')
                        .get(UserController.login)
                        .post(UserController.login); // login

UserRouter.route('/register')
                        .get( UserController.register)
                        .post(UserController.register); // register

UserRouter.get('/list', UserController.protected, UserController.getAll); // list car listing des users
UserRouter.get('/user/:id', UserController.getUserById);
UserRouter.route('/users/update/:id')
                        .get(UserController.update)
                        .post(UserController.update);
UserRouter.get('/protected', UserController.protected); // Garde l'accès a certaines routes



module.exports = UserRouter;
