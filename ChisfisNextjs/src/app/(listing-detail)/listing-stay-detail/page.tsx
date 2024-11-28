'use client'

import { FC, Fragment, useEffect, useState } from 'react'
import { Checkbox, Dialog, Transition, TransitionChild } from '@headlessui/react'
import { ArrowRightIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import BtnLikeIcon from '@/components/BtnLikeIcon';
import Price from '@/components/Price';
import CommentListing from '@/components/CommentListing'
import FiveStartIconForRate from '@/components/FiveStartIconForRate'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonCircle from '@/shared/ButtonCircle'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonClose from '@/shared/ButtonClose'
import Input from '@/shared/Input';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Amenities_demos, PHOTOS } from './constant'
import StayDatesRangeInput from './StayDatesRangeInput'
import GuestsInput from './GuestsInput'
import SectionDateRange from '../SectionDateRange'
import { Route } from 'next'
import ShareBtn from '@/components/ShareBtn'
import Textarea from '@/shared/Textarea'
import Reviews from '../../../components/Reviews';
import Link from 'next/link'
import axios from 'axios';

import { ListingDetailType } from "@/data/types";
import { DEMO_STAY_LISTINGS } from "@/data/listings";

const DEMO_DATA = DEMO_STAY_LISTINGS[1];

export interface ListingStayDetailPageProps {
	className?: string;
	data?: ListingDetailType;
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({
	className = "",
	data = {},
}) => {
	
	let [listingDetail, setListingDetail]= useState(
		{
			galleryImgs:[],
			listingCategory:'',
			address:'',
			title:'',
			bedrooms:'',
			bathrooms:'',
			sqft:'',
			href:'',
			likes: 1,
			saleOff:'',  
			isAds:'',
			price:'',
			reviewStart: null,
			reviewCount: null,
			id:'',
			listing_id:'',
			authorFirstName:'',
			authorLastName:'',
			authorAvatar:'',
			authorPhoneNumber:'',
			authorCompanyName: ''
		  }
	);

	let [likes, setLikes]= useState(listingDetail.likes);
	//let [galleryPhotos, setGalleryPhotos]= useState([PHOTOS]);
	let [galleryPhotos, setGalleryPhotos]= useState([PHOTOS]);

	{/*let {
		galleryImgs,
		listingCategory,
		address,
		title,
		bedrooms,
		bathrooms,
		sqft,
		href,
		likes,
		saleOff,  
		isAds,
		price,
		reviewStart,
		reviewCount,
		id,
		listing_id,
		authorFirstName,
		authorLastName,
		authorAvatar,
		authorPhoneNumber

	  } = listingDetail; */}

	const searchParams = useSearchParams();
	const thisPathname = usePathname();
	const router = useRouter();
	const listingId = searchParams.get("lid");
	const shareUrl = (process.env.NEXT_PUBLIC_API_URL).concat(thisPathname);

	if(!listingId){alert("todo: display error message is the id isnt passed & display mock object data")}
	
	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
	
	const loadListingDetailData = async () => {
		const d = await fetchListingDetailData();
		const prevData = listingDetail;
		listingDetail = d;
		console.log(d);
		setListingDetail(d);
		//setLikes(listingDetail.likes)
		setGalleryPhotos(listingDetail['galleryImgs']);
		setLikes(listingDetail['likes']);

		//likes = 9
		setListingDetail((listingDetail) => ({ ...listingDetail, d }));
		console.log(d);

		//setLikes((listingDetail) => ({ ...listingDetail, [likes]: 3 }));

		{/*setListingDetail(prevData => ({ {}
			
		})); */}

		// setListingDetail(prevListingDetail => ({
		// 	...prevListingDetail, // Spread the previous car state
		// 	listingDetail // Update the year to 2025
		// }));
	}

	useEffect(() => {
		if (listingId) {
			loadListingDetailData();
		}
	},[]);

	const fetchListingDetailData = async () => {
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listingDetail/get`, {listingId});
	
			if (response) {
				console.log(response.data)
			return await response.data;
			}
		} catch (error) {
			console.error('Error fetching listing detail data:', error);
			// alert("Loading listing detaol failed. Network error. Please contact helpdesk. Error code: 500.");
		} finally {
		} 
	}
	
	function closeModalAmenities() {
		setIsOpenModalAmenities(false);
	}

	function openModalAmenities() {
		setIsOpenModalAmenities(true);
	}

	const handleOpenModalImageGallery = () => {
		router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route)
	}

	const renderSection1 = () => {

		return (
			<div className="listingSection__wrap !space-y-6">
				{/* 1 */}
				<div className="flex items-center justify-between">
					{/*<Badge name="Wooden house" /> */}
					<h2 className="text-1xl sm:text-2xl lg:text-3xl">
						{listingDetail.title}
					</h2>
					<div className="flow-root ">
						<div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
							<ShareBtn
								text="Share"
								url={shareUrl}
								title="Check out this listing!"
							/>
							<div className="flex items-center">
							{listingDetail.likes}
        					<BtnLikeIcon isLiked={likes} id={listingId} className="" colorClass="text-gray-700"      
 />
 <span>Save</span>


							</div>
						</div>
					</div>
				</div>
				{/* 3 */}
				<div className="flex items-center space-x-4">
				<StartRating reviewCount={listingDetail.reviewCount} point={listingDetail.reviewStart} />
					<span>·</span>
					<span>
						<i className="las la-map-marker-alt"></i>
						<span className="ml-1 text-red-700">City, State</span>
					</span>
				</div>

				{/* 4 */}
				<div className="flex items-center">
					<Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
					<span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
						Hosted by{' '}
						<span className="font-medium text-neutral-900 dark:text-neutral-200">
							{listingDetail.authorFirstName}{' '}{listingDetail.authorLastName}
						</span>
					</span>
				</div>

				{/* 5 */}
				<div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

				{/* 6 */}
				<div className="flex items-center justify-between space-x-8 text-sm text-neutral-700 dark:text-neutral-300 xl:justify-start xl:space-x-12">
					{/* <div className="flex items-center space-x-3">
						<i className="las la-user text-2xl"></i>
						<span className="">
							6 <span className="hidden sm:inline-block">guests</span>
						</span>
					</div> */}
					<div className="flex items-center space-x-3">
						<i className="las la-bed text-2xl"></i>
						<span className=" ">
							{listingDetail.bedrooms} <span className="hidden sm:inline-block">bedrooms</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bath text-2xl"></i>
						<span className=" ">
						{listingDetail.bedrooms} <span className="hidden sm:inline-block">bathrooms</span>
						</span>
					</div>
					{/* <div className="flex items-center space-x-3">
						<i className="las la-door-open text-2xl"></i>
						<span className=" ">
						{bedrooms} <span className="hidden sm:inline-block">bedrooms</span>
						</span>
					</div> */}
					<div className="flex items-center space-x-3">
						<i className="las la-expand-arrows-alt text-lg"></i>
						<span className=" ">
						{listingDetail.sqft} m<sup>2</sup>
						</span>
					</div>

					<div className="flex items-center space-x-3">
            <i className="las la-wifi text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Wifi
            </span>
          </div>
		  <div className="flex items-center space-x-3">
            <i className="las la-smoking-ban text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              No smoking
            </span>
          </div>
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap text-red-700">
				<h2 className="text-2xl font-semibold">Stay information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-6000 dark:text-neutral-300 text-red-700">
					<span>
						Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
						accommodation, an outdoor swimming pool, a bar, a shared lounge, a
						garden and barbecue facilities. Complimentary WiFi is provided.
					</span>
					<br />
					<br />
					<span>
						There is a private bathroom with bidet in all units, along with a
						hairdryer and free toiletries.
					</span>
					<br /> <br />
					<span>
						The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental
						service and a car rental service are available at the accommodation,
						while cycling can be enjoyed nearby.
					</span>
				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap text-red-700">
				<div>
					<h2 className="text-2xl font-semibold">Amenities </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400 text-red-700">
						{` About the property's amenities and services`}
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* 6 */}
				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3 text-red-700">
					{Amenities_demos.filter((_, i) => i < 12).map((item) => (
						<div key={item.name} className="flex items-center space-x-3">
							<i className={`las text-3xl ${item.icon}`}></i>
							<span className=" ">{item.name}</span>
						</div>
					))}
				</div>

				{/* ----- */}
				<div className="w-14 border-b border-neutral-200"></div>
				<div >
					<ButtonSecondary className="text-red-700" onClick={openModalAmenities}>
						View more 20 amenities
					</ButtonSecondary>
				</div>
				{renderMotalAmenities()}
			</div>
		)
	}

	const renderMotalAmenities = () => {
		return (
			<Transition appear show={isOpenModalAmenities} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-50 overflow-y-auto"
					onClose={closeModalAmenities}
				>
					<div className="min-h-screen px-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-40" />
						</TransitionChild>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block h-screen w-full max-w-4xl py-8">
								<div className="inline-flex h-full w-full transform flex-col overflow-hidden rounded-2xl bg-white pb-2 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
									<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
										<h3
											className="text-lg font-medium leading-6 text-gray-900"
											id="headlessui-dialog-title-70"
										>
											Amenities
										</h3>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalAmenities} />
										</span>
									</div>
									<div className="divide-y divide-neutral-200 overflow-auto px-8 text-neutral-700 dark:text-neutral-300">
										{Amenities_demos.filter((_, i) => i < 1212).map((item) => (
											<div
												key={item.name}
												className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
											>
												<i
													className={`las text-4xl text-neutral-6000 ${item.icon}`}
												></i>
												<span>{item.name}</span>
											</div>
										))}
									</div>
								</div>
							</div>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		)
	}

	const renderSection4 = () => {
		return (
			<div className="listingSection__wrap text-red-700">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Room Rates </h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400 text-red-700">
						Prices may increase on weekends or holidays
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* CONTENT */}
				<div className="flow-root">
					<div className="-mb-4 text-sm text-neutral-6000 dark:text-neutral-300 sm:text-base text-red-700">
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
			<div className="listingSection__wrap text-red-700">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Host Information</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">
					<Avatar
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-14 w-14"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href="##">
							{listingDetail.authorFirstName} { } {listingDetail.authorLastName}
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<span> 12 places</span>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-6000 dark:text-neutral-300">
					Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides
					accommodation, an outdoor swimming pool, a bar, a shared lounge, a
					garden and barbecue facilities...
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
						<span>Joined in March 2016</span>
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
						<span>Response rate - 100%</span>
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

						<span>Fast response - within a few hours</span>
					</div>
				</div>

				{/* == */}
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div>
					<ButtonSecondary href="/author">See host profile</ButtonSecondary>
				</div>
			</div>
		)
	}

	const renderSection6 = () => {
		return (



		


			<div className="listingSection__wrap text-red-700 hidden">
				<h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				{/* Content */}
				<div className="space-y-5">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>
				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<CommentListing className="py-8" />
					<div className="pt-8">
						<ButtonSecondary>View more 20 reviews</ButtonSecondary>
					</div>
				</div>
			</div>
		)
	}

	const renderSection7 = () => {
		return (
			<div className="listingSection__wrap text-red-700">
				{/* HEADING */}
				<div>
					<h2 className="text-2xl font-semibold">Location</h2>
					<span className="mt-2 block text-neutral-500 dark:text-neutral-400 text-red-700">
						San Diego, CA, United States of America (SAN-San Diego Intl.)
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
							src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&q=Eiffel+Tower,Paris+France"
						></iframe>
					</div>
				</div>
			</div>
		)
	}

	const renderSection8 = () => {
		return (
			<div className="listingSection__wrap text-red-700">
				{/* HEADING */}
				<h2 className="text-2xl font-semibold">Things to know</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Cancellation policy</h4>
					<span className="mt-3 block text-neutral-500 dark:text-neutral-400">
						Refund 50% of the booking value when customers cancel the room
						within 48 hours after successful booking and 14 days before the
						check-in time. <br />
						Then, cancel the room 14 days before the check-in time, get a 50%
						refund of the total amount paid (minus the service fee).
					</span>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Check-in time</h4>
					<div className="mt-3 max-w-md text-sm text-neutral-500 dark:text-neutral-400 sm:text-base">
						<div className="flex justify-between space-x-10 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
							<span>Check-in</span>
							<span>08:00 am - 12:00 am</span>
						</div>
						<div className="flex justify-between space-x-10 p-3">
							<span>Check-out</span>
							<span>02:00 pm - 04:00 pm</span>
						</div>
					</div>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

				{/* CONTENT */}
				<div>
					<h4 className="text-lg font-semibold">Special Note</h4>
					<div className="prose sm:prose">
						<ul className="mt-3 space-y-2 text-neutral-500 dark:text-neutral-400">
							<li>
								Ban and I will work together to keep the landscape and
								environment green and clean by not littering, not using
								stimulants and respecting people around.
							</li>
							<li>Do not sing karaoke past 11:30</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
		
	{/*
Leasing Agent
Property Results, LLC
Leasing consultant
Verified
By choosing to contact a property, you consent to receive calls or texts at the number you provided, which may involve use of automated means and prerecorded/artificial voices, from Zillow Group and the rental manager(s) you choose to contact about any inquiries you submit through our services. You don't need to consent as a condition of renting any property or buying any other goods or services. Message/data rates may apply. You also agree to Zillow's Terms of Use and Privacy Policy.
*/
}

	const renderSidebar = () => {
		return (
			<div className="listingSectionSidebar__wrap shadow-xl">

<span className="text-3xl font-semibold">
						$119

						<Price price={listingDetail.price} />
						{/* <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/night
						</span> */}
					</span>
<div className="border-b border-neutral-200 dark:border-neutral-700"></div>

				<div className="flex">					
					{/* <Badge name="Wooden house" /> */}
					<Avatar
						imgUrl={listingDetail.authorAvatar}
						sizeClass="w-30 h-30 sm:w-12 sm:h-12"
						userName={listingDetail.authorFirstName}
					/>
					<div className="ml-3 sm:ml-4 space-y-1">
						<p className="text-sm font-medium text-gray-900 dark:text-gray-200">
						{listingDetail.authorFirstName}{ }{listingDetail.authorLastName}
						</p>
						<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
						{listingDetail.authorPhoneNumber}
						</p>
						<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
						{listingDetail.authorCompanyName}
						
						</p>

						<p className="text-xs text-gray-400 dark:text-gray-400">
						<ButtonSecondary className="whatsapp">
							<Link aria-label="Chat on WhatsApp" href={`https://wa.me/${listingDetail.authorPhoneNumber}`}> 
								<i className="lab la-whatsapp text-3xl whatsapp"></i> Message on Whatsapp
							</Link>
						</ButtonSecondary>
						</p>
					</div>
				</div>
				<Textarea>
					
				</Textarea>

				x checkbox for terms & conditions 
				<ButtonPrimary>
					Send Message
				</ButtonPrimary>
			</div>
		)
	}


	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl min-h-[260px] p-4">
				<div className="imageGalleryPlaceholder absolute justify-center items-center">Image Gallery</div>
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2">
					<div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
						<Image
							fill
							className="rounded-md object-cover sm:rounded-xl"
							src={galleryPhotos[0]}
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
							}`}
						>
							<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
								<Image
									fill
									className="rounded-md object-cover sm:rounded-xl"
									src={item || ''}
									alt=""
									sizes="400px"
								/>
							</div>

							{/* OVERLAY */}
							<div
								className="absolute inset-0 cursor-pointer bg-neutral-900 bg-opacity-20 opacity-0 transition-opacity hover:opacity-100"
								onClick={handleOpenModalImageGallery}
							/>
						</div>
					))}

					<button
						className="absolute bottom-3 left-3 z-10 hidden rounded-xl bg-neutral-100 px-4 py-2 text-neutral-500 hover:bg-neutral-200 md:flex md:items-center md:justify-center"
						onClick={handleOpenModalImageGallery}
					>
						<Squares2X2Icon className="h-5 w-5" />
						<span className="ml-2 text-sm font-medium text-neutral-800">
							Show all photos
						</span>
					</button>
				</div>
			</header>

			{/* MAIN */}
			<main className="relative z-10 mt-0 flex flex-col lg:flex-row">
				{/* CONTENT */}
				<div className="w-full space-y-8 lg:w-3/5 lg:space-y-10 lg:pr-10 xl:w-2/3">
					{renderSection1()}
					{renderSection2()}
					{renderSection3()}
					{/* {renderSection4()} */}
					<Reviews />
					<SectionDateRange />
					{renderSection5()}
					{/* {renderSection6()} */}
					{renderSection7()}
					{renderSection8()}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage