import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { getUserByEmail, pool } from '@/lib/db'
import bcrypt from 'bcryptjs'

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

    // Format the response data
    const userData = {
      userId: user.user_id,
      accountType: user.account_type,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      companyName: user.company_name,
      about: user.about || '',
      avatar: user.avatar || '/images/avatars/default.png',
      languages: user.languages ? JSON.parse(user.languages) : [],
      createdAt: user.created_at,
      phoneNumber: user.phone_number || ''
    };

    return NextResponse.json(userData);

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
    if (Object.keys(data).some(key => ['first_name', 'last_name', 'company_name', 'phone_number', 'about', 'languages'].includes(key))) {
      const userUpdateFields = Object.entries(data)
        .filter(([key]) => ['first_name', 'last_name', 'company_name', 'phone_number', 'about', 'languages'].includes(key))
        .map(([key]) => `${key} = ?`)
        .join(', ');

      const userUpdateValues = Object.entries(data)
        .filter(([key]) => ['first_name', 'last_name', 'company_name', 'phone_number', 'about', 'languages'].includes(key))
        .map(([_, value]) => typeof value === 'object' ? JSON.stringify(value) : value);

      if (userUpdateFields) {
        await connection.execute(
          `UPDATE users SET ${userUpdateFields} WHERE user_id = ?`,
          [...userUpdateValues, user.user_id]
        );
      }
    }

    // Update login_cred table
    if (Object.keys(data).some(key => ['email'].includes(key))) {
      await connection.execute(
        'UPDATE login_cred SET email = ? WHERE user_id = ?',
        [data.email, user.user_id]
      );
    }

    await connection.commit();

    // Fetch updated user data
    const updatedUser = await getUserByEmail(data.email || session.user.email);

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        userId: updatedUser.user_id,
        accountType: updatedUser.account_type,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email,
        companyName: updatedUser.company_name,
        about: updatedUser.about || '',
        avatar: updatedUser.avatar || '/images/avatars/default.png',
        languages: updatedUser.languages ? JSON.parse(updatedUser.languages) : ['English'],
        createdAt: updatedUser.created_at,
        phoneNumber: updatedUser.phone_number || ''
      }
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

// DELETE: Delete user account
export async function DELETE(req: NextRequest) {
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

    // Delete user directly using pool
    await pool.query('DELETE FROM users WHERE user_id = ?', [user.user_id]);

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
