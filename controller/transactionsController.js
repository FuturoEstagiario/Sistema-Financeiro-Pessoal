const transactionsModels = require('../models/transactionsModels');
const accountsModels = require('../models/accountsModels');
const categoriesModels = require('../models/categoriesModels');

const transactionsController = {

    listTransactions: async (req, res) => {
        try {
            const id_user = req.session.user.id;
            const transactions = await transactionsModels.getTransactionsByUser(id_user);
            res.render('transactions/transactionsView', { transactions });
        } catch (error) {
            console.error('Erro ao listar transações:', error);
            res.status(500).send('Erro ao listar transações');
        }
    },

    showCreateTransactionForm: async (req, res) => {
        try {
            const id_user = req.session.user.id;
            
            const [accounts, categories] = await Promise.all([
                accountsModels.getAccountsUser(id_user),
                categoriesModels.getCategoriesByUser(id_user) 
            ]);

            res.render('transactions/createTransactionView', { accounts, categories });
        } catch (error) {
            console.error('Erro ao carregar formulário:', error);
            res.status(500).send('Erro ao carregar página');
        }
    },

    createTransaction: async (req, res) => {
        try {
            const id_user = req.session.user.id;
            const transactionData = req.body;

            if (req.file) {
                transactionData.comprovante_path = req.file.filename;
            } else {
                transactionData.comprovante_path = null;
            }
            
            await transactionsModels.createTransaction(transactionData, id_user);

            res.redirect('/transactions'); 
        } catch (error) {
            console.error('Erro ao criar transação:', error);
            res.status(500).send('Erro ao criar transação');
        }
    },

    showEditTransactionForm: async (req, res) => {
        try {
            const id_transacao = req.params.id;
            const id_user = req.session.user.id;

            const [transaction, accounts, categories] = await Promise.all([
                transactionsModels.getTransactionById(id_transacao, id_user),
                accountsModels.getAccountsUser(id_user),
                categoriesModels.getCategoriesByUser(id_user)
            ]);

            if (!transaction) {
                return res.redirect('/transactions');
            }

            // Formata a data para o input type="date" (YYYY-MM-DD)
            // O input date precisa desse formato exato
            const dateObj = new Date(transaction.data);
            transaction.formattedDate = dateObj.toISOString().split('T')[0];

            res.render('transactions/editTransactionView', { transaction, accounts, categories });

        } catch (error) {
            console.error('Erro ao carregar edição:', error);
            res.status(500).send('Erro ao carregar página');
        }
    },

    updateTransaction: async (req, res) => {
        try {
            const id_transacao = req.params.id;
            const id_user = req.session.user.id;
            const transactionData = req.body;
            
            if (req.file) {
                transactionData.comprovante_path = req.file.filename;
            } else {
                transactionData.comprovante_path = null;
            }

            await transactionsModels.updateTransaction(id_transacao, transactionData, id_user);
            res.redirect('/transactions');

        } catch (error) {
            console.error('Erro ao atualizar transação:', error);
            res.status(500).send('Erro ao atualizar transação');
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const id_transacao = req.params.id;
            const id_user = req.session.user.id;
            await transactionsModels.deleteTransaction(id_transacao, id_user);
            res.redirect('/transactions');
        } catch (error) {
            console.error('Erro ao deletar transação:', error);
            res.status(500).send('Erro ao deletar transação');
        }
    }
};

module.exports = transactionsController;