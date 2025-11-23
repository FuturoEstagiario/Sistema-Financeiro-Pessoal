const transactionsModels = require('../models/transactionsModels');

const apiController = {

    getUserTransactions: async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }

            const userId = req.session.user.id;
            const transactions = await transactionsModels.getTransactionsByUser(userId);

            res.status(200).json({
                success: true,
                count: transactions.length,
                data: transactions
            });

        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = apiController;