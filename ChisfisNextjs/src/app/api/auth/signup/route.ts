import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Validate required fields
    if (!data.email || !data.password || !data.firstName || !data.lastName || !data.accountType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Important: Make sure password is a string
    if (typeof data.password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      )
    }

    // Create new user with hashed password - remove any client-side hashing
    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    try {
      const result = await createUser({
        account_type: data.accountType,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: hashedPassword,
        company_name: data.companyName || '',
        auth_type: 'credentials'
      })

      return NextResponse.json({ 
        message: 'User created successfully',
        userId: result.userId 
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database error occurred', details: dbError.message },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    )
  }
} 