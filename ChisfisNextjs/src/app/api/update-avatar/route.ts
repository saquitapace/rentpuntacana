import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import pool from '@/lib/db';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('avatar') as File;
  const filePath = formData.get('filePath') as string;

  if (!file || !filePath) {
    return NextResponse.json({ error: 'No file uploaded or file path missing' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = new Uint8Array(bytes);

  const fullPath = path.join(process.cwd(), 'public', filePath);
  
  try {
    await writeFile(fullPath, buffer);
    
    // Update the user's avatar URL in the database
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE users SET avatar = ? WHERE user_id = ?',
      [filePath, 'M29SZDR4QDJBB6'] // Replace 'M29SZDR4QDJBB6' with the actual user ID for Toni Stewart
    );
    connection.release();

    return NextResponse.json({ avatarUrl: filePath });
  } catch (error) {
    console.error('Error saving file or updating database:', error);
    return NextResponse.json({ error: 'Error saving file or updating database' }, { status: 500 });
  }
}
