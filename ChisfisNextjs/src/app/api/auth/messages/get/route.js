//get messages service
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId } = await request.json();
  
  const response = await pool.query(`
    SELECT DISTINCT (fromId),
      messages.id,
      messages.userId,
      messages.fromId
      from messages where userId = ? 
     `, [userId]);
      
  return NextResponse.json(response);
} 

//SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));