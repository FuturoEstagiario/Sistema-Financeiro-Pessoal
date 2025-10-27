const db = require('../config/database');
const bcrypt = require('bcrypt');

const userModels = {
    
    getData: async ()=>{
        const [ rows ] = await db.query('SELECT * FROM users');
        return rows;
    },

    getUserId: async (id) =>{
        const [ rows ] = await db.query('SELECT * FROM users WHERE id_user = ?', [ id ])
        return rows[0];
    },

    createUser: async (userData) =>{
        const { id_user, nome_completo, login, senha, user_status } = userData;
        const saltRound = 10;
        const senhaHash = await bcrypt.hash(senha, saltRound);
        await db.query('INSERT INTO users (id_user, nome_completo, login, senha, user_status) values (?, ?, ?, ?, ?)',
        [ id_user, nome_completo, login, senhaHash, user_status ])
    },

    updateUser: async (id_user, userData) =>{
        const { nome_completo, login, senha, user_status } = userData;
        if(senha && senha.length > 0){
            const saltRound = 10;
            const senhaHash = await bcrypt.hash(senha, saltRound);
            await db.query('UPDATE users SET nome_completo = ? , login = ? , senha = ? , user_status = ? WHERE id_user = ?',
            [ nome_completo, login, senhaHash, user_status, id_user])
        } else{
            await db.query('UPDATE users SET nome_completo = ? , login = ? , user_status = ? WHERE id_user = ?',
            [ nome_completo, login, user_status, id_user])
        }    
    },

    deleteUser: async(id) =>{
        await db.query('DELETE FROM users WHERE id_user = ?', [ id ])
    }
}

module.exports = userModels;