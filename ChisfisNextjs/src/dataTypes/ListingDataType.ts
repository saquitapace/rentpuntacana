import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";
import { AuthorType } from "@/types/authorType";

export interface ListingDataType {
  id: string | number;
  sqft: number;
  listingId: string;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  likes: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}