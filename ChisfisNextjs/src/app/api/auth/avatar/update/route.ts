import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { pool } from '../../../../../lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    const filePath = formData.get('filePath') as string;

    if (!file || !filePath) {
      return NextResponse.json({ error: 'Missing file or path' }, { status: 400 });
    }

    const fullPath = path.join(process.cwd(), 'public', filePath);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Delete old avatar if it exists
    const [rows] = await pool.execute(
      'SELECT avatar FROM users WHERE userId = ?',
      [session.user.id]
    );
    const currentAvatar = (rows as any[])[0]?.avatar;

    if (currentAvatar && 
        currentAvatar !== '/images/avatars/default.png' && 
        currentAvatar.startsWith('/images/avatars/')) {
      try {
        await unlink(path.join(process.cwd(), 'public', currentAvatar));
      } catch (error) {
        console.error('Error deleting old avatar:', error);
      }
    }

    // Save new avatar
    await writeFile(fullPath, new Uint8Array(buffer));

    // Update database
    const connection = await pool.getConnection();
    try {
      await connection.execute(
        'UPDATE users SET avatar = ? WHERE userId = ?',
        [filePath, session.user.id]
      );

      // Update session data
      session.user.avatar = filePath;

      return NextResponse.json({ 
        success: true,
        avatarUrl: filePath,
        message: 'Avatar updated successfully',
        user: session.user
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error saving file or updating database:', error);
    return NextResponse.json(
      { error: 'Error saving file or updating database' }, 
      { status: 500 }
    );
  }
}
