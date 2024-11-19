// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request) {
  const {companyName, firstName, lastName, email, phoneNumber, languages, about, userId} = await request.json();
  const r = await pool.query('UPDATE users SET company_name=?, first_name=?, last_name=?, email=?, phone_number=?, languages=?, about=? WHERE user_id=?', [companyName,firstName, lastName, email, phoneNumber, JSON.stringify( languages ), about, userId]);
  const r2 = await pool.query('UPDATE login_cred SET email=? WHERE user_id=?', [email, userId]);

  /*const [userInfo] = await pool.query('SELECT * FROM users WHERE user_id = ?', userId);
  const userInfoClean = userInfo[0];
  userInfoClean.likes = [];
  userInfoClean.languages = [];
  userInfoClean.email = email; */

  // todo: send welcome email
  return NextResponse.json();
}