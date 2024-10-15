// app/api/auth/signin/route.js
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {

  const { email, password } = await request.json();
  // Find the user by email
  const [existingUser] = await pool.query('SELECT * FROM login_cred WHERE email = ?', [email]);

  if (existingUser.length === 0) {
    return new NextResponse(
      JSON.stringify({ message: 'No acouunt found matching this email address' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );
  }

  if (existingUser.length > 0) {

    const isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
    
    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ message: 'Incorrect password' }),
        {
          status: 402,
          headers: { 'content-type': 'application/json' }
        }
      );
    }
    else {
      const [userInfo] = await pool.query('SELECT * FROM users WHERE user_id = ?', existingUser[0].user_id);
      const userInfoClean = userInfo[0];
      // Razu - add nested sql gt user likes; get likes ? add to object 
      // {id: 123}
      // select all from likes table; {likes}  id | user_id | property_id| like | timestamp
      return NextResponse.json(userInfoClean);
    }
  }
}