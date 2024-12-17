//saquita
'use client';
import { FC, Fragment, useEffect, useState } from 'react';
import ContactForm  from '@/components/ContactForm';
import {Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Squares2X2Icon, PrinterIcon, LanguageIcon } from '@heroicons/react/24/outline';
import BtnLikeIcon from '@/components/BtnLikeIcon';
import Price from '@/components/Price';
import StartRating from '@/components/StartRating';
import Avatar from '@/shared/Avatar';
import ButtonSecondary from '@/shared/ButtonSecondary';
import ButtonClose from '@/shared/ButtonClose';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation';
import { Amenities_demos, PHOTOS } from '../constant';
import SectionDateRange from '../SectionDateRange';
import { Route } from 'next';
import ShareBtn from '@/components/ShareBtn';
import Reviews from '../../../components/Reviews';
import axios from 'axios';
//import { ListingDetailType } from "@/data/types";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import Link from 'next/link';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { formatDateJoined } from "@/utils/helpers";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSession } from "next-auth/react";

const ListingStayDetailPage = ({
	params,
	searchParams,
	} : {
	params: { lid: string };
	searchParams?: { [key: string]: string | string[] | undefined };
	}) => {

	const DEMO_DATA = DEMO_STAY_LISTINGS[0];

	let [listingDetail, setListingDetail]= useState(
		{
			galleryImgs:[],
			listingCategory:'',
			address: null,
			title: '',
			bedrooms: 0,
			bathrooms: 0,
			sqft: 0,
			amenities:[],
			href:'',
			likes: null,
			availabilityDate: null,
			saleOff: null,  
			isAds: null,
			price: null,
			reviewStart: null,
			reviewCount: null,
			id:'',
			description: "{ Description }",
			listing_id: null,
			authorFirstName:'',
			authorLastName:'',
			authorAvatar:'',
			authorPhoneNumber: null,
			authorCompanyName: null,
			authorListingsCount:null,
			authorId: null,
			authorAbout:null,
			authorCreatedAt:null
		  }
	);

	const { data: session } = useSession();
	const user = session?.user;

	let [galleryPhotos, setGalleryPhotos]= useState([PHOTOS]);
	const thisPathname = usePathname();
	const router = useRouter();
	const listingId = searchParams.lid;
	const [loading, setLoading] = useState(true);
	const shareUrl = (process.env.NEXT_PUBLIC_API_URL).concat(thisPathname);
	const [arr,setArr] = useState([]);
	const [amenitiesArray, setAmenitiesArray] = useState(false);
	
	let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
	
	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations
	);

	const renderAmenities = async (amenities) => {
		
		setAmenitiesArray(true);

		if(amenities === null){
			return;
		}

		const Array = JSON.parse(amenities); 

		Array.forEach(has => {
			Amenities_demos.forEach(item => {
				if(has == item.key){
					arr.push({icon:item.icon,key:has })	
				}
			});
		});
	}

	const loadListingDetailData = async () => {
			const d = await fetchListingDetailData();
			const prevData = listingDetail;
			listingDetail = d;
			d.authorCreatedAt = formatDateJoined(d.authorCreatedAt)
			setListingDetail(d);
			setLoading(false);
			setGalleryPhotos(listingDetail['galleryImgs']);
			renderAmenities(d.amenitites);
			setListingDetail((listingDetail) => ({ ...listingDetail, d }));
	}

	useEffect(() => {
		
		if(listingId){
			loadListingDetailData();
		} else {
			alert("todo: display error message is the id isnt passed & display mock object data");
			//setListingDetail(DEMO_DATA); // load the test view
		}
	},[]);

	const fetchListingDetailData = async () => {

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listingDetail/get`, {listing_id:listingId,userId:user.id});
	
			if (response) {
				//console.log(response.data)
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
      {/* <pre>{JSON.stringify(translations, null, 2)}</pre> */}
				<div className="flex items-center justify-between">	
					<h2 className="text-1xl sm:text-2xl lg:text-3xl">
						{listingDetail.title}
					</h2>
					<div className="flow-root ">
						<div className="flex text-neutral-700 dark:text-neutral-300 text-sm -mx-3 -my-1.5">
							<ShareBtn
								text={translations.share}
								url={shareUrl}
								title={translations.checkoutThisListing}
							/>
							<div className="flex items-center">

							{!loading && (
        						<BtnLikeIcon isLiked={listingDetail.likes} id={listingId} className="" colorClass="text-gray-700"      
							/>)}
							<span>
								{translations.save}
							</span>

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
							{listingDetail.bedrooms} <span className="hidden sm:inline-block">{translations.bedrooms}</span>
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-bath text-2xl"></i>
						<span className=" ">
						{listingDetail.bathrooms} <span className="hidden sm:inline-block">{translations.bathrooms}</span>
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
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{translations.wifi}
						</span>
					</div>
					<div className="flex items-center space-x-3">
						<i className="las la-smoking-ban text-lg"></i>
						<span className="text-sm text-neutral-500 dark:text-neutral-400">
						{translations.noSmoking}
						</span>
          			</div>
				</div>
			</div>
		)
	}

	const renderSection2 = () => {
		return (
			<div className="listingSection__wrap">
				<h2 className="text-xl font-semibold items-end">{translations.listingDescription} 
					<div className="flex p-0 m-0 text-xs font-normal"><i>{translations.someInfoAutomaticallyTranslated}</i> <Link className="pl-3 underline" href="#">{translations.showOriginal}</Link>
					<LanguageIcon className="pl-1 h-6 w-6" />
					</div>
				</h2>
				
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
				<div className="text-neutral-6000 dark:text-neutral-300">
					<div>
						{listingDetail.description}
					</div>
				</div>
			</div>
		)
	}

	const renderSection3 = () => {
		return (
			<div className="listingSection__wrap">
				<div>
					<h2 className="text-xl font-semibold">{translations.amenities} ({arr.length})</h2>
				</div>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				<div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
				
				{/* {!loading && ()} */}
				
					{amenitiesArray && (							
						arr.map((item) => (
							
							<div key={item.name} className="flex items-center space-x-3">
								<i className={`las text-3xl ${item.icon}`}></i>
								<span className=" ">{item.key}</span>
							</div>
						))
					)}
				</div>

				{/*<div className="w-14 border-b border-neutral-200"></div>
				 <div >
					<ButtonSecondary className="text-red-700" onClick={openModalAmenities}>
						View more 20 amenities
					</ButtonSecondary>
				</div> 
				{renderMotalAmenities()}*/}
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
			<div className="listingSection__wrap">
				{/* HEADING */}
				<h2 className="text-xl font-semibold">{translations.listingAgent}</h2>
				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* host */}
				<div className="flex items-center space-x-4">

					<Avatar
						imgUrl={listingDetail.authorAvatar}
						userName={listingDetail.authorFirstName}
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-16 w-16"
						radius="rounded-full"
					/>
					<div>
						<a className="block text-xl font-medium" href={`/publicProfile?uid=${listingDetail.authorId}`}>
							{listingDetail.authorFirstName} { } {listingDetail.authorLastName}
						</a>
						<div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
							<StartRating />
							<span className="mx-2">·</span>
							<a className="underline" href={`/publicProfile?uid=${listingDetail.authorId}`}>{listingDetail.authorListingsCount} {translations.listings}</a>
						</div>
					</div>
				</div>

				{/* desc */}
				<span className="block text-neutral-6000 dark:text-neutral-300">
				{listingDetail.authorAbout}
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
						<span>{translations.joinedIn} {translations.space}{listingDetail.authorCreatedAt}</span>
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
						href={`/publicProfile?uid=${listingDetail.authorId}` as Route<string>}
					>{translations.seeAgentProfile}</ButtonSecondary>
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
		
const print =() => {
	window.print
}
	const renderSidebar = () => {
		return (
			<>
			<div className="listingSectionSidebar__wrap shadow-xl">
				<span className="text-3xl font-semibold">
					{!!listingDetail.price || listingDetail.price == null && (
						<Price className="text-3xl font-semibold" price={listingDetail.price} />
					)}
					{listingDetail.price && (
						<div>${listingDetail.price}
						<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
							/{translations.month}
						</span></div>
					)}
				</span>

				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>

				<div className="flex">
					<Avatar
						imgUrl={listingDetail.authorAvatar}
						hasChecked
						hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
						sizeClass="h-16 w-16"
						userName={listingDetail.authorFirstName} />

					<div className="ml-3 sm:ml-4 space-y-1">
						<p className="text-sm font-medium text-gray-900 dark:text-gray-200">
							{listingDetail.authorFirstName}{" "}{listingDetail.authorLastName}
						</p>
						<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
							{formatPhoneNumberIntl(listingDetail.authorPhoneNumber)}
						</p>
						<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
							{listingDetail.authorCompanyName}
						</p>
					</div>
				</div>
				<div className="border-b border-neutral-200 dark:border-neutral-700"></div>
				{!loading && (
					<ContactForm
					data={listingId}
					/>
				)}
			</div>
			
            <div className="flex pt-5 justify-center">
				<ButtonSecondary className="border-0" onClick={print}>
					<PrinterIcon className="h-6 w-6" />
					<div className="pl-5">{translations.print} {translations.space} {translations.listing}</div>
				</ButtonSecondary>
            </div>
			</>
		)
	}

	return (
		<div className="nc-ListingStayDetailPage">
			{/*  HEADER */}
			<header className="rounded-md sm:rounded-xl p-4">
				<div className="relative grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2 min-h-[280px]">
					<div
						className="relative col-span-2 row-span-3 cursor-pointer overflow-hidden rounded-md sm:row-span-2 sm:rounded-xl"
						onClick={handleOpenModalImageGallery}
					>
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
							}`}
						> 
							<div className="aspect-h-3 aspect-w-4 sm:aspect-h-5 sm:aspect-w-6">
								<Image
									fill
									className="rounded-md object-cover sm:rounded-xl"
									src={item.toString() || ''}
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
							{translations.showAllPhotos}
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
					
					<Reviews
						className=""
						id={listingId}
						type="listing"
					/>
					{!loading && (
					<SectionDateRange
						sDate={listingDetail.availabilityDate}
						eDate={listingDetail.availabilityDate}
					/>)}
					{renderSection5()}
					{/* {renderSection6()} */}
					{renderSection7()}
					{/* {renderSection8()} */}
				</div>

				{/* SIDEBAR */}
				<div className="mt-14 hidden flex-grow lg:mt-0 lg:block">
					<div className="sticky top-28">{renderSidebar()}</div>
				</div>
			</main>
		</div>
	)
}

export default ListingStayDetailPage;