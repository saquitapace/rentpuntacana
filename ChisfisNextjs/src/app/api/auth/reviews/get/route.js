//getReviews service
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { reviewId } = await request.json();
  
  const response = await pool.query(`
    SELECT
      agentReviews.id,
      agentReviews.userId,
      agentReviews.reviewerId,
      agentReviews.review,
      agentReviews.rating,
      agentReviews.timestamp AS time,
      users.avatar,
      users.firstName,
      users.lastName,
      CONCAT(
          COALESCE(users.firstName, ''),
          ' ',
          COALESCE(
              SUBSTRING(users.firstName, 1, 1),
              ''
          )
      ) AS name
    FROM
        agentReviews 
    LEFT JOIN users ON users.userId = agentReviews.reviewerId
    WHERE
       agentReviews.userId = ?`, [userId]);
      
  return NextResponse.json(response);
} 