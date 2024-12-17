// listings api
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
    const { query } = await request.json();

    const [response] = await pool.query(`
    SELECT DISTINCT
(listings.listing_id),
    listings.title,
    listings.availabilityDate,
    listings.bedrooms,
    listings.bathrooms,
    listings.description,
    listings.address,
    listings.map,
    listings.amenitites,
    listings.userId AS authorId,
    listings.shortTermPrice AS price,
    listings.longTermPrice,
    listings.PurchasePrice,
    listings.sqft,
	listings.href,
    (SELECT JSON_ARRAYAGG(url) As galleryImgs From listing_images where category = 'gallery' and listing_images.listing_id = listings.listing_id)  As galleryImgs,
    (SELECT
        url
    FROM
        listing_images
    WHERE
        listing_images.category = 'feature' and listing_images.listing_id = listings.listing_id
	) AS featuredImage,
    
    (SELECT
        COUNT(*)
    FROM
        listing_views
    WHERE
        listing_views.listing_id = listings.listing_id
	) AS viewCount,
    
    (SELECT
        COUNT(*)
    FROM
        listing_reviews
    WHERE
        listing_reviews.review is not null and listing_reviews.listing_id = listings.listing_id
	) AS reviewCount,
    
    (SELECT
       ROUND(AVG(rating),1)
    FROM
        listing_reviews
    WHERE
        listing_reviews.rating is not null and listing_reviews.listing_id = listings.listing_id
	) AS reviewStart,
    
(SELECT
        COUNT(*)
    FROM
        saved_properties
    WHERE
        saved_properties.property_id = listings.listing_id and userId = "M29SZDR4QDJBB6"
	) AS likes
    
FROM listings
    WHERE
    listings.listing_id in
    
   (SELECT listing_id from listings ` +query+` )`);

  return NextResponse.json(response);
}