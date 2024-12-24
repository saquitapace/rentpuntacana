"use client";

import StayCard from "@/components/StayCard";
import Heading2 from '@/shared/Heading2';
import { useEffect, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import useFetchFavorites from "@/hooks/useFetchFavorites";
import NoResultsFound from "../../app/noResultsFound";

const Favorites = () => {

  const [listings, setListings] = useState([]);
  const [isloading, setIsLoading]= useState(true);

  function useFavorites() {
  
    const { data, loading, error } = useFetchFavorites();
  
    useEffect(() => {
      if (!loading && !error) {
        setListings(data);
        setIsLoading(false);
      }
    }, [data, loading, error]);
  
    return { data, loading, error };
  }
  
  useFavorites();
  
  return (
    <div className={`nc-Favorites`}>
      <div className="container mt-12 mb-24 lg:mb-32">

        <Heading2 heading="Favorites" />
        
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.filter((_, i) => i < 8).map((stay) => (
              <StayCard key={stay.id} data={stay} />
            ))}
          </div>

          {listings.length > 11 && ( 
          <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
          )}

          {listings.length == 0 && ( 
             <NoResultsFound message="No Results Found"/>
          )}
        </div>
      </div>
    );
  };

export default Favorites;