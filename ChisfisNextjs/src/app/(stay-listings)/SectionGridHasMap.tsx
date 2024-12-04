'use client'

import { FC, useEffect, useState } from 'react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import axios from 'axios'
import Pagination from '@/shared/Pagination'
import TabFilters from './TabFilters'
import StayCard from '@/components/StayCard'
import MapContainer from '@/components/MapContainer'

const DEMO_STAYS = DEMO_STAY_LISTINGS.filter((_, i) => i < 12)
export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
const [showFullMapFixed, setShowFullMapFixed] = useState(false)

const [listings, setListings] = useState([]); // initials state of listings
const [limit, setLimit] = useState(12); // initials state of listings

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

const renderMap= () => {


    return (
		<div></div>
	)}

	return (
		<div>
			<div className="mx-9">
				<div className="mb-5 lg:mb-5">
					<TabFilters />
				</div>
			</div>

			<div className="relative flex min-h-screen">
				{/* CARDSSSS */}
				<div className="min-h-screen w-full max-w-[1184px] flex-shrink-0 xl:w-[60%] xl:px-8 2xl:w-[60%]">
					<div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-x-6">

						
					{/*}	{DEMO_STAYS.map((item) => (
							<div
								key={item.id}
								onMouseEnter={() => setCurrentHoverID((_) => item.id)}
								onMouseLeave={() => setCurrentHoverID((_) => -1)}
							>
								<StayCard data={item} />
							</div>
						))} */}


{listings.filter((_, i) => i < limit).map((item) => (
        
		<div
								key={item.listing_id}
								onMouseEnter={() => setCurrentHoverID((_) => item.listing_id)}
								onMouseLeave={() => setCurrentHoverID((_) => -1)}
							>
		<StayCard key={item.listing_id} data={item} />

		</div>
      ))}


					</div>
					<div className="mt-16 flex items-center justify-center">
						<Pagination />
					</div>
				</div>

				{!showFullMapFixed && (
					<div
						className={`fixed bottom-16 left-1/2 z-30 flex -translate-x-1/2 transform cursor-pointer items-center justify-center space-x-3 rounded-full bg-neutral-900 px-6 py-2 text-sm text-white shadow-2xl md:bottom-8 xl:hidden`}
						onClick={() => setShowFullMapFixed(true)}
					>
						<i className="las la-map text-lg"></i>
						<span>Show map</span>
					</div>
				)}

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
	)
}

export default SectionGridHasMap
