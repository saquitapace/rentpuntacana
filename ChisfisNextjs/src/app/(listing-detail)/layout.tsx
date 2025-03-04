'use client'

//import BackgroundSection from '@/components/BackgroundSection'
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode, Suspense, useEffect, useState } from 'react'
import MobileFooterSticky from './(components)/MobileFooterSticky'
//import { imageGallery as listingStayImageGallery } from './constant'
import axios from 'axios'

const DetailtLayout = ({ children }: { children: ReactNode }) => {
	const thisPathname = usePathname()
	const searchParams = useSearchParams()
	const lid = searchParams?.get('lid')

	const [images, setImages] = useState([])

	useEffect(() => {
		const fetchListingDetailData = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/listing-images/get?lid=${lid}`
				)

				if (response.status === 200) {
					setImages(response.data)
				}
			} catch (error) {
				console.error('Error fetching listing images:', error)
			}
		}

		if (lid && thisPathname?.includes('/listing-detail')) {
			fetchListingDetailData()
		}
	}, [lid, thisPathname])


	return (
		<div className="ListingDetailPage">
			<Suspense>
				<ListingImageGallery images={images} />
			</Suspense>

			<div className="ListingDetailPage__content container">{children}</div>			

			{/* STICKY FOOTER MOBILE */}
			<MobileFooterSticky />
		</div>
	)
}

export default DetailtLayout