// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '4Gi,E8Kmix',
  database: process.env.DB_NAME || 'ensenas_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;