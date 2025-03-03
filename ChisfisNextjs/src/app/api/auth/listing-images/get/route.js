//get listing images
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lid = searchParams.get("lid");

    const [response] = await pool.query(`SELECT id, url FROM listing_images WHERE listingId = ?`, [lid]);

    // Start id from 0 and increment
    const updatedResponse = response.map((item, index) => ({
      id: index,
      url: item.url,
    }));

    return NextResponse.json(updatedResponse);
  } catch (error) {
    console.error("Error fetching listing images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
