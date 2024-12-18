"use client";

import React, { FC, useState, useEffect } from "react";
import { StayDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import TabFilters from "./TabFilters";
import MapContainer from '@/components/MapContainer';
import axios from 'axios'
import StayCard from '@/components/StayCard'
import ToggleSwitch from '@/shared/ToggleSwitch';
import NoResultsFound from "../../app/noResultsFound";
import SearchResultsLoading from "@/components/SearchResultsLoading";
import { useSession } from "next-auth/react";

export interface SectionGridFilterCardProps {}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = () => {
const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1);
const [listings, setListings] = useState([]); // initials state of listings
const [limit, setLimit] = useState(50); // initials state of listings
const [loading, setLoading] = useState(true);
const [responseError, setReponseError] = useState(false);
const [mapData, setMapData] = useState([]);
const [formData, setFormData] = useState();
const { data: session } = useSession();
const user = session?.user;

useEffect(() => {
  if (listings) {
	loadListingsData();
  }
}, [])

const loadListingsData = async () => {
 const data = await fetchListingsData();
 if (data) {
    (data).map((d: { map: string; }) => {
      if(d.map !== null){
        d.map = JSON.parse(d.map); 
      }
      data.key=data.listingId;
    });
  
  const DEMO_DATA2: StayDataType[] = data.filter((d: { map: null; }) => d.map !==null);
    //console.log(DEMO_DATA2)
    setMapData(DEMO_DATA2);
    setListings(data);
    setLoading(false);
  } 
};

const renderFilteredListingsData = async (data) => {
  //const data = await fetchListingsData();
  if (data) {
     (data).map((d: { map: string; }) => {
       if(d.map !== null){
         d.map = JSON.parse(d.map); 
       }
     });
   
    const DEMO_DATA2: StayDataType[] = data.filter((d: { map: null; }) => d.map !==null);
      setMapData(DEMO_DATA2);
      setListings(data);
      setLoading(false);
   }
 };

const fetchListingsData = async () => {
  try {
  const userId =  user ? user.userId : 'guest';
	const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listings/get`, {userId:userId});
  
	if (response) {
  console.log(response);
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

  const tabFilterTypeChanged = (e: any) =>{
		console.log("tabFilterTypeChanged")
    console.log(e);
    let formData = e;
    setFormData(e); //setFormData is not working
    
    const more = (formData.more1).concat(formData.more2).concat(formData.more3).concat(formData.more4)
 
    // if legnth >0 // concatenate with the || operator at the second index
  
   let a = 0;
   let moreQry = ''; 
   let moreOr = " OR amenitites LIKE";

   (more).forEach(item => {
    moreQry += " '%"+item.field +"%' ";
      a++
      (a > 0 && a < (more).length) ? moreQry += moreOr : ''
    });

    const whereMore = " amenitites LIKE";
    let moreQuery = (whereMore).concat(moreQry);

    if(!moreQry){
      moreQuery ='';
    }

    let i = 0;
    // type
    let qry = '';
    const typeOr = "OR type =";

    (formData.type).forEach(item => {
      qry += " '"+item.field +"' ";
      i++
      (i > 0 && i < (formData.type).length) ? qry += typeOr : ''
    });

    const whereType = " type =";
    let typeQuery = (whereType).concat(qry);

    if(!qry){
      typeQuery ='';
    }
    
    const and = " AND ";
    let joinedQry;
    
    if(typeQuery && moreQuery) {
      joinedQry = typeQuery.concat(and).concat(moreQuery);
    } else {
      joinedQry = typeQuery.concat(moreQuery);
    }

    let finalqry = "";

    if(joinedQry) {
      const where = " WHERE";
      finalqry = where.concat(joinedQry);
    }
    console.log(finalqry);
    
    queryListingsData(finalqry);
	}

  const queryListingsData = async (query) => {
    const type = query;
    try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listings/query`, {query:query,userId:user.userId});
      
			if (response) {
			console.log(response.data)
      renderFilteredListingsData(response.data)
			//return await response.data;
			}
		} catch (error) {
			console.error('Error fetching listing detail data:', error);
			// alert("Loading listing detaol failed. Network error. Please contact helpdesk. Error code: 500.");
		} finally {
		} 

  };
  
  return (

<div className="pageWrapper">
    <div className={`nc-SectionGridFilterCard ${viewClassName}`}>
  
    <div className="flex">
        <div className={filterClass}>
            <TabFilters
            	onChange={(e) => { tabFilterTypeChanged(e)}}
              viewAll={false}
          />
          
        </div>
        <div className="content-end">
          <ToggleSwitch
            checked={true}
            onClick={(e: any) => toggleView()}
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
                      key={item.listingId}
                      onMouseEnter={() => setCurrentHoverID((_) => item.listingId)}
                      onMouseLeave={() => setCurrentHoverID((_) => -1)}
                    >
                  <StayCard key={item.listingId} data={item} />
                </div>
              ))}
            </div> )}
          </div>
          <div className={mapClass}>


				{/* MAPPPPP */}

        {listings.length  > 0 && (
				<div className="xl:static xl:block xl:flex-1 fixed inset-0 z-50">
					<div className="fixed left-0 top-0 h-full w-full overflow-hidden rounded-md xl:sticky xl:top-[88px] xl:h-[calc(100vh-88px)]">
						<MapContainer
              key="mapKey"
							currentHoverID={currentHoverID}
							DEMO_DATA={mapData}
							listingType="stay"
						/>
					</div>
				</div>
      )}    
          </div>
        </div>
    
        <div className="flex mt-16 justify-center items-center">
          <Pagination />
        </div>
      </div>
    </div>
  );  
};
export default SectionGridFilterCard;