// listings api
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
  const { userId} = await request.json();

  const response = await pool.query(
`SELECT 
    l.listingId,
    l.title,
    l.bedrooms,
    l.bathrooms,
    l.description,
    l.address,
    l.map,
    l.userId AS authorId,
    l.shortTermPrice AS price,
    l.longTermPrice,
    l.PurchasePrice,
    l.sqft,
    l.href,
    JSON_ARRAYAGG(CASE WHEN li.category = 'gallery' THEN li.url END) AS galleryImgs,
    MAX(CASE WHEN li.category = 'feature' THEN li.url END) AS featuredImage,
    COUNT(DISTINCT lv.id) AS viewCount,
    COUNT(DISTINCT lr.id) AS reviewCount,
    ROUND(AVG(lr.rating), 1) AS reviewStart,
    SUM(CASE WHEN sp.userId = ? THEN 1 ELSE 0 END) AS likes
FROM 
    listings l
LEFT JOIN 
    listing_images li ON l.listingId = li.listingId
LEFT JOIN 
    listing_views lv ON l.listingId = lv.listingId
LEFT JOIN 
    listing_reviews lr ON l.listingId = lr.listingId AND lr.review IS NOT NULL
JOIN 
    saved_properties sp ON l.listingId = sp.property_id and sp.userId = ?
GROUP BY 
    l.listingId 
`,[userId,userId]
  );
  
  return NextResponse.json(response);
}