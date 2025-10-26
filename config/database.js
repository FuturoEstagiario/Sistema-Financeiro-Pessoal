const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'rodrigues@02',
    database : 'dbcrud',
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Banco de dados conectado com sucesso");
    connection.release();
  } catch (err) {
    console.log('Erro ao conectar com o banco de dados', err);
  }
})();

module.exports = pool;