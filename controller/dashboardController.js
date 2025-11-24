const dashboardModels = require('../models/dashboardModels');
const transactionsModels = require('../models/transactionsModels'); 

const dashboardController = {

    showDashboard: async (req, res) => {
        try {
            const userId = req.session.user.id;

            const [totalBalance, monthSummary, expensesByGroup] = await Promise.all([
                dashboardModels.getTotalBalance(userId),
                dashboardModels.getMonthSummary(userId),
                dashboardModels.getExpensesByGroup(userId)
            ]);

            res.render('dashboard/dashboardView', { 
                user: req.session.user,
                totalBalance,   
                monthSummary,     
                expensesByGroup   
            });

        } catch (error) {
            console.error('Error loading dashboard:', error);
            res.status(500).send('Error loading dashboard');
        }
    },

    downloadCsv: async (req, res) => {
        try {
            const userId = req.session.user.id;
            const transactions = await transactionsModels.getTransactionsByUser(userId);

            let csv = 'Data;Descricao;Valor;Tipo;Categoria;Conta\n';

            transactions.forEach(t => {
                const date = new Date(t.data).toLocaleDateString('pt-BR');
                const value = parseFloat(t.valor).toFixed(2).replace('.', ',');
                
                // Constructing the line
                const line = `${date};${t.descricao};${value};${t.tipo_grupo};${t.nome_categoria};${t.conta_nome}\n`;
                csv += line;
            });

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=financial_report.csv');
            res.status(200).send(csv);

        } catch (error) {
            console.error('Error downloading CSV:', error);
            res.status(500).send('Error generating report');
        }
    }
};

module.exports = dashboardController;