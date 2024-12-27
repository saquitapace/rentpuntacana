"use client";
import { useState, useEffect, FC, ReactNode } from "react";
import useFetchListings from "@/hooks/useFetchListings";
import StayCard from "@/components/cards/StayCard";
import NoResultsFound from "../noResultsFound";
import SearchResultsLoading from "@/components/SearchResultsLoading";
import HeaderFilter from "@/components/HeaderFilter";

//saquita home
export interface SectionGridFeaturePlacesProps {
  stayListings?: [];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = [],
  headingIsCenter,
  gridClass = "",
  heading = "Featured Properties",
  subHeading = "text goes here",
  tabs = ["Punta Cana", "Bavaro", "Los Corales", "Fruisa"]

}) => {
  
  const [listings, setListings] = useState([]);
  const [limit, setLimit] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [responseError, setReponseError] = useState(false);

  function useListings() {
  
    const { data, loading, error } = useFetchListings();
  
    useEffect(() => {
      if (!loading && !error) {
        setListings(data);
        setIsLoading(false);
      }
    }, [data, loading, error]);
  
    return { data, loading, error };
  }
  
  useListings();

  return (    
    <div className="nc-SectionGridFeaturePlaces relative">

      <div className="mb-2 lg:mb-5 pt-8">
        <HeaderFilter
            tabActive={"Punta Cana"}
            subHeading={""}
            tabs={tabs}
            heading=""
          />
      </div>

      {/* <TabFilters onChange={null} viewAll={ listings.length>0 } /> */}

      <div className="divider divide-y divide-dashed hover:divide-solid"> </div>

      {isLoading && ( 
        <SearchResultsLoading />
      )}

      {responseError && (
        <NoResultsFound message="An Error occured fetching Listing Data" className="text-red-500" />
      )}

      {!responseError && !isLoading && listings.length == 0 && (
        <NoResultsFound message="No Results Found"/>
      )}

      {listings.length  > 0 && (
        <div className={`grid gap-6 py-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`} >
          {listings.filter((_, i) => i < limit).map((stay) => (
              <StayCard key={stay.listingId} data={stay} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionGridFeaturePlaces;