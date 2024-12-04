//postlike
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function PUT(request) {
  const { userId, listingId } = await request.json();
    const response = await pool.query(`
      DELETE FROM 
        saved_properties
        WHERE property_id=? and userId =?`, 
      [listingId, userId]);
  return NextResponse.json(response);
}