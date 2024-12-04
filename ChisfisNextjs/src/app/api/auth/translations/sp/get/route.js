// app/api/auth/getOptions/route.js
import { NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db';

export async function GET(request) {
  // get translations
  const response = await pool.query(`SELECT ky, sp AS string FROM i18n`);
  
  return NextResponse.json(response);
}