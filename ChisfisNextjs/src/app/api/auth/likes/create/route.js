//postlike
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId, listingId } = await request.json();

  // Insert the like & set status to 0

  // const [likeExists] = await pool.query(`
  //   SELECT * FROM  
  //   saved_properties WHERE
  //   userId=? AND property_id = ?`,[userId,listingId]);

    // if(likeExists.length === 0){
      // create
      const response = await pool.query(`
        INSERT 
        INTO saved_properties 
        (userId, property_id, status) 
        VALUES (?, ?, ?)`, 
        [userId, listingId, 0]);

    // } else {
    //   // update
    //   const response = await pool.query(`
    //     UPDATE 
    //     saved_properties 
    //     SET 
    //     status=? 
    //     WHERE property_id=? and userId=?`,
    //     [0 ,listingId, userId]);
    // }
  return NextResponse.json(response);
}