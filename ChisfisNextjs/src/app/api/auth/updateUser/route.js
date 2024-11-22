// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function PUT(request) {
  const {companyName, firstName, lastName, email, phoneNumber, languages, about, userId} = await request.json();
  const r = await pool.query('UPDATE users SET companyName=?, firstName=?, lastName=?, email=?, phoneNumber=?, languages=?, about=? WHERE userId=?', [companyName,firstName, lastName, email, phoneNumber, JSON.stringify( languages ), about, userId]);
  const r2 = await pool.query('UPDATE login_cred SET email=? WHERE userId=?', [email, userId]);

  /*const [userInfo] = await pool.query('SELECT * FROM users WHERE userId = ?', userId);
  const userInfoClean = userInfo[0];
  userInfoClean.likes = [];
  userInfoClean.languages = [];
  userInfoClean.email = email; */

  // todo: send welcome email
  return NextResponse.json();
}