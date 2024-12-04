"use client";

import React, { FC, useState, useEffect } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import MapContainer from '@/components/MapContainer';
import axios from 'axios'
import StayCard from '@/components/StayCard'
import ToggleSwitch from '@/shared/ToggleSwitch';
import NoResultsFound from "../../app/noResultsFound";
import SearchResultsLoading from "@/components/SearchResultsLoading";

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 7);
const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12)

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
const [showFullMapFixed, setShowFullMapFixed] = useState(true)
const [listings, setListings] = useState([]); // initials state of listings
const [limit, setLimit] = useState(9); // initials state of listings
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
	console.log(data)
	setListings(data);
  setLoading(false);
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
  setLoading(false);
  setReponseError(true);

	// alert("Loading listings failed. Network error. Please contact helpdesk. Error code: 500.");
  } finally {
  } 
};

  const fullClass ="mx-9"
  const halfClass ="nc-SectionGridFilterCard container pb-24 lg:pb-28";

  let [mapClass, setMapClass] = useState("visible w-full");
  let [cardClass, setCardClass] = useState("min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]");
  let [viewClassName, setViewClassName] = useState(fullClass);
  let [gridClass, setGridClass] = useState("grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6");   
  let [filterClass, setFilterClass] = useState("w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]");   
  const toggleView = () =>{
    if(viewClassName==fullClass){
      setViewClassName(halfClass);
      setMapClass("hidden");
      setCardClass("grid grid-cols-1");
      setGridClass("grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4");
      setFilterClass("flex flex-shrink-0 mr-0 grow");
    }else{
      setViewClassName(fullClass)
      setMapClass("visible w-full");
      setCardClass("min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]");
      setGridClass("grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6");
      setFilterClass("w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]");  
    }
  }
  return (

<div className="pageWrapper">
    <div className={`nc-SectionGridFilterCard ${viewClassName}`}>
  
    <div className="flex">
        <div className={filterClass}>
          <TabFilters 
            viewAll={false}
          />
          
        </div>
        <div className="content-end">
          <ToggleSwitch
            checked={true}
            onClick={(e) => { toggleView()}}
            label="View Map" />
        </div>
      </div>



      <div className="flex">
          <div className={cardClass}>


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

            <div className={gridClass}>
              

            {listings.filter((_, i) => i < limit).map((item) => (
        
        <div className=""
                    key={item.listing_id}
                    onMouseEnter={() => setCurrentHoverID((_) => item.listing_id)}
                    onMouseLeave={() => setCurrentHoverID((_) => -1)}
                  >
        <StayCard key={item.listing_id} data={item} />
    
        </div>
          ))}



            </div> )}
          </div>
          <div className={mapClass}>


				{/* MAPPPPP */}
				<div className="xl:static xl:block xl:flex-1 fixed inset-0 z-50">
					<div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<MapContainer
							currentHoverID={currentHoverID}
							DEMO_DATA={DEMO_STAYS}
							listingType="stay"
						/>
					</div>
				</div>




            
          </div>
        </div>
    
        <div className="flex mt-16 justify-center items-center">
          <Pagination />
        </div>
      </div>









      
    </div>
  );  
};
export default SectionGridHasMap;