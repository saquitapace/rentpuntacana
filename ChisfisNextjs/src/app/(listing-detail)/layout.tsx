'use client'

//import BackgroundSection from '@/components/BackgroundSection'
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery'
import { usePathname } from 'next/navigation'
import { ReactNode, Suspense } from 'react'
import MobileFooterSticky from './(components)/MobileFooterSticky'
import { imageGallery as listingStayImageGallery } from './constant'

const DetailtLayout = ({ children }: { children: ReactNode }) => {
	const thisPathname = usePathname()

	const getImageGalleryListing = () => {
		if (thisPathname?.includes('/listing-detail')) {
			return listingStayImageGallery
		}

		return []
	}

	return (
		<div className="ListingDetailPage">
			<Suspense>
				<ListingImageGallery images={getImageGalleryListing()} />
			</Suspense>

			<div className="ListingDetailPage__content container">{children}</div>			

			{/* STICKY FOOTER MOBILE */}
			<MobileFooterSticky />
		</div>
	)
}

export default DetailtLayout