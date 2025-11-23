const express = require('express');
const router = express.Router();
const userController = require('../controller/usersController');

const isAuthenticate = (req, res, next) =>{
    if(req.session.user){
        return next();
    }
    res.redirect('/login');
};

router.get('/', (req, res) =>{
    res.redirect('/login');
}); 

router.get('/login', userController.showLogin);
router.post('/login', userController.authenticationLogin);
router.get('/register', userController.registerUser);
router.post('/create', userController.createUser);
router.post('/logout', isAuthenticate, userController.logoutUser);
router.get('/profile', isAuthenticate, userController.showMyProfile);
router.post('/profile/update', isAuthenticate, userController.updateMyProfile);
router.post('/profile/delete', isAuthenticate, userController.deleteMyProfile);
router.post('/reactivate', userController.reactivateUser);

module.exports = router;