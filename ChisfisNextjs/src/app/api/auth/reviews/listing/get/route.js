//get listing reviews service
import { NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db';

export async function POST(request) {
    const { id } = await request.json();
    const response = await pool.query(`
      SELECT
        listing_reviews.id,
        listing_reviews.reviewerId,
        listing_reviews.review,
        listing_reviews.rating,
        listing_reviews.timestamp AS time,
        users.avatar,
        users.firstName,
        users.lastName,
        CONCAT(
            COALESCE(users.firstName, ''),
            ' ',
            COALESCE(
                SUBSTRING(users.lastName, 1, 1),
                ''
            )
        ) AS name
      FROM
          listing_reviews 
      LEFT JOIN users ON users.userId = listing_reviews.reviewerId
      WHERE
         listing_reviews.listingId = ?`, [id]);

  return NextResponse.json(response);
} 