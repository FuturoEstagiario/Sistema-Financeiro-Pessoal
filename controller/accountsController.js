const accountsModels = require('../models/accountsModels');

const accountsController = {
    
    listAccounts: async (req, res) =>{
        try{
            const id_user = req.session.user.id
            const accounts = await accountsModels.getAccountsUser(id_user);
            res.render('accounts/listAccountsView', { accounts });   
        } catch(error){
            console.error('Erro ao listar as contas', error);
            res.status(500).send('Erro ao listar contas');
        }
    },

    showCreateAccount: async(req, res) => {
        try{
            res.render('accounts/createAccountView');
        } catch(error){
            console.error('Erro ao carregar formulário', error)
            res.status(500).send('Erro ao carregar página')
        }
    },

    createAccount: async(req, res) =>{
        try{
            const dataAccount = req.body;
            const id_user = req.session.user.id;
            await accountsModels.createAccount(dataAccount, id_user);
            res.redirect('/accounts');
        } catch(error){
            console.error('Erro ao criar conta', error);
            res.status(500).send('Erro ao criar conta');
        }
    },

    showUpdateAccount: async(req, res) =>{
        try{
            const id_conta = req.params.id;
            const id_user = req.session.user.id;
            const account = await accountsModels.getAccountsUser(id_conta, id_user);

            if(!account){
                return res.redirect('/accounts');
            };
            res.render('accounts/editAccountView', { account });
            
        } catch(error) {
            console.error('Erro ao carregar a página de edição de conta', error);
            res.status(500).send('Erro ao carregar a página de edição de conta');
        }
    },

    updateAccount: async(req, res) =>{
        try{
            const id_conta = req.params.id;
            const id_user = req.session.user.id;
            const dataAccount = req.body;

            await accountsModels.updateAccount(id_conta, dataAccount, id_user);
            
            res.redirect('/accounts');
        } catch(error) {
            console.error('Erro ao atualizar a conta', error);
            res.status(500).send('Erro ao atualizar a conta');
        }
    },

    deleteAccount: async(req, res) =>{
        try{
            const id_conta = req.params.id;
            const id_user = req.session.user.id;
            await accountsModels.deleteAccount(id_conta, id_user);
            res.redirect('/accounts')
        } catch(error) {
            console.error('Erro ao deletar a conta', error);
            res.status(500).send('Erro ao deletar a conta');
        }
    }

};

module.exports = accountsController;