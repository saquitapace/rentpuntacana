import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

export async function GET() {
  try {
    const isConnected = await testConnection();
    if (isConnected) {
      return NextResponse.json({ status: 'Database connected successfully' });
    } else {
      return NextResponse.json(
        { error: 'Database connection failed' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { error: 'Database test failed' }, 
      { status: 500 }
    );
  }
} 