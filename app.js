const db = require('./config/database.js');
const usersRoutes = require('./routes/usersRoutes.js');
const express = require('express');
const path = require('path');
const session = require('express-session')

const app = express();

app.use(session({
    secret: 'batataDoceSoServeParaGanharMassa', // Troque isso por uma string aleatória
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Em produção (com HTTPS) use 'true'
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', usersRoutes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));