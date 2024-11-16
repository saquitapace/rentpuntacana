import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'rentpuntacana',
  port: parseInt(process.env.DB_PORT || '8889'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function getUserByEmail(email: string) {
  try {
    console.log('Fetching user for email:', email);
    const [rows] = await pool.execute(
      `SELECT u.*, lc.email, lc.password, lc.google_id, lc.auth_type 
       FROM users u 
       JOIN login_cred lc ON u.user_id = lc.user_id 
       WHERE lc.email = ?`,
      [email]
    );
    console.log('Query result:', rows);
    return (rows as any[])[0];
  } catch (error) {
    console.error('Database error in getUserByEmail:', error);
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(userData: {
  user_id?: string;
  account_type: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  company_name?: string;
  avatar?: string;
  google_id?: string;
  auth_type?: 'credentials' | 'google';
}) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const userId = userData.user_id || generateUserId();

    await connection.execute(
      `INSERT INTO users (
        user_id, 
        account_type, 
        first_name, 
        last_name, 
        company_name, 
        avatar,
        phone_number,
        about,
        languages
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        userData.account_type,
        userData.first_name,
        userData.last_name,
        userData.company_name || '',
        userData.avatar || '/images/avatars/default.png',
        0, // Default phone_number
        '', // Default about
        '[]' // Default languages as empty array
      ]
    );

    await connection.execute(
      `INSERT INTO login_cred (
        user_id, 
        email, 
        password, 
        google_id, 
        auth_type,
        email_verified
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        userData.email,
        userData.password || null,
        userData.google_id || null,
        userData.auth_type || 'credentials',
        userData.auth_type === 'google' ? new Date() : null // Set email_verified for Google users
      ]
    );

    await connection.commit();
    
    return {
      userId,
      user_id: userId,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      account_type: userData.account_type,
      avatar: userData.avatar || '/images/avatars/default.png',
      auth_type: userData.auth_type || 'credentials'
    };
  } catch (error) {
    await connection.rollback();
    console.error('Database error in createUser:', error);
    throw new Error('Failed to create user');
  } finally {
    connection.release();
  }
}

function generateUserId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export default pool; 