// app/api/auth/signin/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  const { email, password } = await request.json();

  // Find the user by email
  const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (user.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 400 });
  }

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Sign in successful' });
}
