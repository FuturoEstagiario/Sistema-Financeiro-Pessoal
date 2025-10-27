const express  = require('express');
const router  = express.Router();
const userController = require('../controller/usersController');

router.get('/users', userController.listUsers);
router.get('/user/:id', userController.userId);
router.post('/create', userController.createUser);
router.post('/update/:id', userController.updateUser);
router.post('/delete/:id', userController.deleteUser);
router.get('/register', userController.registerUser);
router.get('/login', userController.showLogin);
router.post('/login', userController.authenticationUser);

module.exports = router;