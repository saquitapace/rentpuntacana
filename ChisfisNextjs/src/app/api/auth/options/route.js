// app/api/auth/getOptions/route.js
import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function GET(request) {
  // get all options
  const response = await pool.query('SELECT * FROM OPTIONS ORDER BY ID');
  
  return NextResponse.json(response);
}