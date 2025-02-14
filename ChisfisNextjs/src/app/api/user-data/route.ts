// user-data service
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../utils/authOptions';
import { pool } from '@/lib/db';
import { getUserByEmail } from '@/app/api/auth/user/get/route';
export const dynamic = 'force-dynamic';

// GET: Fetch user data

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }


    const user = await getUserByEmail(session.user.email)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

// PUT: Update user data
export async function PUT(req: NextRequest) {
  const connection = await pool.getConnection();
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const data = await req.json();
    
    await connection.beginTransaction();

    // Update users table
    if (Object.keys(data).some(key => ['firstName', 'lastName', 'companyName', 'phoneNumber', 'about', 'languages'].includes(key))) {
      const userUpdateFields = Object.entries(data)
        .filter(([key]) => ['firstName', 'lastName', 'companyName', 'phoneNumber', 'about', 'languages'].includes(key))
        .map(([key]) => `${key} = ?`)
        .join(', ');

      const userUpdateValues = Object.entries(data)
        .filter(([key]) => ['firstName', 'lastName', 'companyName', 'phoneNumber', 'about', 'languages'].includes(key))
        .map(([_, value]) => typeof value === 'object' ? JSON.stringify(value) : value);

      if (userUpdateFields) {
        await connection.execute(
          `UPDATE users SET ${userUpdateFields} WHERE userId = ?`,
          [...userUpdateValues, user.userId]
        );
      }
    }

    // Update login_cred table
    if (Object.keys(data).some(key => ['email'].includes(key))) {
      await connection.execute(
        'UPDATE login_cred SET email = ? WHERE userId = ?',
        [data.email, user.userId]
      );
    }

    await connection.commit();

    // Fetch updated user data
    const updatedUser = await getUserByEmail(data.email || session.user.email);

    return NextResponse.json({
      message: 'Profile updated successfully',
      updatedUser
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error updating user data:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}