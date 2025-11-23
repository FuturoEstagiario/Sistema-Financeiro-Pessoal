const homeController = {
    index: (req, res) => {
        res.render('home/index');
    },

    features: (req, res) => {
        res.render('home/features');
    },

    about: (req, res) => {
        res.render('home/about');
    }
};

module.exports = homeController;