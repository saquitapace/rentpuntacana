import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Check if user exists
    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Create new user with hashed password
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const result = await createUser({
      account_type: data.accountType,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: hashedPassword,
      company_name: data.companyName,
      auth_type: 'credentials'
    })

    return NextResponse.json({ 
      message: 'User created successfully',
      userId: result.userId 
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 