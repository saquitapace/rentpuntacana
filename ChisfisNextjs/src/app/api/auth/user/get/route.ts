//user get
import { getUserByEmail } from '@/lib/db-functions';
import { NextResponse } from 'next/server';


// nextjs dont allow to exprt functions other than GET, POST, PUT, DELETE , so we need to move this to db functions and export it from there

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get('email');
  
      if (!email) {
        return NextResponse.json(
          { error: 'Email parameter is required' },
          { status: 400 }
        );
      }
  
      const user = await getUserByEmail(email);
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(user);
    } catch (error) {
      console.error('Error in GET handler:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }