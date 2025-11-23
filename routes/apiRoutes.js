const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');

const isAuthenticate = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

router.use(isAuthenticate);

router.get('/api/transactions', apiController.getUserTransactions);

module.exports = router;