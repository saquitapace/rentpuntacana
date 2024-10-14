// app/api/auth/signup/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  const {  email, password } = await request.json();

  // Check if the user already exists
  const [existingUser] = await pool.query('SELECT * FROM login_cred WHERE email = ?', [email]);
  if (existingUser.length > 0) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  await pool.query('INSERT INTO login_cred ( email, password) VALUES (?, ?)', [email, hashedPassword]);

  return NextResponse.json({ message: 'User created successfully' });
}
