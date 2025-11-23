const db = require('../config/database');

const transactionsModels = {

    getTransactionsByUser: async (id_user) => {
        const [rows] = await db.query(
            `SELECT 
                t.id_transacao,
                t.descricao,
                t.valor,
                t.data,
                t.comprovante_path,
                c.nome AS conta_nome,
                cat.nome_categoria,
                grp.tipo_grupo
             FROM transacoes AS t
             JOIN contas AS c ON t.id_conta_fk = c.id_conta
             JOIN categorias AS cat ON t.id_categoria_fk = cat.id_categoria
             JOIN categorias_grupo AS grp ON cat.id_grupo_fk = grp.id_grupo
             WHERE t.id_user_fk = ?
             ORDER BY t.data DESC`,
            [id_user]
        );
        return rows;
    },

    getTransactionById: async (id_transacao, id_user) => {
        const [rows] = await db.query(
            'SELECT * FROM transacoes WHERE id_transacao = ? AND id_user_fk = ?',
            [id_transacao, id_user]
        );
        return rows[0];
    },

    createTransaction: async (transactionData, id_user) => {
        const {
            descricao,
            valor,
            data,
            id_conta_fk,
            id_categoria_fk,
            comprovante_path
        } = transactionData;
        
        await db.query(
            'INSERT INTO transacoes (descricao, valor, data, id_conta_fk, id_categoria_fk, comprovante_path, id_user_fk) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [descricao, valor, data, id_conta_fk, id_categoria_fk, comprovante_path, id_user]
        );
    },

    updateTransaction: async (id_transacao, transactionData, id_user) => {
        const {
            descricao,
            valor,
            data,
            id_conta_fk,
            id_categoria_fk,
            comprovante_path
        } = transactionData;

        if (comprovante_path) {
            await db.query(
                'UPDATE transacoes SET descricao=?, valor=?, data=?, id_conta_fk=?, id_categoria_fk=?, comprovante_path=? WHERE id_transacao=? AND id_user_fk=?',
                [descricao, valor, data, id_conta_fk, id_categoria_fk, comprovante_path, id_transacao, id_user]
            );
        } else {
            await db.query(
                'UPDATE transacoes SET descricao=?, valor=?, data=?, id_conta_fk=?, id_categoria_fk=? WHERE id_transacao=? AND id_user_fk=?',
                [descricao, valor, data, id_conta_fk, id_categoria_fk, id_transacao, id_user]
            );
        }
    },

    deleteTransaction: async (id_transacao, id_user) => {
        await db.query(
            'DELETE FROM transacoes WHERE id_transacao = ? AND id_user_fk = ?',
            [id_transacao, id_user]
        );
    }
    
};

module.exports = transactionsModels;