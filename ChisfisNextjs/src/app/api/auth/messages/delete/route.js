// delete message
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function PUT(request) {
  const { messageId } = await request.json();
  const value = 2; //setting to 1 is marked as read
  const response = await pool.query(`
    UPDATE 
      messages 
    SET 
    status=? 
      WHERE id=?`, 
    [value ,messageId]);
  
  return NextResponse.json(response);
}