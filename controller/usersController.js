const userModels = require('../models/usersModels');
const express = require('express')

const userController = {

    listUsers: async (req, res) =>{
        try{
            const users = await userModels.getData();
            res.render('usersView', { users });   
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
            res.render('editUserView', { user });
        } catch(error){
            console.error('Erro ao encontrar o usuário', error);
            res.status(500).send('Erro ao encontrar o usuário');
        }
    },

    registerUser: async(req, res) =>{
        try{
            res.render('registerUserView');
        } catch{
            console.log('Erro ao carregar a página de registro');
            res.status(500).send('Erro ao carregar a página de registro');
        };
    },

    showLogin: async(req, res) =>{
        try{
            res.render('loginView');
        } catch{
            console.log('Falha ao carregar a tela de login');
            console.status(500).send('Falha ao carregar tela de login');
        }
    },

    authenticationUser: async(req, res) =>{
        
    },


    createUser: async(req, res) =>{
        try{
            const userData = req.body;
            userData.user_status =1;
            await userModels.createUser(userData);
            res.redirect('/login');
        } catch{
            console.error('Erro ao criar usuário');
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
            console.error('Erro ao atualizar usuário');
            res.status(500).send('Erro ao atualizar usuário');
        }
    },

    deleteUser: async(req, res) =>{
        try{
            const id_user = req.params.id;
            await userModels.deleteUser(id_user);
            res.redirect('/users');
        } catch(error){
            console.error('Erro ao deletar usuário');
            res.status(500).send('Erro ao deletar usuário')
        }
    }
}

module.exports = userController;



