// app/api/auth/forgotPassword/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request) {
  const { email } = await request.json();
  
  // Find the user by email
  const [existingUser] = await pool.query('SELECT * FROM login_cred WHERE email = ?', [email]);

  if (existingUser.length > 0) {
    const newPassword = Math.random().toString(36).slice(2);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const userId = existingUser[0].user_id;
    const newObj = {
      email : existingUser[0].email,
      password : newPassword,
    }
    // update db
    await pool.query('UPDATE login_cred SET password = ? WHERE user_id = ?', [hashedPassword, userId]);
    return NextResponse.json(newObj);
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'No acouunt found matching this email address' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );  
  }
}
