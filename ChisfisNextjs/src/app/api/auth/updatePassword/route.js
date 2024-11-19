// update Password service
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function POST(req) {
  try {

    const { email, currentPassword, newPassword } = await req.json();
    console.log("Request Body: ", { email, currentPassword, newPassword });

    const [userResult] = await pool.query('SELECT * FROM login_cred WHERE email = ?', [email]);
    if (userResult.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email not found." },
        { status: 404 }
      );
    }

    const hashedPassword = userResult[0].password;
    console.log("password ",userResult)


    console.log("current password: ",currentPassword)
    console.log("hashed password: ",hashedPassword)
   
    

    const isPasswordMatch = await bcrypt.compare(currentPassword, userResult[0].password);
    


    // if(isPasswordMatch){
    //   console.log("password  matches")
    // }
    
    // console.log(currentPasswordHash)
    // console.log(hashedPassword)

    if (!isPasswordMatch) {
      console.log("password do not match")
      return NextResponse.json(
        { success: false, message: "Current password is incorrect." },
        { status: 400 }
      );
    }

  

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    console.log("new password hash",newHashedPassword)


    const updateQuery = "UPDATE login_cred SET password = ? WHERE email = ?";
    await pool.query(updateQuery, [newHashedPassword, email]);

    return NextResponse.json(
      { success: true, message: "Password has been changed successfully." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the password." },
      { status: 500 }
    );
  }
}