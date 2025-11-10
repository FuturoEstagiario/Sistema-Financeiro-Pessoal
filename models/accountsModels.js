const db = require('../config/database');

const accountsModels = {
    
    getAccountsUser: async (id_user) =>{
        const [ rows ] = await db.query('SELECT * FROM contas WHERE id_user_fk = ?', [ id_user ]);
        return rows;
    },

    createAccount: async(dataAccount, id_user) => {
        const { nome , tipo , saldo_inicial } = dataAccount;
        await db.query('INSERT INTO contas (nome, tipo, saldo_inicial, id_user_fk) VALUES (?,?,?,?)', [ nome, tipo, saldo_inicial, id_user ]);
    },

    updateAccount: async (id_conta, dataAccount, id_user) =>{
        const { nome, tipo, saldo_inicial } = dataAccount;
        await db.query('UPDATE contas SET nome = ? , tipo = ? , saldo_inicial = ? WHERE id_conta = ? AND id_user_fk = ?', 
            [ nome, tipo, saldo_inicial, id_conta, id_user])   
    },

    deleteAccount: async(id_conta, id_user) =>{
        await db.query('DELETE FROM contas WHERE id_conta = ? AND id_user_fk = ?', [ id_conta, id_user ])
    }
};

module.exports = accountsModels;