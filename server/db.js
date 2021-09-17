const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  user: 'root',
  password: 'inok',
  host: 'localhost',
  port: 3306,
  database: 'mysqlerntodo',
});

module.exports = pool;
