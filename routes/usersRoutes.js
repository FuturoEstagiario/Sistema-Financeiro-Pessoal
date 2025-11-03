const express  = require('express');
const router  = express.Router();
const userController = require('../controller/usersController');

router.get('/', (req, res) =>{
    res.redirect('/login');
}); 

const isAuthenticate = (req, res, next) =>{
    if(req.session.user){
        return next();
    }

    res.redirect('/login');
};

router.get('/users', isAuthenticate, userController.listUsers);
router.get('/user/:id', isAuthenticate, userController.userId);
router.post('/create', isAuthenticate, userController.createUser);
router.post('/update/:id', isAuthenticate, userController.updateUser);
router.post('/delete/:id', isAuthenticate, userController.deleteUser);
router.get('/register', userController.registerUser);
router.get('/login', userController.showLogin);
router.post('/login', userController.authenticationLogin);
router.post('/logout', isAuthenticate, userController.logoutUser);

module.exports = router;