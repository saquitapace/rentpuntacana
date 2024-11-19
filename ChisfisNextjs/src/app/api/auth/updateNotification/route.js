// app/api/auth/updateNotificaitons/route.js 
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function PUT(request) {
  const { notificationId } = await request.json();
  const value = 1; //setting to 1 is marked as read
  const response = await pool.query('UPDATE notifications SET status=? WHERE id=?', [value ,notificationId]);
  
  return NextResponse.json(response);
}