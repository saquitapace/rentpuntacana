import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

export interface AuthorType {
  companyName: string;
  phoneNumber: string ;
  id: string | number;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  about: string;
  href: Route<string>;
  starRating?: number;
  listingsCount: number;
}