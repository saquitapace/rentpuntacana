// create message
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId, fromId, message, } = await request.json();

  const response = await pool.query('INSERT INTO messages (userId, fromId, message) VALUES (?, ?, ?)', [userId, fromId, message]);
  
  return NextResponse.json(response);
}