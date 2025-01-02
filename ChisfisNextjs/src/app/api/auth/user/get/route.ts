//user get
import { pool } from '../../../../../lib/db';

export async function getUserByEmail(email: string) {
    try {
      console.log('Fetching user for email:', email);
      const [rows] = await pool.execute(
        `SELECT
         u.userId,
         u.accountType, 
         u.avatar,
         u.companyName,
         CONCAT( COALESCE(u.firstName, ''), ' ', 
         COALESCE( u.lastName, '' ) ) AS fullName,
         CONCAT( COALESCE(u.firstName, ''), ' ', 
         COALESCE( SUBSTRING(u.lastName, 1, 1), '' ) ) AS displayName,
        u.firstName,
        u.lastName,
        u.location,
        u.phoneNumber,
        u.about,
        u.languages,
        u.socials,
        u.createdAt,
        lc.email, lc.password, lc.google_id, lc.auth_type, lc.jwt, lc.jwtExpiresAt
         FROM users u 
         JOIN login_cred lc ON u.userId = lc.userId 
         WHERE lc.email = ?`,
        [email]
      );
      console.log('Query result:', rows);

      const user = (rows as any[])[0];

      user.socials = JSON.parse(user.socials);
      user.languages = JSON.parse(user.languages);

      if (!user) {
        return null; // Return null when no user is found
      }
      
      return user;
    } catch (error) {
      console.error('Database error in getUserByEmail:', error);
      throw new Error('Failed to fetch user');
    }
  }