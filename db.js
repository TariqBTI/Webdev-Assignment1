const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'a1',
  password: 'Tariq',
  database: 'apitest'
});

module.exports = {
  query: pool.query.bind(pool)
};
