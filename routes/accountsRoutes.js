const express  = require('express');
const router  = express.Router();
const accountsController = require('../controller/accountsController');

const isAuthenticate = (req, res, next) =>{
    if(req.session.user){
        return next();
    }

    res.redirect('/login');
};

router.use(isAuthenticate);

router.get('/accounts', accountsController.listAccounts);
router.get('/accounts/create', accountsController.showCreateAccount);
router.post('/accounts/create', accountsController.createAccount);
router.get('/accounts/update/:id', accountsController.showUpdateAccount);
router.post('/accounts/update/:id', accountsController.updateAccount);
router.post('/accounts/delete/:id', accountsController.deleteAccount);


module.exports = router;