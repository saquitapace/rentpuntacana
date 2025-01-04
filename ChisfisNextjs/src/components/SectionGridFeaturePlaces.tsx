'use client'
import { useState, useEffect, FC, ReactNode } from 'react'
//import ButtonSecondary from "@/shared/ButtonSecondary";
//import { ArrowRightIcon } from "@heroicons/react/24/outline";
import useFetchListings from '@/hooks/useFetchListings'
import StayCard from './cards/StayCard'
import TabFilters from '../app/(stay-listings)/TabFilters'
import NoResultsFound from '../app/noResultsFound'
import SearchResultsLoading from '../components/SearchResultsLoading'

//saquita home
export interface SectionGridFeaturePlacesProps {
	gridClass?: string
	heading?: ReactNode
	subHeading?: ReactNode
	headingIsCenter?: boolean
	tabs?: string[]
	cardType?: 'card1' | 'card2'
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
	gridClass = '',
	heading = '',
	subHeading = '',
	headingIsCenter,
}) => {
	const [listings, setListings] = useState([])
	const [limit, setLimit] = useState(8)
	const [isLoading, setIsLoading] = useState(true)
	const [responseError, setReponseError] = useState(false)

	function useListings() {
		const { data, loading, error } = useFetchListings()

		useEffect(() => {
			if (!loading && !error) {
				setListings(data)
				setIsLoading(false)
			}
		}, [data, loading, error])

		return { data, loading, error }
	}

	const { loading } = useListings()
	// if(loadin)
	if (loading) {
		return <div>Loading...</div>
	}
	return (
		<div className="nc-SectionGridFeaturePlaces relative">
			<TabFilters onChange={null} viewAll={listings.length > 0} />

			<div className="divider divide-y divide-dashed hover:divide-solid"> </div>

			{isLoading && <SearchResultsLoading />}

			{responseError && (
				<NoResultsFound
					message="An Error occured fetching Listing Data"
					className="text-red-500"
				/>
			)}

			{!responseError && !isLoading && listings.length == 0 && (
				<NoResultsFound message="No Results Found" />
			)}

			{listings.length > 0 && (
				<div
					className={`grid gap-6 py-5 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
				>
					{listings
						.filter((_, i) => i < limit)
						.map((stay) => (
							<StayCard key={stay.listingId} data={stay} />
						))}
				</div>
			)}
		</div>
	)
}

export default SectionGridFeaturePlaces
