import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let userId = searchParams.get('userId');

  if (!userId || userId === 'null') {
    userId = 'M29SZDR4QDJBB6';
    console.log('Using default userId:', userId);
  }

  console.log('Fetching data for user ID:', userId);

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM users WHERE user_id = ?', [userId]);
    connection.release();

    if (rows.length > 0) {
      const userData = rows[0];
      return NextResponse.json({
        userId: userData.user_id,
        accountType: userData.account_type,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        companyName: userData.company_name,
        address: userData.address || '',
        phoneNumber: userData.phone_number || '',
        about: userData.about || '',
        avatar: userData.avatar || '/images/avatars/default.png',
        languages: userData.languages || '',
        createdAt: userData.created_at || ''
      });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error: unknown) {
    console.error('Error fetching user data:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
}
