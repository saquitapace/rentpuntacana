// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'rentpuntacana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;