import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: Route<string>;
  starRating?: number;
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
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
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
  export interface ListingDetailDataType {
    id: string | number;
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
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    saleOff?: string | null;
    isAds: boolean | null;
    map: {
      lat: number;
      lng: number;
    };
  }

/*




{
			galleryImgs:[],
			listingCategory:'',
			address: null,
			title: '',
			bedrooms: 0,
			bathrooms: 0,
			sqft: 0,
			amenities:[],
			href:'',
			likes: null,
			availabilityDate: null,
			saleOff: null,  
			isAds: null,
			price: null,
			reviewStart: null,
			reviewCount: null,
			id:'',
			description:'' ,
			listingId: null,
			authorFirstName:'',
			authorLastName:'',
			authorAvatar:'',
			authorPhoneNumber: null,
			authorCompanyName: null,
			authorListingsCount:null,
			authorId: null,
			authorAbout:null,
			authorCreatedAt:null
		  }



*/





