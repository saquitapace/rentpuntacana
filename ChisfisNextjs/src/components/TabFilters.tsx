'use client'
//saquita -tabfilters
import { FC, Fragment, useState } from 'react';
import PriceRangeInput from "@/components/PriceRangeInput";
import PropertyTypeSelect from "@/components/PropertyTypeSelect";
import BedBathSelect from "@/components/BedBathSelect";
import options from '@/utils/options';
import {
	Dialog,
	//DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import ButtonThird from '@/shared/ButtonThird';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import ButtonClose from '@/shared/ButtonClose';
import Checkbox from '@/shared/Checkbox';
import DateRangeInput from "@/components/DateRangeInput";
import Slider from 'rc-slider';
import convertNumbThousand from '@/utils/convertNumbThousand';
import MoreFiltersSelect from "@/components/MoreFiltersSelect";
import { useSelector } from 'react-redux';

export interface TabFiltersProps  {
	onChange: (e: any) => void; 
	viewAll?:boolean;
}
const TabFilters: FC<TabFiltersProps> = ({
	onChange = (e) => { return formData},
	viewAll
	}) => {
		
	// input fields
	const[type,setType] = useState([]);
	const[price,setPrice] = useState([]);
	const[bedBath,setBedBath] = useState([]);
	const[more1,setMore1] = useState([]);
	const[more2,setMore2] = useState([]);
	const[more3,setMore3] = useState([]);
	const[more4,setMore4] = useState([]);
	const[date,setDate] = useState([]);

	const [rangePrices, setRangePrices] = useState([0, 1000]);

	const { translations, isLoading, error } = useSelector(
		(state) => state.translations
	  );
	
	const moreFilter1 = options.getGeneralAmenities();
	const moreFilter2 = options.getOtherAmenities();
	const moreFilter3 = options.getSafeAmenities();
	const moreFilter4 = options.getHouseRulesAmenities();
	const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
	const closeModalMoreFilter = () => setisOpenMoreFilter(false);
	const openModalMoreFilter = () => setisOpenMoreFilter(true);
	const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
	const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);
	
	const [formData, setFormData] = useState({
        type: [],
        price: {},
        bedBath: [],
        more1: [],
		more2: [],
		more3: [],
		more4: [],
        date: ""
    });

	const renderXClear = () => {
		return (
			<span className="ml-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-3 w-3"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</span>
		)
	}

	const renderTabsPriceRage = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
						>
							<span>
								{`$${convertNumbThousand(
									rangePrices[0],
								)} - $${convertNumbThousand(rangePrices[1])}`}{' '}
							</span>
							{renderXClear()}
						</PopoverButton>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-8 px-5 py-6">
										<div className="space-y-5">
											<span className="font-medium">Price per day</span>
											<Slider
												range
												className="text-red-400"
												min={0}
												max={2000}
												defaultValue={[rangePrices[0], rangePrices[1]]}
												allowCross={false}
												onChange={(e) => setRangePrices(e as number[])}
											/>
										</div>

										<div className="flex justify-between space-x-5">
											<div>
												<label
													htmlFor="minPrice"
													className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
												>
													Min price
												</label>
												<div className="relative mt-1 rounded-md">
													<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
														<span className="text-neutral-500 sm:text-sm">
															$
														</span>
													</div>
													<input
														type="text"
														name="minPrice"
														disabled
														id="minPrice"
														className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={rangePrices[0]}
													/>
												</div>
											</div>
											<div>
												<label
													htmlFor="maxPrice"
													className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
												>
													Max price
												</label>
												<div className="relative mt-1 rounded-md">
													<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
														<span className="text-neutral-500 sm:text-sm">
															$
														</span>
													</div>
													<input
														type="text"
														disabled
														name="maxPrice"
														id="maxPrice"
														className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={rangePrices[1]}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird onClick={close} sizeClass="px-4 py-2 sm:px-5">
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>
		)
	}

	const renderMoreFilterItem = (
		data: {
			field: string
			name: string
			en: string
			sp: string
			defaultChecked?: boolean
		}[],
	) => {

		const list1 = data.filter((_, i) => i < data.length / 3)
		const list2 = data.filter((_, i) => i > list1.length-1 && i <list1.length*2)
		const list3 = data.filter((_, i) => i > (list1.length + list2.length) -1)

		return (

			<div className="grid grid-cols-3 gap-4">
				<div className="flex flex-col space-y-5">
					{list1.map((item) => (
						<Checkbox
							key={item.field}
							name={item.en}
							label={item.en}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list2.map((item) => (
						<Checkbox
							key={item.field}
							name={item.en}
							label={item.en}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list3.map((item) => (
						<Checkbox
							key={item.field}
							name={item.en}
							label={item.en}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
			</div>
		)
	}

	const renderTabMoreFilter = () => {
		return (
			<Popover className="flex relative flex-1">
				{({ open, close }) => (
					<>
						<Popover.Button
            className={`flex z-10 text-left w-full flex-shrink-0 [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer ${
				open ? "text-primary-6000" : ""
			}`}
						  >

<div className="text-neutral-300 dark:text-neutral-400">
<i className="las la-bed text-2xl w-5 h-5 lg:w-7 lg:h-7"></i>
            </div>
            <div className="flex-1">
			<span className="block xl:text-sm font-semibold truncate">
			<span className="line-clamp-1">
                  <span>More filters</span>
				{/*}  {renderXClear()} */}
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light ">
                More / Filters 			
              </span>
            </div>



						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>


{/*h-full w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 */}

<PopoverPanel className="absolute left-1/2 z-20 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">

						{/*	<PopoverPanel className="absolute h-full w-full max-w-4xl transform flex-col left-0 z-10 mt-3 w-screen max-w-4xl px-4 sm:px-0 lg:max-w-lg
							"> */}

								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900
								
								">
									
								<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-10 dark:divide-neutral-800">
											<div className="py-7">
												<h3 className="text-xl font-medium">General Amenities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter1)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Other Amenities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter2)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Safe Amenities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter3)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">House rules</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter4)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</>
				)}
			</Popover>	)}

	const renderTabMoreFilterMobile = () => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none lg:hidden`}
					onClick={openModalMoreFilterMobile}
				>
					<span>More filters (3)</span>
					{renderXClear()}
				</div>

				<Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 z-50 overflow-y-auto"
						onClose={closeModalMoreFilterMobile}
					>
						<div className="min-h-screen text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
							</TransitionChild>

							{/* This element is to trick the browser into centering the modal contents. */}
							<span
								className="inline-block h-screen align-middle"
								aria-hidden="true"
							>
								&#8203;
							</span>
							<TransitionChild
								as={'div'}
								className="inline-block h-screen w-full max-w-4xl px-2 py-8"
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<div className="inline-flex h-full w-full max-w-4xl transform flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
									<div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											More filters
										</Dialog.Title>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalMoreFilterMobile} />
										</span>
									</div>

									<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 sm:px-6">

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Range Prices</h3>
												<div className="relative mt-6">
													<div className="relative flex flex-col space-y-8">
														<div className="space-y-5">
															<Slider
																range
																className="text-red-400"
																min={0}
																max={2000}
																defaultValue={[0, 1000]}
																allowCross={false}
																onChange={(e) => setRangePrices(e as number[])}
															/>
														</div>

														<div className="flex justify-between space-x-5">
															<div>
																<label
																	htmlFor="minPrice"
																	className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
																>
																	Min price
																</label>
																<div className="relative mt-1 rounded-md">
																	<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
																		<span className="text-neutral-500 sm:text-sm">
																			$
																		</span>
																	</div>
																	<input
																		type="text"
																		name="minPrice"
																		disabled
																		id="minPrice"
																		className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
																		value={rangePrices[0]}
																	/>
																</div>
															</div>
															<div>
																<label
																	htmlFor="maxPrice"
																	className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
																>
																	Max price
																</label>
																<div className="relative mt-1 rounded-md">
																	<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
																		<span className="text-neutral-500 sm:text-sm">
																			$
																		</span>
																	</div>
																	<input
																		type="text"
																		disabled
																		name="maxPrice"
																		id="maxPrice"
																		className="block w-full rounded-full border-neutral-200 pl-7 pr-3 text-neutral-900 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
																		value={rangePrices[1]}
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Rooms and beds</h3>
												<div className="relative mt-6 flex flex-col space-y-5">
													<NcInputNumber label="Beds" max={10} />
													<NcInputNumber label="Bedrooms" max={10} />
													<NcInputNumber label="Bathrooms" max={10} />
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Amenities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter1)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Facilities</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter2)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Property type</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter3)}
												</div>
											</div>

											{/* ---- */}
											<div className="py-7">
												<h3 className="text-xl font-medium">House rules</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter4)}
												</div>
											</div>
										</div>
									</div>

									<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-4 dark:border-t dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
										<ButtonThird
											onClick={closeModalMoreFilterMobile}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={closeModalMoreFilterMobile}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div>
								</div>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>
			</div>
		)
	}
	const renderViewAllButton = () => {
		return(
			<div className="hidden sm:block flex-shrink-0">
				<ButtonSecondary href="/listing-search" className="!leading-none mr-3">
					<div className="flex items-center justify-center self-end">
					<span>{translations.viewAll}</span>
					<ArrowRightIcon className="w-5 h-5 ml-3" />
					</div>
				</ButtonSecondary>
			</div>
		)
	}

	const propertyTypeChanged = (e) =>{
		const selectedPropertyTypes = e.filter((f) => f.checked);
		setType(selectedPropertyTypes);
		formData.type = selectedPropertyTypes;
		setFormData({
		...formData,
			['type']: selectedPropertyTypes,
		});
		
	}
	const moreChanged = (e) =>{
		
		const amenities1 = e.filter((f) => f.category == "general_amenities").filter((f) => f.checked);
			setMore1(amenities1);
			formData.more1 = amenities1;
			setFormData({
			...formData,
				['more1']: amenities1
			});

		const amenities2 = e.filter((f) => f.category == "other_amenities").filter((f) => f.checked);
			setMore2(amenities2);
			formData.more2 = amenities2;
			setFormData({
			...formData,
				['more2']: amenities2
			});

		const amenities3 = e.filter((f) => f.category == "safe_amenities").filter((f) => f.checked);
			setMore3(amenities3);
			formData.more3 = amenities3;
			setFormData({
			...formData,
				['more3']: amenities3
			});

		const amenities4 = e.filter((f) => f.category == "house_options").filter((f) => f.checked);
			setMore4(amenities4);
			formData.more4 = amenities4;
			setFormData({
			...formData,
				['more4']: amenities4
			});
	}

	const bedBathChanged = (e) =>{
		const selectedBedBath = e;
		console.log(e);
		setBedBath(selectedBedBath);
			formData.bedBath = e;
			setFormData({
			...formData,
				['bedBath']: e
			});

		onChange(formData);	// trigger event to filters
	}

	const dateChanged = (e) =>{
		alert("date")
		console.log(e)
	}

	const priceRangeInputChanged = (e) =>{
		alert("range change")
		console.log(e)
	}
	
	const sendFormData = (e) =>{

		console.log(formData)
		onChange(formData);	
	}

	return (
		<form 
			onChange={sendFormData}
	className="w-full relative xl:mt-8 flex flex-col lg:flex-row lg:items-center dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0"
		>
			<div className="space-x-2 w-full relative divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0"
			>
				<div className="hidden space-x-2 lg:flex"
				>
					<PropertyTypeSelect
						onChange={(e) => { propertyTypeChanged(e)}}
					/>
					<PriceRangeInput 
						//onChange={(e) => { priceRangeInputChanged(e)}}
					/>
					<BedBathSelect
						onChange={(e) => { bedBathChanged(e)}}
					/>
					<MoreFiltersSelect
						onChange={(e) => { moreChanged(e)}}
					/>
					{/* {renderTabMoreFilter()} */}
					<DateRangeInput
						//onChange={(e) => { dateChanged(e)}}
					/>

					{/*spacer */}
					{viewAll && (	
						<div className="flex justify-items hidden sm:block flex-shrink-0 mr-0 grow justify-end place-self-end flex-row-reverse">&nbsp;
						</div>
					)}
					{viewAll && (	
						renderViewAllButton()
					)}
					
				</div>
				{renderTabMoreFilterMobile()}
			</div>
		</form>
	)
}
export default TabFilters;