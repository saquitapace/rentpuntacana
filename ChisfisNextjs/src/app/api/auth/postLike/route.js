// app/api/auth/postLike/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  const { user_id, property_id } = await request.json();

  // Insert the like
  const response = await pool.query('INSERT INTO saved_properties (user_id, property_id) VALUES (?, ?)', [user_id, property_id]);
  const updatedLikes = await pool.query('SELECT id, property_id FROM saved_properties WHERE user_id = ?', [user_id]);

  //postLike
  return NextResponse.json(updatedLikes[0]);
}
