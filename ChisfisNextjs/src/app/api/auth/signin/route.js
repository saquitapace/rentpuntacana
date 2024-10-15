// app/api/auth/signin/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {

  const { email, password } = await request.json();
  // Find the user by email
  const [existingUser] = await pool.query('SELECT * FROM login_cred WHERE email = ?', [email]);

  if (existingUser.length === 0) {
    return NextResponse.json({ message: 'No user with this email was found' });
  }

  if (existingUser.length > 0) {

    const isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' });
    }
    else {
      const [userInfo] = await pool.query('SELECT * FROM users WHERE user_id = ?', existingUser[0].user_id);
      const userInfoClean = userInfo[0];
      return NextResponse.json(userInfoClean);
    }
  }
}
