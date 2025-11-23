const categoriesModels = require('../models/categoriesModels');

const categoriesController = {

    listCategories: async (req, res) => {
        try {
            const id_user = req.session.user.id;
            const categories = await categoriesModels.getCategoriesByUser(id_user);
            res.render('categories/categoriesView', { categories });
        } catch (error) {
            console.error('Erro ao listar categorias:', error);
            res.status(500).send('Erro ao listar categorias');
        }
    },

    showCreateCategoryForm: async (req, res) => {
        try {
            const groups = await categoriesModels.getCategoryGroups();
            res.render('categories/createCategoryView', { groups });
        } catch (error) {
            console.error('Erro ao carregar formulário de criação:', error);
            res.status(500).send('Erro ao carregar página');
        }
    },

    createCategory: async (req, res) => {
        try {
            const id_user = req.session.user.id;
            await categoriesModels.createCategory(req.body, id_user);
            res.redirect('/categories');
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            res.status(500).send('Erro ao criar categoria');
        }
    },

    showEditCategoryForm: async (req, res) => {
        try {
            const id_categoria = req.params.id;
            const id_user = req.session.user.id;

            const [category, groups] = await Promise.all([
                categoriesModels.getCategoryById(id_categoria, id_user),
                categoriesModels.getCategoryGroups()
            ]);

            if (!category) {
                return res.redirect('/categories');
            }

            res.render('categories/editCategoryView', { category, groups });
        } catch (error) {
            console.error('Erro ao carregar formulário de edição:', error);
            res.status(500).send('Erro ao carregar página');
        }
    },

    updateCategory: async (req, res) => {
        try {
            const id_categoria = req.params.id;
            const id_user = req.session.user.id;
            await categoriesModels.updateCategory(id_categoria, req.body, id_user);
            res.redirect('/categories');
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            res.status(500).send('Erro ao atualizar categoria');
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id_categoria = req.params.id;
            const id_user = req.session.user.id;
            await categoriesModels.deleteCategory(id_categoria, id_user);
            res.redirect('/categories');
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            res.status(500).send('Erro ao deletar categoria');
        }
    }
};

module.exports = categoriesController;