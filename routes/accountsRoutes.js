const express  = require('express');
const router  = express.Router();
const accountsController = require('../controller/accountsController');

const isAuthenticate = (req, res, next) =>{
    if(req.session.user){
        return next();
    }

    res.redirect('/login');
};

router.get('/accounts', isAuthenticate, accountsController.listAccounts);
router.get('/accounts/create', isAuthenticate, accountsController.showCreateAccount);
router.post('/accounts/create', isAuthenticate, accountsController.createAccount);
router.get('/accounts/update/:id', isAuthenticate, accountsController.showUpdateAccount);
router.post('/accounts/update/:id', isAuthenticate, accountsController.updateAccount);
router.post('/accounts/delete/:id', isAuthenticate, accountsController.deleteAccount);


module.exports = router;