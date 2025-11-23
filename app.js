const express = require('express');
const path = require('path');
const session = require('express-session');
const db = require('./config/database.js');

const homeRoutes = require('./routes/homeRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const accountsRoutes = require('./routes/accountsRoutes.js');
const categoriesRoutes = require('./routes/categoriesRoutes.js');
const transactionsRoutes = require('./routes/transactionsRoutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');


const app = express();

app.use(session({
    secret: 'batataDoceSoServeParaGanharMassa',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRoutes);
app.use('/', usersRoutes);
app.use('/', accountsRoutes);
app.use('/', categoriesRoutes);
app.use('/', transactionsRoutes);
app.use('/', dashboardRoutes);
app.use('/', apiRoutes);
app.use('/', usersRoutes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));