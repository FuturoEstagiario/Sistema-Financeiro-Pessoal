const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categoriesController');

const isAuthenticate = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

router.use(isAuthenticate);

router.get('/categories', categoriesController.listCategories);
router.get('/categories/create', categoriesController.showCreateCategoryForm);
router.post('/categories/create', categoriesController.createCategory);
router.get('/categories/edit/:id', categoriesController.showEditCategoryForm);
router.post('/categories/update/:id', categoriesController.updateCategory);
router.post('/categories/delete/:id', categoriesController.deleteCategory);

module.exports = router;