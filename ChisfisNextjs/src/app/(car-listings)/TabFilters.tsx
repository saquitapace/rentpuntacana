'use client'

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	Popover,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import ButtonClose from '@/shared/ButtonClose'
import Checkbox from '@/shared/Checkbox'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Slider from 'rc-slider'

// DEMO DATA
const typeOfCar = [
	{ name: 'Small', description: '$68' },
	{ name: 'Medium', description: '$128' },
	{ name: 'Large', description: '$268' },
	{ name: 'SUV', description: '$268' },
	{ name: 'Van', description: '$268' },
	{ name: 'Luxury', description: '$268' },
]

const carSpecifications = [
	{ name: 'With air conditioning' },
	{ name: 'Automatic transmission' },
	{ name: 'Manual transmission' },
	{ name: '2 doors' },
	{ name: '4+ doors' },
]

//
const mileage = [{ name: 'Unlimited' }, { name: 'Limited' }]
const supplier = [
	{ name: 'Alamo', defaultChecked: true },
	{ name: 'Avis', defaultChecked: true },
	{ name: 'Budget' },
	{ name: 'Dollar' },
]
const insurance = [
	{ name: 'No insurance', defaultChecked: true },
	{ name: 'Zero excess ' },
	{ name: 'Inclusive' },
]

const TabFilters = () => {
	const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false)
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false)
	const [rangePrices, setRangePrices] = useState([0, 1000])
	const [isOnSale, setIsOnSale] = useState(true)
	//
	const closeModalMoreFilter = () => setisOpenMoreFilter(false)
	const openModalMoreFilter = () => setisOpenMoreFilter(true)
	//
	const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false)
	const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true)

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

	const renderTabsTypeOfCars = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Car type</span>
							<i className="las la-angle-down ml-2"></i>
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
							<Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										{typeOfCar.map((item) => (
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
							</Popover.Panel>
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
						<Popover.Button
							className={`flex items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
						>
							<span>
								{`$${convertNumbThousand(
									rangePrices[0],
								)} - $${convertNumbThousand(rangePrices[1])}`}{' '}
							</span>
							{renderXClear()}
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
							<Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0">
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
							</Popover.Panel>
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

	const renderTabsGuestsAndBags = () => {
		return (
			<Popover className="relative">
				{({ open, close }) => (
					<>
						<Popover.Button
							className={`flex items-center justify-center rounded-full border border-neutral-300 px-4 py-2 text-sm hover:border-neutral-400 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-6000 ${
								open ? '!border-primary-500' : ''
							}`}
						>
							<span>Guests & Bags</span>
							<i className="las la-angle-down ml-2"></i>
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
							<Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-sm px-4 sm:px-0 lg:max-w-md">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
									<div className="relative flex flex-col space-y-5 px-5 py-6">
										<NcInputNumber label="Passengers" max={40} />
										<NcInputNumber label="Bags" max={40} />
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
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
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
			<div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8">
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

	// Morefilter for mobile mode
	const renderTabMobileFilter = () => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
					onClick={openModalMoreFilterMobile}
				>
					<span>
						<span className="hidden sm:inline">Car</span> filters (3)
					</span>
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
										<DialogTitle
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900"
										>
											Experiences filters
										</DialogTitle>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalMoreFilterMobile} />
										</span>
									</div>

									<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 sm:px-6">
											{/* ------ */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Type of car</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(typeOfCar)}
												</div>
											</div>

											{/* ------ */}
											<div className="py-7">
												<h3 className="text-xl font-medium">
													Car specifications
												</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(carSpecifications)}
												</div>
											</div>

											{/* --------- */}
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

											{/* ------ */}
											<div className="py-7">
												<h3 className="text-xl font-medium">
													Passengers & Bags
												</h3>
												<div className="relative mt-6 flex-col space-y-5 px-5 py-6">
													<NcInputNumber label="Passengers" max={40} />
													<NcInputNumber label="Bags" max={40} />
												</div>
											</div>

											{/* ------ */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Mileage</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(mileage)}
												</div>
											</div>

											{/* ------ */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Supplier</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(supplier)}
												</div>
											</div>

											{/* ------ */}
											<div className="py-7">
												<h3 className="text-xl font-medium">Insurance</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(insurance)}
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

	//
	const renderTabMoreFilter = () => {
		return (
			<div>
				<div
					className={`flex cursor-pointer items-center justify-center rounded-full border border-primary-500 bg-primary-50 px-4 py-2 text-sm text-primary-700 focus:outline-none`}
					onClick={openModalMoreFilter}
				>
					<span>More filters (3)</span>
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
											More filters
										</DialogTitle>
										<span className="absolute left-3 top-3">
											<ButtonClose onClick={closeModalMoreFilter} />
										</span>
									</div>

									<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-4 dark:divide-neutral-800 sm:px-6">
											<div className="py-7">
												<h3 className="text-xl font-medium">
													Car specifications
												</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(carSpecifications)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Mileage</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(mileage)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Supplier</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(supplier)}
												</div>
											</div>
											<div className="py-7">
												<h3 className="text-xl font-medium">Insurance</h3>
												<div className="relative mt-6">
													{renderMoreFilterItem(insurance)}
												</div>
											</div>
										</div>
									</div>

									<div className="flex flex-shrink-0 items-center justify-between bg-neutral-50 p-6 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
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
				{renderTabsTypeOfCars()}
				{renderTabsPriceRage()}
				{renderTabsGuestsAndBags()}
				{renderTabMoreFilter()}
			</div>
			<div className="flex space-x-4 lg:hidden">
				{renderTabMobileFilter()}
				{renderTabOnSale()}
			</div>
		</div>
	)
}

export default TabFilters
