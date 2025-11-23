const db = require('../config/database');

const categoriesModels = {

    getCategoryGroups: async () => {
        // CORRIGIDO AQUI
        const [rows] = await db.query('SELECT * FROM categorias_grupo ORDER BY nome_grupo');
        return rows;
    },

    getCategoriesByUser: async (id_user) => {
        const [rows] = await db.query(
            `SELECT cat.id_categoria, cat.nome_categoria, grp.nome_grupo 
             FROM categorias AS cat
             JOIN categorias_grupo AS grp ON cat.id_grupo_fk = grp.id_grupo 
             WHERE cat.id_user_fk = ?
             ORDER BY grp.nome_grupo, cat.nome_categoria`,
            [id_user]
        );
        return rows;
    },

    getCategoryById: async (id_categoria, id_user) => {
        const [rows] = await db.query(
            'SELECT * FROM categorias WHERE id_categoria = ? AND id_user_fk = ?',
            [id_categoria, id_user]
        );
        return rows[0];
    },

    createCategory: async (categoryData, id_user) => {
        const { nome_categoria, id_grupo_fk } = categoryData;
        await db.query(
            'INSERT INTO categorias (nome_categoria, id_grupo_fk, id_user_fk) VALUES (?, ?, ?)',
            [nome_categoria, id_grupo_fk, id_user]
        );
    },

    updateCategory: async (id_categoria, categoryData, id_user) => {
        const { nome_categoria, id_grupo_fk } = categoryData;
        await db.query(
            'UPDATE categorias SET nome_categoria = ?, id_grupo_fk = ? WHERE id_categoria = ? AND id_user_fk = ?',
            [nome_categoria, id_grupo_fk, id_categoria, id_user]
        );
    },

    deleteCategory: async (id_categoria, id_user) => {
        await db.query(
            'DELETE FROM categorias WHERE id_categoria = ? AND id_user_fk = ?',
            [id_categoria, id_user]
        );
    }
};

module.exports = categoriesModels;