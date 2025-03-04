import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Check if email already exists
    const [rows] = await pool.query('SELECT id FROM newsletter_lists WHERE email = ?', [email]);

    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    await pool.query('INSERT INTO newsletter_lists (email) VALUES (?)', [email]);

    return NextResponse.json({ message: 'Subscription successful' }, { status: 201 });
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
