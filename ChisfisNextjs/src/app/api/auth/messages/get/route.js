//get messages service
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId } = await request.json();
  
  const response = await pool.query(`SELECT messages.id, messages.message, messages.userId, messages.fromId, messages.isLiked, messages.timestamp, 
    users.avatar, CONCAT( COALESCE(users.firstName, ''), ' ', 
    COALESCE( SUBSTRING(users.lastName, 1, 1), '' ) ) AS name FROM messages
   LEFT JOIN users ON users.userId = messages.fromId WHERE messages.userId = ? or messages.fromId = ? ORDER BY timestamp ASC`, [userId, userId]);


  //SELECT messages.message, messages.userId, messages.fromId, messages.timestamp AS time, users.avatar, users.firstName, users.lastName, CONCAT( COALESCE(users.firstName, ''), ' ', COALESCE( SUBSTRING(users.lastName, 1, 1), '' ) ) AS name FROM messages
  // LEFT JOIN users ON users.userId = messages.fromId WHERE messages.userId = ? or messages.fromId = ?;

  return NextResponse.json(response);
}