import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/db-functions';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('data',data)
    // Validate required fields
    if (!data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    // const existingUser = await getUserByEmail(data.email)
    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: 'Email already registered' },
    //     { status: 400 }
    //   )
    // }
    
    try {
    //   const result = await createUser({
    //     email: data.email,
    //     status:true,
    //   })
      const result = true;
      return NextResponse.json({ 
        message: 'successfully created',
        success:true
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