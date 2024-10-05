'use client'

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Slider from 'rc-slider'
import NcInputNumber from '@/components/NcInputNumber'
import { XMarkIcon } from '@heroicons/react/24/outline'

// DEMO DATA
const typeOfProperty = [
	{
		name: 'Duplex House',
		description: 'Have a place to yourself',
		checked: true,
	},
	{
		name: 'Ferme House',
		description: 'Have your own room and share some common spaces',
		checked: true,
	},
	{
		name: 'Chalet House',
		description:
			'Have a private or shared room in a boutique hotel, hostel, and more',
		checked: true,
	},
	{
		name: 'Maison House',
		description: 'Stay in a shared space, like a common room',
	},
]

//
const moreFilter1 = typeOfProperty

const TabFilters = () => {
	const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false)
	//
	const [isOnSale, setIsOnSale] = useState(true)
	const [rangePrices, setRangePrices] = useState([0, 1000])
	//
	const closeModalMoreFilter = () => setisOpenMoreFilter(false)
	const openModalMoreFilter = () => setisOpenMoreFilter(true)

	const renderXClear = () => {
		return (
			<span className="ml-3 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white">
				<XMarkIcon className="h-3 w-3" />
			</span>
		)
	}

	const renderTabsRoomAndBeds = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Rooms of Beds</span>
							<i className="las la-angle-down ml-2"></i>
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										<NcInputNumber label="Beds" max={10} />
										<NcInputNumber label="Bedrooms" max={10} />
										<NcInputNumber label="Bathrooms" max={10} />
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

	const renderTabsTypeOfPlace = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<PopoverButton
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Type of property</span>
							<i className="las la-angle-down ml-2"></i>
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
							<PopoverPanel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{typeOfProperty.map((item) => (
											<div key={item.name} className="">
												<Checkbox
													name={item.name}
													label={item.name}
													subLabel={item.description}
												/>
											</div>
										))}
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

	const renderTabOnSale = () => {
		return (
			<div
				className={`flex cursor-pointer items-center justify-center rounded-full border px-4 py-2 text-sm transition-all focus:outline-none ${
					isOnSale
						? 'border-primary-500 bg-primary-50 text-primary-700'
						: 'border-neutral-300 dark:border-neutral-700'
				}`}
				onClick={() => setIsOnSale(!isOnSale)}
			>
				<span>On sale</span>
				{isOnSale && renderXClear()}
			</div>
		)
	}

	const renderMoreFilterItem = (
		data: {
			name: string
			description?: string
			defaultChecked?: boolean
		}[],
	) => {
		const list1 = data.filter((_, i) => i < data.length / 2)
		const list2 = data.filter((_, i) => i >= data.length / 2)
		return (
			<div className="grid gap-8 md:grid-cols-2">
				<div className="flex flex-col space-y-5">
					{list1.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							subLabel={item.description}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
				<div className="flex flex-col space-y-5">
					{list2.map((item) => (
						<Checkbox
							key={item.name}
							name={item.name}
							subLabel={item.description}
							label={item.name}
							defaultChecked={!!item.defaultChecked}
						/>
					))}
				</div>
			</div>
		)
	}

	const renderTabMobileFilter = () => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
					onClick={openModalMoreFilter}
				>
					<span>
						<span className="hidden sm:inline">Experiences</span> filters (3)
					</span>
					{renderXClear()}
				</div>

				<Transition appear show={isOpenMoreFilter} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 z-50 overflow-y-auto"
						onClose={closeModalMoreFilter}
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
										<DialogTitle
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											Experiences filters
										</DialogTitle>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalMoreFilter} />
										</span>
									</div>

									<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 sm:px-6">
											<div className="py-7">
												<h3 className="text-xl font-medium">
													Type of experiences
												</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(moreFilter1)}
												</div>
											</div>

											{/* --------- */}
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
																		className="w-full pl-7 pr-3"
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
																		className="pl-7 pr-3"
																		value={rangePrices[1]}
																	/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-4 dark:border-t dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
										<ButtonThird
											onClick={closeModalMoreFilter}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={closeModalMoreFilter}
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

	return (
		<div className="flex lg:space-x-4">
			<div className="hidden space-x-4 lg:flex">
				{renderTabsTypeOfPlace()}
				{renderTabsRoomAndBeds()}
				{renderTabsPriceRage()}
				{renderTabOnSale()}
			</div>
			<div className="flex space-x-4 lg:hidden">
				{renderTabMobileFilter()}
				{renderTabOnSale()}
			</div>
		</div>
	)
}

export default TabFilters
