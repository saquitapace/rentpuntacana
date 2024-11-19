import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function POST(request) {
  const { userId } = await request.json();

  const response = await pool.query("SELECT notifications.id, notifications.userId, notifications.fromId, notifications.description, notifications.url AS href, notifications.status, notifications.timestamp AS time, users.avatar, users.first_name, users.last_name, CONCAT(COALESCE(users.first_name,''),' ' ,COALESCE(SUBSTRING(users.first_name,1,1),'')) as name FROM notifications LEFT JOIN users ON users.user_id = notifications.fromId where notifications.status <=1  AND notifications.userId =?", [userId]);
  
  return NextResponse.json(response);
}