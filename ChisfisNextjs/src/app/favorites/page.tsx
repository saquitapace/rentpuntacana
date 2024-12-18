"use client";

import StayCard from "@/components/StayCard";
import Heading2 from '@/shared/Heading2';
import React, { Fragment, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { useSession } from "next-auth/react";
import useFetchFavorites from "@/hooks/useFetchFavorites";
import NoResultsFound from "../../app/noResultsFound";

const Favorites = () => {
  const { data: session } = useSession();
	const user = session?.user;
  const [listings, setListings] = useState([]);
  const [isloading,setLoading]= useState(true);

  const {
    data,
    loading,
    error,
  } = useFetchFavorites();
  
  return (
    <div className={`nc-Favorites`}>
      <div className="container mt-12 mb-24 lg:mb-32">

        <Heading2 heading="Favorites" />
        
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.filter((_, i) => i < 8).map((stay) => (
              <StayCard key={stay.id} data={stay} />
            ))}
          </div>

          {data.length>11 && ( 
          <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
          )}

          {data.length == 0 && ( 
             <NoResultsFound message="No Results Found"/>
          )}
        </div>
      </div>
    );
  };

export default Favorites;