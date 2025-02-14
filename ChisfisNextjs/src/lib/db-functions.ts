import { pool } from './db';
import { generateUserId } from '@/utils/helpers';

// export async function getUserByEmail(email: string) {
//   try {
//     console.log('Fetching user for email:', email);
//     const [rows] = await pool.execute(
//       `SELECT u.*, lc.email, lc.password, lc.google_id, lc.auth_type, lc.jwt, lc.jwtExpiresAt
//        FROM users u 
//        JOIN login_cred lc ON u.userId = lc.userId 
//        WHERE lc.email = ?`,
//       [email]
//     );
//     console.log('Query result:', rows);
    
//     const user = (rows as any[])[0];
//     if (!user) {
//       return null; // Return null when no user is found
//     }
    
//     return user;
//   } catch (error) {
//     console.error('Database error in getUserByEmail:', error);
//     throw new Error('Failed to fetch user');
//   }
// }

export async function updateUser(userId: string, data: any) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Update users table
    if (Object.keys(data).some(key => ['firstName', 'lastName', 'companyName', 'phoneNumber', 'about', 'languages', 'avatar'].includes(key))) {
      const userUpdateFields = Object.entries(data)
        .filter(([key]) => ['firstName', 'lastName', 'companyName', 'phoneNumber', 'about', 'languages', 'avatar'].includes(key))
        .map(([key]) => `${key} = ?`)
        .join(', ');

      const userUpdateValues = Object.entries(data)
        .filter(([key]) => ['firstName', 'lastName', 'companyName', 'phoneNumber', 'about', 'languages', 'avatar'].includes(key))
        .map(([_, value]) => value);

      if (userUpdateFields) {
        await connection.execute(
          `UPDATE users SET ${userUpdateFields} WHERE userId = ?`,
          [...userUpdateValues, userId]
        );
      }
    }

    // Update login_cred table
    if (Object.keys(data).some(key => ['email', 'password', 'google_id', 'auth_type', 'email_verified'].includes(key))) {
      const loginUpdateFields = Object.entries(data)
        .filter(([key]) => ['email', 'password', 'google_id', 'auth_type', 'email_verified'].includes(key))
        .map(([key]) => `${key} = ?`)
        .join(', ');

      const loginUpdateValues = Object.entries(data)
        .filter(([key]) => ['email', 'password', 'google_id', 'auth_type', 'email_verified'].includes(key))
        .map(([_, value]) => value);

      if (loginUpdateFields) {
        await connection.execute(
          `UPDATE login_cred SET ${loginUpdateFields} WHERE userId = ?`,
          [...loginUpdateValues, userId]
        );
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    console.error('Database error in updateUser:', error);
    throw new Error('Failed to update user');
  } finally {
    connection.release();
  }
}

export async function createUser(userData: {
  userId?: string;
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  companyName?: string;
  avatar?: string;
  google_id?: string;
  auth_type?: 'credentials' | 'google';
}) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const userId = userData.userId || generateUserId();

    // First check if email already exists
    const [existingUsers] = await connection.execute(
      'SELECT userId FROM login_cred WHERE email = ?',
      [userData.email]
    );

    if ((existingUsers as any[]).length > 0) {
      throw new Error('Email already registered');
    }

    // Insert into users table with proper default values //saquita
    await connection.execute(
      `INSERT INTO users (
        userId, 
        accountType,
        firstName,
        lastName,
        companyName,
        avatar,
        phoneNumber,
        about,
        languages,
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        userData.accountType,
        userData.firstName,
        userData.lastName,
        userData.companyName || '',
        userData.avatar || '/images/avatars/default.png',
        0,
        'Hi! I am new here.',
        JSON.stringify(['English'])
      ]
    );

    // Insert into login_cred table
    await connection.execute(
      `INSERT INTO login_cred (
        userId,
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
        userData.auth_type === 'google' ? new Date() : null
      ]
    );

    await connection.execute(
      `INSERT INTO notifications (
        userId,
        fromId,
        description,
        url,
        status
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        userId,
        'ADMIN',
        'Welcome to Rent Punta Cana. Complete your profile.',
        '#',
        0
      ]
    );

    await connection.commit();
    
    return {
      userId,
      userId: userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      accountType: userData.accountType,
      avatar: userData.avatar || '/images/avatars/default.png',
      auth_type: userData.auth_type || 'credentials'
    };
  } catch (error) {
    await connection.rollback();
    console.error('Database error in createUser:', error);
    throw error; // Throw the actual error for better debugging
  } finally {
    connection.release();
  }
}

// export async function testConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('Database connected successfully');
//     connection.release();
//     return true;
//   } catch (error) {
//     console.error('Database connection error:', error);
//     return false;
//   }
// }