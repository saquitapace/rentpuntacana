import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";

    // Prevent SQL Injection by sanitizing input
    const searchQuery = q.replace(/[^a-zA-Z0-9 ]/g, ""); // Remove special characters

    const sql = `
      SELECT u.userId, u.firstName, u.lastName, 
            l.id AS listingId, l.title
      FROM users u 
      LEFT JOIN listings l ON u.userId = l.userId
      WHERE 
        (MATCH(u.firstName, u.lastName) AGAINST (? IN BOOLEAN MODE) 
        OR MATCH(l.title) AGAINST (? IN BOOLEAN MODE)) 
        OR (u.firstName LIKE ? OR u.lastName LIKE ? OR l.title LIKE ?)
    `;

    const values = [searchQuery + "*", searchQuery + "*", `%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`];

    const [response] = await pool.query(sql, values);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching result:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}