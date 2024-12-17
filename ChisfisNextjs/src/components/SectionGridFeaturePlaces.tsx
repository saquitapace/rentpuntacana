"use client";

import React, { useState, useEffect, FC, ReactNode } from "react";
//import ButtonSecondary from "@/shared/ButtonSecondary";
//import { ArrowRightIcon } from "@heroicons/react/24/outline";
import StayCard from "./StayCard";
import TabFilters from "../app/(stay-listings)/TabFilters";
import axios from "axios";
import NoResultsFound from "../app/noResultsFound";
import SearchResultsLoading from "../components/SearchResultsLoading";

export interface SectionGridFeaturePlacesProps {
  stayListings?: [];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = [],
  gridClass = "",
  heading = "",
  subHeading = "",
  headingIsCenter,
}) => {
  
  const [listings, setListings] = useState([]);
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);
  const [responseError, setReponseError] = useState(false);

  useEffect(() => {
    if (listings) {
      loadListingsData();
    }
  }, [])

  const loadListingsData = async () => {
   const data = await fetchListingsData();
   if (data) {
      setListings(data);
      setLoading(false);
    }
  };

  const fetchListingsData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/listings/get`);

      if (response) {
       return await response.data[0];
      }
    } catch (error) {
      console.error('Error fetching listings data. API: /auth/listings/get', error);
      setLoading(false);
      setReponseError(true);
    } finally {
    } 
  };

  return (    
    <div className="nc-SectionGridFeaturePlaces relative">

      <TabFilters viewAll={ listings.length>0 } />

      <div className="divider divide-y divide-dashed hover:divide-solid"> </div>

      {loading && ( 
        <SearchResultsLoading />
      )}

      {responseError && (
        <NoResultsFound message="An Error occured fetching Listing Data" className="text-red-500" />
      )}

      {!responseError && !loading && listings.length == 0 && (
        <NoResultsFound message="No Results Found"/>
      )}

      {listings.length  > 0 && (
      <div className={`grid gap-6 py-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
          {listings.filter((_, i) => i < limit).map((stay) => (
              <StayCard key={stay.listingId} data={stay} />
          ))}

        </div>
      )}
    </div>
  );
};

export default SectionGridFeaturePlaces;