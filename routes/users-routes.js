const express = require('express');
const router = express.Router();
const userController = require('../controllers/users-controller');

router.route('/register').post(userController.createUser);
router.route('/login').post(userController.login);

module.exports = router;
