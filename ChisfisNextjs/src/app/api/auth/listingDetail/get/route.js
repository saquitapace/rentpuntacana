// listings api
import { NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db';

export async function POST(request) {
    const { listingId , userId} = await request.json();
    const id = parseInt(listingId);

   // const listingDetail = [];
    const [response1] = await pool.query(`
    SELECT DISTINCT
(listings.listingId),
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
    (SELECT JSON_ARRAYAGG(url) As galleryImgs From listing_images where category = 'gallery' and listing_images.listingId = listings.listingId)  As galleryImgs,
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
    listings.listingId = ?`,[userId,id]);


const [response2] = await pool.query(`
SELECT
users.firstName AS authorFirstName,
users.about AS authorAbout,
users.createdAt AS authorCreatedAt,
users.lastName AS authorLastName,
users.avatar AS authorAvatar,
users.phoneNumber AS authorPhoneNumber,
users.companyName AS authorCompanyName,
 (SELECT
        COUNT(*)
    FROM
        listings
    WHERE
        listings.userId = (SELECT userId from listings where listingId = ?)
	) AS authorListingsCount
FROM 
users
WHERE users.userId = (SELECT userId from listings where listingId = ?)`,[id, id]);

const mergedJSON = Object.assign({}, response1[0], response2[0]);

  return NextResponse.json(mergedJSON);
}