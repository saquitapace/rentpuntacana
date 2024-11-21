const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
  user: 'root',
  port: 8889,
  password: 'root',
  database: 'rentpuntacana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
    });
    console.log('Successfully connected to the database.');
    await connection.end();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testConnection();