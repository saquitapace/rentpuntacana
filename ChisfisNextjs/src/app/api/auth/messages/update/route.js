// app/api/auth/updateMessages/route.js 
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function PUT(request) {
  const { messageId } = await request.json();
  const value = 1; //setting to 1 is marked as read
  const response = await pool.query(`
    UPDATE 
    messsages 
      SET 
    status=? 
    WHERE id=?`, 
    [value ,messageId]);
  
  return NextResponse.json(response);
}