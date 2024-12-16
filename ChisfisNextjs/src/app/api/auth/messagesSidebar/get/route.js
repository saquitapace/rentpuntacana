//get messages service
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId } = await request.json();
  
  const response = await pool.query(`
    SELECT DISTINCT (a.fromId) AS id,
      a.fromId,
      a.userId,
      b.avatar,
        CONCAT(
            COALESCE(b.firstName, ''),
            ' ',
            COALESCE(
                SUBSTRING(b.lastName, 1, 1),
                ''
            )
        ) AS name
      from messages a, users b where a.fromId = b.userId and a.userId = ? group by a.fromId
     `, [userId]);

  return NextResponse.json(response);
} 