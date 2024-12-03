// listings api
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function GET(request) {
  const response = await pool.query(
`
    SELECT DISTINCT
(listings.listing_id),
    listings.title,
    listings.bedrooms,
    listings.bathrooms,
    listings.description,
    listings.address,
    listings.map,
    listings.userId AS authorId,
    listings.shortTermPrice,
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
        price
    FROM
        listing_prices
    WHERE
        listing_prices.category = '1_month' and listing_prices.listing_id = listings.listing_id
	) AS price,
    
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
        saved_properties.property_id =  listings.listing_id and saved_properties.userId = 'M29SZDR4QDJBB6'
	) AS likes
FROM listings  
`







  );
  
  return NextResponse.json(response);
}