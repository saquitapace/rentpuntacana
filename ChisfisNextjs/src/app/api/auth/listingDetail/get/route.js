// listings api
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
    const { listingId } = await request.json();
    const id = parseInt(listingId);
    
    const response = await pool.query('SELECT * FROM listings where listing_id = ? ',[id]);
  return NextResponse.json(response);
}