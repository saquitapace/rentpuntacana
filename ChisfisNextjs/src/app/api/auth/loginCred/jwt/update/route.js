// update jwt & jwtExpiresAt
import { NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db';

export async function PUT(request) {
  const { email, jwt, exp } = await request.json();
  const response = await pool.query(`
    UPDATE 
    login_cred 
      SET 
    jwt=?, 
    jwtExpiresAt=?
    WHERE email=?`, 
    [jwt, exp, email]);
  
  return NextResponse.json(response);
}