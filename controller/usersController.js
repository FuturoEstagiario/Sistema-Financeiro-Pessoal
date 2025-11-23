const userModels = require('../models/usersModels');
const bcrypt = require('bcrypt');

const userController = {

    registerUser: async(req, res) =>{
        try{
            res.render('user/registerUserView');
        } catch(error){
            console.log('Erro ao carregar a página de registro', error);
            res.status(500).send('Erro ao carregar a página de registro');
        };
    },

    showLogin: async(req, res) =>{
        try{
            res.render('user/loginView');
        } catch(error){
            console.log('Falha ao carregar a tela de login', error);
            res.status(500).send('Falha ao carregar tela de login');
        }
    },

    authenticationLogin: async(req, res) =>{
        try{
            const { login, senha, remember } = req.body;
            const user = await userModels.getLogin(login);
            
            if(!user){
                return res.render('user/loginView', {error: 'Login not found'});
            }

            if(user.user_status == 0){
                return res.render('user/reactivateView', { user });
            }

            const identicalPasswords = await bcrypt.compare(senha, user.senha);
            
            if(identicalPasswords){       
                if (remember) {
                    req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; 
                } else {
                    req.session.cookie.expires = false; 
                }

                req.session.user = {
                    id: user.id_user,
                    nome: user.nome_completo,
                    login: user.login
                };
                res.redirect('/dashboard');
            } else{
                return res.render('user/loginView', {error: 'Incorrect password'});
            }
        } catch(error){
            console.error('Authentication failed', error);
            res.status(500).send('Server error during login');
        }
    },

    reactivateUser: async (req, res) => {
        try {
            const { id_user, nome_completo, login } = req.body;          
            await userModels.changeStatus(id_user, 1);
            req.session.user = {
                id: id_user,
                nome: nome_completo,
                login: login
            };

            res.redirect('/dashboard');

        } catch (error) {
            console.error('Error reactivating user', error);
            res.status(500).send('Error reactivating user');
        }
    },

    deleteMyProfile: async (req, res) => {
        try {
            const id_user = req.session.user.id;    
            await userModels.changeStatus(id_user, 0);         
            req.session.destroy();
            res.clearCookie('connect.sid');
            res.redirect('/login');
            
        } catch (error) {
            console.error('Error deactivating account', error);
            res.status(500).send('Error deactivating account');
        }
    },

    logoutUser: (req, res) => {
        req.session.destroy((err) => {
            if(err){
                console.log('Erro ao fazer logout', err);
                return res.redirect('/dashboard');
            };
            res.clearCookie('connect.sid') 
            res.redirect('/')
        }) 
    },

    createUser: async(req, res) =>{
        try{
            const userData = req.body;
            userData.user_status = 1;
            await userModels.createUser(userData);
            res.redirect('/login');
        } catch(error){
            console.error('Erro ao criar usuário', error);
            res.status(500).send('Erro ao criar usuário');
        }
    },

    showMyProfile: async (req, res) => {
        try{
            const id_user = req.session.user.id;
            const user = await userModels.getUserId(id_user);
            
            if(!user){
                return res.redirect('/login');
            }
            
            res.render('user/editUserView', { user });
        } catch(error){
            console.error('Erro ao encontrar o usuário', error);
            res.status(500).send('Erro ao encontrar o usuário');
        }
    },

    updateMyProfile: async(req, res) =>{
        try{
            const id_user = req.session.user.id;
            const userData = req.body;
            
            await userModels.updateUser(id_user, userData);
            
            req.session.user.nome = userData.nome_completo;
            req.session.user.login = userData.login;

            res.redirect('/dashboard');
        } catch(error) {
            console.error('Erro ao atualizar perfil', error);
            res.status(500).send('Erro ao atualizar perfil');
        }
    }
}

module.exports = userController;