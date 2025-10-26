const db = require('./config/database.js');
const usersRoutes = require('./routes/usersRoutes.js');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', usersRoutes);

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));