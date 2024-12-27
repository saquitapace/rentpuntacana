import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";
import { AuthorType } from "@/types/authorType";

export interface ListingDetailDataType {
  title: string;
  availabilityDate: string;
  description: string;
  amenities: any;
  id: string | number;
  author: AuthorType;
  href: Route<string>;
  featuredImage: StaticImageData | string;
  commentCount: number;
  sqft: number;
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