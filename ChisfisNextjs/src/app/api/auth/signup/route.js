// app/api/auth/signup/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  const { accountType, companyName, firstName, lastName, email, password } = await request.json();

  // Check if the user already exists
  const [existingUser] = await pool.query('SELECT * FROM login_cred WHERE email = ?', [email]);

  if (existingUser.length > 0) {
    return new NextResponse(
      JSON.stringify({ message: 'An account with this email already exists' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );  
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // generate unique user_id (varchar)
  const dateStr = Date
    .now()
    .toString(36); // convert num to base 36 and stringify

  const randomStr = Math
    .random()
    .toString(36)
    .substring(2, 8); // start at index 2 to skip decimal point

  const uniqueId = (dateStr+randomStr).toUpperCase();
  const avatar = "http://localhost:8888/images/avatars/default.png";
  // Insert the new user into the database
  await pool.query('INSERT INTO login_cred (user_id, email, password) VALUES (?, ?, ?)', [uniqueId, email, hashedPassword]);
  await pool.query('INSERT INTO users (user_id, account_type, first_name, last_name, company_name, avatar) VALUES (?, ?, ?, ?, ?,?)', [uniqueId, accountType, firstName, lastName, companyName, avatar]);

  const [userInfo] = await pool.query('SELECT * FROM users WHERE user_id = ?', uniqueId);
  const userInfoClean = userInfo[0];
  userInfoClean.likes = [];
  userInfoClean.languages = [];
  userInfoClean.email = email;

  // todo: send welcome email
  return NextResponse.json(userInfoClean);
}
