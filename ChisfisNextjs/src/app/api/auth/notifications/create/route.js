// create notification
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId, description } = await request.json();
  const fromId = "123";
  const url = "";
  const status = 0;
  // saqyuita fix to have from who it is coming from.
  // Insert new notification
  const response = await pool.query('INSERT INTO notifications (userId, fromId, description, url, status) VALUES (?, ?, ?, ?, ?)', [userId, fromId, description, url, status]);
  
  return NextResponse.json(response);
}