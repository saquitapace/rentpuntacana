// app/api/auth/i81n/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function GET(request) {
  // get all options
  const response = await pool.query('SELECT * FROM i18n ORDER BY ID');
  
  return NextResponse.json(response);
}