// listings api
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
    const { query, userId } = await request.json();

    const [response] = await pool.query(`
    SELECT DISTINCT
    (listings.listingId),
    listings.title,
    listings.availabilityDate,
    listings.bedrooms,
    listings.bathrooms,
    listings.description,
    listings.address,
    listings.map,
    listings.amenities,
    listings.userId AS authorId,
    listings.shortTermPrice AS price,
    listings.longTermPrice,
    listings.PurchasePrice,
    listings.sqft,
	listings.href,
    (SELECT JSON_ARRAYAGG(url) As galleryImgs From listing_images where category = 'gallery' and listing_images.listingId = listings.listingId) As galleryImgs,
    (SELECT
        url
    FROM
        listing_images
    WHERE
        listing_images.category = 'feature' and listing_images.listingId = listings.listingId
	) AS featuredImage,
    
    (SELECT
        COUNT(*)
    FROM
        listing_views
    WHERE
        listing_views.listingId = listings.listingId
	) AS viewCount,
    
    (SELECT
        COUNT(*)
    FROM
        listing_reviews
    WHERE
        listing_reviews.review is not null and listing_reviews.listingId = listings.listingId
	) AS reviewCount,
    
    (SELECT
       ROUND(AVG(rating),1)
    FROM
        listing_reviews
    WHERE
        listing_reviews.rating is not null and listing_reviews.listingId = listings.listingId
	) AS reviewStart,
    (SELECT
        COUNT(*)
    FROM
        saved_properties
    WHERE
        saved_properties.property_id = listings.listingId and userId = ?
	) AS likes
    FROM listings
    WHERE
    listings.listingId in 
   (SELECT listingId from listings ` +query+` )`, [userId]);

  return NextResponse.json(response);
}