// app/api/auth/deleteLike/route.js
import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

export async function DELETE(request) { // not working
    const { id } = await request.json();
    const response = await pool.query('DELETE FROM saved_properties WHERE id=?',[id]);
    return NextResponse.json(response);
}