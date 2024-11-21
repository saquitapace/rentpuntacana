import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  const { userId } = await request.json();

  const response = await pool.query("SELECT notifications.id, notifications.userId, notifications.fromId, notifications.description, notifications.url AS href, notifications.status, notifications.timestamp AS time, users.avatar, users.firstName, users.lastName, CONCAT(COALESCE(users.firstName,''),' ' ,COALESCE(SUBSTRING(users.firstName,1,1),'')) as name FROM notifications LEFT JOIN users ON users.userId = notifications.fromId where notifications.status <=1  AND notifications.userId =?", [userId]);
  
  return NextResponse.json(response);
} 