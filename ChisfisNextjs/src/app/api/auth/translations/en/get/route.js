// api get translations
import { NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db';

export async function GET(request) {
  // get translations
  const response = await pool.query(`SELECT ky, en AS string FROM i18n`);
  
  return NextResponse.json(response);
}