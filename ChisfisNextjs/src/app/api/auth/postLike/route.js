// app/api/auth/postLike/route.js
import { NextResponse } from 'next/server';
import { pool } from '../../../../lib/db';

export async function POST(request) {
  const { userId, property_id } = await request.json();

  // Insert the like
  const response = await pool.query('INSERT INTO saved_properties (userId, property_id) VALUES (?, ?)', [userId, property_id]);
  //const updatedLikes = await pool.query('SELECT id, property_id FROM saved_properties WHERE userId = ?', [userId]);
  
  return NextResponse.json(response);
}
