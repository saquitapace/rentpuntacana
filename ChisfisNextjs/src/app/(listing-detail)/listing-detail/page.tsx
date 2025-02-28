//saquita
'use client'
import { useEffect, useState } from 'react'
// types
import { ListingDetailDataType } from '@/dataTypes/ListingDetailDataType'
//components
import ContactForm from '@/components/ContactForm'
import Price from '@/components/Price'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/FormElements/BtnLikeIcon'
import ShareBtn from '@/components/ShareBtn'
import Reviews from '@/components/Reviews'
import AmenitiesSection from '../../../components/amenitiesSection'
import DescriptionSection from '../../../components/descriptionSection'
//shared ** move to components
import Avatar from '@/shared/Avatar'
import ButtonSecondary from '@/shared/ButtonSecondary'
//hooks
import useFetchListingDetail from '@/hooks/useFetchListingDetail'
//icons
import { Squares2X2Icon, PrinterIcon } from '@heroicons/react/24/outline'

//? temporary - to delete...
import { PHOTOS } from '../constant'
import SectionDateRange from '../SectionDateRange'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
//? useSearchParams, useParams
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Route } from 'next'

const ListingStayDetailPage = ({
	params,
	searchParams,
}: {
	params: { lid: string }
	searchParams?: { [key: string]: string | string[] | undefined }
}) => {
	let [listingDetail, setListingDetail] = useState<ListingDetailDataType>({
		id: '',
		href: '/',
		title: '',
		amenities: [],
		featuredImage: '',
		commentCount: 0,
		viewCount: 0,
		address: '',
		reviewStart: null,
		reviewCount: null,
		likes: false,
		galleryImgs: [],
		price: '',
		sqft: 0,
		description: '',
		availabilityDate: '',
		bedrooms: null,
		bathrooms: null,
		isAds: false,
		map: {
			lat: 0,
			lng: 0,
		},
		author: {
			firstName: '',
			id: '',
			lastName: '',
			displayName: '',
			avatar: '',
			createdAt: '',
			about: '',
			companyName: '',
			href: '/',
			listingsCount: 0,
			phoneNumber: '',
			fullName: '',
		},
	})

	const thisPathname = usePathname()
	const router = useRouter()
	const listingId = searchParams.lid
	const shareUrl = process.env.NEXT_PUBLIC_API_URL.concat(thisPathname)
	const [galleryPhotos, setGalleryPhotos] = useState([PHOTOS])
	const [loading, setLoading] = useState(true)

	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations,
	)

	function useFetchDetail() {
		const { data, loading, error } = useFetchListingDetail({
			listingId: listingId,
		})
		//console.log(data);
		//const dataObj = data?: ListingDetailDataType[] ;
		useEffect(() => {
			if (data && !loading && !error) {
				setListingDetail(data)
				setLoading(false)
				//setGalleryPhotos(listingDetail['galleryImgs']);
				setListingDetail((listingDetail) => ({ ...listingDetail, data }))
			}
		}, [data, loading, error])

		return { data, loading, error }
	}

	useFetchDetail()

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderSection1 = () => {
		return (
			<div className="listingSection__wrap !space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="text-1xl sm:text-2xl lg:text-3xl">
						{listingDetail.title}
					</h2>
					<div className="flow-root">
						<div className="-mx-3 -my-1.5 flex text-sm text-neutral-700 dark:text-neutral-300">
							<ShareBtn
								text={translations.share}
								url={shareUrl}
								title={translations.checkoutThisListing}
							/>
							<div className="flex items-center">
								{!loading && (
									<BtnLikeIcon
										isLiked={listingDetail.likes}
										id={listingId}
										className=""
										colorClass="text-gray-700"
									/>
								)}
								<span>{translations.save}</span>
							</div>
						</div>
					</div>
				</div>
				{/* 3 */}
				<div className="flex items-center space-x-4">
					<StartRating
						reviewCount={listingDetail.reviewCount}
						point={listingDetail.reviewStart}
					/>
					<span>·</span>
					<span>
						<i className="las la-map-marker-alt"></i>
						<span className="ml-1">{listingDetail.address}</span>
					</span>
				</div>

				{/* 4 */}
				{/* <div className="flex items-center hidden">
					<Avatar
						imgUrl={listingDetail.authorAvatar}
						sizeClass="w-30 h-30 sm:w-12 sm:h-12"
						userName={listingDetail.authorFirstName}
					/>

					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Listing by{' '}
						<span className="font-medium text-neutral-900 dark:text-neutral-200">
							{listingDetail.authorFirstName}{' '}{listingDetail.authorLastName}
						</span>
					</span>
				</div> */}

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					<div className="flex items-center space-x-3">
						<i className="las la-bed text-2xl"></i>
						<span className=" ">
							{listingDetail.bedrooms}
							<span className="hidden pl-2 sm:inline-block">
								{listingDetail.bedrooms > 1
									? translations.bedrooms
									: translations.bedroom}
							</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bath text-2xl"></i>
						<span className=" ">
							{listingDetail.bathrooms}
							<span className="hidden pl-2 sm:inline-block">
								{listingDetail.bathrooms > 1
									? translations.bathrooms
									: translations.bathroom}
							</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-expand-arrows-alt text-lg"></i>
						<span className=" ">
							{listingDetail.sqft} m<sup>2</sup>
						</span>
					</div>

					<div className="flex items-center space-x-3">
						<i className="las la-wifi text-lg"></i>
						<span className="hidden sm:inline-block">{translations.wifi}</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-smoking-ban text-lg"></i>
						<span className="hidden sm:inline-block">
							{translations.noSmoking}
						</span>
					</div>
				</div>
			</div>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap text-red-700">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 text-red-700 dark:text-neutral-400">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-6000 text-red-700 dark:text-neutral-300 sm:text-base">
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Monday - Thursday</span>
							<span>$199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Monday - Thursday</span>
							<span>$199</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Friday - Sunday</span>
							<span>$219</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Rent by month</span>
							<span>-8.34 %</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
							<span>Minimum number of nights</span>
							<span>1 night</span>
						</div>
						<div className="flex items-center justify-between space-x-4 rounded-lg p-4">
							<span>Max number of nights</span>
							<span>90 nights</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderSection5 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-xl font-semibold">{translations.listingAgent}</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						imgUrl={listingDetail.author.avatar}
						userName={listingDetail.author.firstName}
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-16 w-16"
						radius="rounded-full"
					/>
					<div>
						<a
							className="block text-xl font-medium"
							href={`/publicProfile?uid=${listingDetail.author.id}`}
						>
							{listingDetail.author.firstName} {}{' '}
							{listingDetail.author.lastName}
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<a
								className="underline"
								href={`/publicProfile?uid=${listingDetail.author.id}`}
							>
								{listingDetail.author.listingsCount} {translations.listings}
							</a>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-6000 dark:text-neutral-300">
					{listingDetail.author.about}
				</span>

				{/* info */}
				<div className="block space-y-2.5 text-neutral-500 dark:text-neutral-400">
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span>
							{translations.joinedIn} {translations.space}
							{listingDetail.author.createdAt}
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
							/>
						</svg>
						<span>{translations.responseRate}</span>
					</div>
					<div className="flex items-center space-x-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.5}
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>

						<span>{translations.fastResponse}</span>
					</div>
				</div>

				<div>
					<ButtonSecondary
						href={
							`/publicProfile?uid=${listingDetail.author.id}` as Route<string>
						}
					>
						{translations.seeAgentProfile}
					</ButtonSecondary>
				</div>
			</div>
		)
	}

	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap">
				{/* HEADING */}
				<div>
					<h2 className="text-xl font-semibold">{translations.location}</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400">
						{listingDetail.address}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
				{/* MAP */}
				<div className="aspect-h-5 aspect-w-5 z-0 rounded-xl ring-1 ring-black/10 sm:aspect-h-3">
					<div className="z-0 overflow-hidden rounded-xl">
						<iframe
							width="100%"
							height="100%"
							loading="lazy"
							allowFullScreen
							referrerPolicy="no-referrer-when-downgrade"
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Rosa+Hermosa"
						></iframe>
					</div>
				</div>
			</div>
		)
	}

	const print = () => {
		window.print
	}

	const renderSidebar = () => {
		return (
			<>
				<div className="listingSectionSidebar__wrap max-w-[400px] shadow-xl">
					<span className="text-3xl font-semibold">
						{!!listingDetail.price ||
							(listingDetail.price == null && (
								<Price
									className="text-3xl font-semibold"
									price={listingDetail.price}
								/>
							))}
						{listingDetail.price && (
							<div>
								${listingDetail.price}
								<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
									/{translations.month}
								</span>
							</div>
						)}
					</span>

					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>

					<div className="flex">
						<Avatar
							imgUrl={listingDetail.author.avatar}
							hasChecked
							hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
							sizeClass="h-16 w-16"
							userName={listingDetail.author.firstName}
						/>

						<div className="ml-3 space-y-1 sm:ml-4">
							<p className="text-sm font-medium text-gray-900 dark:text-gray-200">
								{listingDetail.author.firstName} {listingDetail.author.lastName}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
								{formatPhoneNumberIntl(listingDetail.author.phoneNumber)}
							</p>
							<p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
								{listingDetail.author.companyName}
							</p>
						</div>
					</div>
					<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
					{!loading && <ContactForm data={listingId} />}
				</div>

				{/* <div className="flex justify-center pt-5">
					<ButtonSecondary className="border-0" onClick={print}>
						<PrinterIcon className="h-6 w-6" />
						<div className="pl-5">
							{translations.print} {translations.space} {translations.listing}
						</div>
					</ButtonSecondary>
				</div> */}
			</>
		)
	}

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md p-4 sm:rounded-xl">
				<div className="relative grid min-h-[280px] grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					{/* <div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						onClick={handleOpenModalImageGallery} >
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={galleryPhotos[0].toString() || ''}
							alt=""
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
						/>
						<div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"></div>
					</div>
					{galleryPhotos.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
						<div
							key={index}
							className={`relative overflow-hidden rounded-md sm:rounded-xl ${
								index >= 3 ? 'hidden sm:block' : ''
							}`} > 
							<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
								<Image
									fill
									className="rounded-md object-cover sm:rounded-xl"
									src={item.toString() || ''}
									alt=""
									sizes="400px"
								/>
							</div>

							<div
								className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
								onClick={handleOpenModalImageGallery} />
						</div>
					))} */}

					<button
						className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							{translations.showAllPhotos}
						</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className="relative z-10 mt-0 flex flex-col pb-10 lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-4/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1()}
					{/* {renderSection2()} */}
					{/* {renderSection3()} */}

					<Reviews className="" id={listingId} type="listing" />

					{!loading && (
						<SectionDateRange
							sDate={listingDetail.availabilityDate}
							eDate={listingDetail.availabilityDate}
						/>
					)}
					{renderSection5()}
					{renderSection7()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden max-w-[420px] flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage
