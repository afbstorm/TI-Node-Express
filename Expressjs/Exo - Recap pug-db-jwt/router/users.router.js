const UserController = require('../controllers/users.controller');
const UserRouter = require('express').Router();

UserRouter.route('/list')
                            .get(UserController.getAll);

module.exports = UserRouter;
