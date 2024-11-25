"use client";

import React, { useState, useEffect, FC, ReactNode } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import StayCard from "./StayCard";
import TabFilters from "../app/(stay-listings)/TabFilters";
import axios from "axios";

export interface SectionGridFeaturePlacesProps {
  stayListings?: [];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const pathname = usePathname;

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = [],
  gridClass = "",
  heading = "",
  subHeading = "",
  headingIsCenter,
}) => {

  const [listings, setListings] = useState([]); // initials state of listings
  const [limit, setLimit] = useState(8); // initials state of listings

  useEffect(() => {
    if (listings) {
      loadListingsData();
    }
  }, [])

  const loadListingsData = async () => {
   const data = await fetchListingsData();
   if (data) {
      console.log(data)
      setListings(data);
    } 
  };

  const fetchListingsData = async () => {
    try {
      console.log("getting listing data");
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/listings/get`);

      if (response) {
        console.log("************")
        console.log(response)

       return await response.data[0];
      }
    } catch (error) {
      console.error('Error fetching listings data:', error);
      // alert("Loading listings failed. Network error. Please contact helpdesk. Error code: 500.");
    } finally {
    } 
  };

  return (    
    <div className="nc-SectionGridFeaturePlaces relative">
      <TabFilters />
saquita - SectionGridFeaturePlaces.tsx
      <div
        className={`grid gap-6 py-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
  
      {listings.length == 0 ? (
        <div> 0 Listings found</div>
      ) : (
""
        
      )}

      
      {listings.filter((_, i) => i < limit).map((stay) => (
        <StayCard key={stay.id} data={stay} />
      ))}
      
      
      {/*}
      {DEMO_STAY_LISTINGS.filter((_, i) => i < limit).map((stay) => (
        <StayCard key={stay.id} data={stay} />
      ))} */}

      </div>
      <div className="flex mt-16 justify-center items-center">

      {pathname == "/" ? (
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      ) : (
        <ButtonSecondary href="/listing-stay-map" className="!leading-none">
				<div className="flex items-center justify-center">
				<span>View all</span>
				<ArrowRightIcon className="w-5 h-5 ml-3" />
				</div>
			  </ButtonSecondary>
				)}

      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
