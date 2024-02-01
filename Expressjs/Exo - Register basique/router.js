const router = require('express').Router();
const UserController = require('./user.controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/list', UserController.list);
router.get('/user/:userId', UserController.getDetails);

module.exports = router;
