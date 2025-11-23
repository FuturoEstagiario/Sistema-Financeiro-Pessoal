const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/', homeController.index);
router.get('/features', homeController.features);
router.get('/about', homeController.about);

module.exports = router;