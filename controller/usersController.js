const userModels = require('../models/usersModels');
const express = require('express');
const bcrypt = require('bcrypt');

const userController = {

    listUsers: async (req, res) =>{
        try{
            const users = await userModels.getData();
            res.render('user/usersView', { users });   
        } catch(error){
            console.error('Erro ao listar os usuários', error);
            res.status(500).send('Erro ao listar usuários');
        }
    },


    userId: async (req, res)=>{
        try{
            const id_user = req.params.id;
            const user = await userModels.getUserId(id_user);
            if(!user){
                res.status(404).send("Usuário não encontrado");
            }
            res.render('user/editUserView', { user });
        } catch(error){
            console.error('Erro ao encontrar o usuário', error);
            res.status(500).send('Erro ao encontrar o usuário');
        }
    },

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
            const { login, senha } = req.body;
            const user = await userModels.getLogin(login);
            if(!user){
                return res.render('user/loginView', {error: 'Login não encontrado'});
            }

            if(user.user_status == 0){
                return res.render('user/loginView', {error: 'Usuário Inativo'});
            }

            const identicalPasswords = await bcrypt.compare(senha, user.senha);
            if(identicalPasswords){
                req.session.user = {
                    id: user.id_user,
                    nome: user.nome_completo,
                    login: user.login
                };

                res.redirect('/users');
            } else{
                return res.render('user/loginView', {error: 'Senha incorreta'});
            }
        } catch(error){
            console.error('Falha na autenticação', error);
            res.status(500).send('Erro no servidor durante o login');
        }
    },

    logoutUser: (req, res) => {
        req.session.destroy((err) => {
            if(err){
                console.log('Erro ao fazer logout', err);
                res.redirect('/users');
            };
            //connectid.sid que significa Connect Session ID, nome padrão do cookie que a biblioteca express-session usa para rastrear as sessões no navegador do usuário
            res.clearCookie('connect.sid') 
            res.redirect('/login')
        }) 
    },


    createUser: async(req, res) =>{
        try{
            const userData = req.body;
            userData.user_status =1;
            await userModels.createUser(userData);
            res.redirect('/login');
        } catch(error){
            console.error('Erro ao criar usuário', error);
            res.status(500).send('Erro ao criar usuário');
        }
    },

    updateUser: async(req, res) =>{
        try{
            const id_user = req.params.id;
            const userData = req.body;
            const user = await userModels.updateUser(id_user, userData);
            res.redirect('/users');
        } catch(error) {
            console.error('Erro ao atualizar usuário', error);
            res.status(500).send('Erro ao atualizar usuário');
        }
    },

    deleteUser: async(req, res) =>{
        try{
            const id_user = req.params.id;
            await userModels.deleteUser(id_user);
            res.redirect('/users');
        } catch(error){
            console.error('Erro ao deletar usuário', error);
            res.status(500).send('Erro ao deletar usuário')
        }
    }
}

module.exports = userController;



