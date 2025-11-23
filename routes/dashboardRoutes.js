const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');

const isAuthenticate = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

router.use(isAuthenticate);

router.get('/dashboard', dashboardController.showDashboard);
router.get('/dashboard/download', dashboardController.downloadCsv);

module.exports = router;