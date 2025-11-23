const db = require('../config/database');

const dashboardModels = {

    getTotalBalance: async (userId) => {
        // 1. Initial Balance
        const [accounts] = await db.query(
            'SELECT SUM(saldo_inicial) as initial_total FROM contas WHERE id_user_fk = ?', 
            [userId]
        );
        const initialBalance = accounts[0].initial_total || 0;

        // 2. Incomes (Receitas)
        const [incomes] = await db.query(`
            SELECT SUM(t.valor) as total_income 
            FROM transacoes t
            JOIN categorias c ON t.id_categoria_fk = c.id_categoria
            JOIN categorias_grupo g ON c.id_grupo_fk = g.id_grupo
            WHERE t.id_user_fk = ? AND g.tipo_grupo = 'Receita'`, 
            [userId]
        );
        const totalIncome = incomes[0].total_income || 0;

        // 3. Expenses (Despesas)
        const [expenses] = await db.query(`
            SELECT SUM(t.valor) as total_expense 
            FROM transacoes t
            JOIN categorias c ON t.id_categoria_fk = c.id_categoria
            JOIN categorias_grupo g ON c.id_grupo_fk = g.id_grupo
            WHERE t.id_user_fk = ? AND g.tipo_grupo = 'Despesa'`, 
            [userId]
        );
        const totalExpense = expenses[0].total_expense || 0;

        // Calculation
        return parseFloat(initialBalance) + parseFloat(totalIncome) - parseFloat(totalExpense);
    },

    getMonthSummary: async (userId) => {
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();

        const [rows] = await db.query(`
            SELECT 
                g.tipo_grupo,
                SUM(t.valor) as total
            FROM transacoes t
            JOIN categorias c ON t.id_categoria_fk = c.id_categoria
            JOIN categorias_grupo g ON c.id_grupo_fk = g.id_grupo
            WHERE t.id_user_fk = ? 
            AND MONTH(t.data) = ? 
            AND YEAR(t.data) = ?
            GROUP BY g.tipo_grupo`, 
            [userId, month, year]
        );
        
        // Keys must match DB values ('Receita', 'Despesa')
        let summary = { Receita: 0, Despesa: 0 };
        rows.forEach(row => {
            summary[row.tipo_grupo] = row.total;
        });
        
        return summary;
    },

    getExpensesByGroup: async (userId) => {
        const [rows] = await db.query(`
            SELECT 
                g.nome_grupo,
                SUM(t.valor) as total
            FROM transacoes t
            JOIN categorias c ON t.id_categoria_fk = c.id_categoria
            JOIN categorias_grupo g ON c.id_grupo_fk = g.id_grupo
            WHERE t.id_user_fk = ? AND g.tipo_grupo = 'Despesa'
            GROUP BY g.nome_grupo
            ORDER BY total DESC`, 
            [userId]
        );
        return rows;
    }
};

module.exports = dashboardModels;