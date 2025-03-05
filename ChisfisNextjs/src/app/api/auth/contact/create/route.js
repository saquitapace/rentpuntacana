import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const { fullname, subject, email, phoneNo, message } = await request.json();

    await pool.query('INSERT INTO listing_contacts (fullname, subject, email, phoneNo, message) VALUES (?,?,?,?,?)', [fullname, subject, email, phoneNo, message]);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error processing contact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
