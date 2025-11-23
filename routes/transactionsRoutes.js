const express = require('express');
const router = express.Router();
const transactionsController = require('../controller/transactionsController');
const upload = require('../config/multer'); 

const isAuthenticate = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

router.use(isAuthenticate);

router.get('/transactions', transactionsController.listTransactions);
router.get('/transactions/create', transactionsController.showCreateTransactionForm);
router.post('/transactions/create', upload.single('comprovante'), transactionsController.createTransaction);
router.get('/transactions/edit/:id', transactionsController.showEditTransactionForm);
router.post('/transactions/update/:id', upload.single('comprovante'), transactionsController.updateTransaction);
router.post('/transactions/delete/:id', transactionsController.deleteTransaction);

module.exports = router;