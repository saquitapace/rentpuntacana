//getReviews service
import { NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db';

export async function POST(request) {
  const { id } = await request.json();
  
  const response = await pool.query(`
    SELECT
      user_reviews.id,
      user_reviews.userId,
      user_reviews.reviewerId,
      user_reviews.review,
      user_reviews.rating,
      user_reviews.timestamp AS time,
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
        user_reviews 
    LEFT JOIN users ON users.userId = user_reviews.reviewerId
    WHERE
       user_reviews.userId = ?`, [id]);

  return NextResponse.json(response);
} 