import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { getUserByEmail } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { pool } from '@/lib/db'

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
      address: user.address || '',
      phoneNumber: user.phone_number || '',
      about: user.about || '',
      avatar: user.avatar || '/images/avatars/default.png',
      languages: user.languages || '',
      createdAt: user.created_at || ''
    };

    return NextResponse.json(userData);

  } catch (error: unknown) {
    console.error('Error fetching user data:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Internal server error', error: error.message },
        { status: 500 }
      )
    } else {
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

// PUT: Update user data
export async function PUT(req: NextRequest) {
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

    const data = await req.json()
    
    // Handle password update separately
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    // Update user data directly using pool
    const updateFields = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key} = ?`)
      .join(', ');

    const updateValues = Object.entries(data)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value);

    const query = `
      UPDATE users 
      SET ${updateFields}
      WHERE user_id = ?
    `;

    await pool.query(query, [...updateValues, user.user_id]);

    return NextResponse.json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('Error updating user data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
