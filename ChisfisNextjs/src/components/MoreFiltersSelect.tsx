'use client'
import React, { Fragment, FC, useState, useEffect } from 'react'
import {
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import Checkbox from '@/shared/Checkbox'
import { ClassOfOptions } from './type'
import options from '@/utils/options'
import { useSelector } from 'react-redux'
import { ClipboardSignatureIcon } from 'lucide-react'
import { getLangPref } from '@/utils/helpers'
import { RootState } from '@/store/store'

export interface PropertyTypeSelectProps {
	onChange?: (data: any) => void
	fieldClassName?: string
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
	onChange,
	fieldClassName = '',
}) => {
	const [typeOfProperty1, setTypeOfProperty1] = React.useState<
		ClassOfOptions[]
	>(options.getGeneralAmenities())
	const [typeOfProperty2, setTypeOfProperty2] = React.useState<
		ClassOfOptions[]
	>(options.getOtherAmenities())
	const [typeOfProperty3, setTypeOfProperty3] = React.useState<
		ClassOfOptions[]
	>(options.getSafeAmenities())
	const [typeOfProperty4, setTypeOfProperty4] = React.useState<
		ClassOfOptions[]
	>(options.getHouseRulesAmenities())
	const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false)
	const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false)
	//const closeModalMoreFilter = () => setisOpenMoreFilter(false); //todo: move modal code here when doing modal. saquita
	//const openModalMoreFilter = () => setisOpenMoreFilter(true);
	const [langPref, setLangPref] = useState('')
	const display = langPref + '_abbreviation'
	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations,
	)

	useEffect(() => {
		//@Ezra
		setLangPref(getLangPref())
	}, [])

	let typeOfPropertyText = 'Loading...'

	let typeOfPropertyTextArray = []

	;[typeOfProperty1, typeOfProperty2, typeOfProperty3, typeOfProperty4].forEach(
		(propertyList) => {
			if (propertyList && propertyList.length > 0) {
				const filteredItems = propertyList
					.filter((item) => item.checked)
					.map((item) => item[langPref])

				typeOfPropertyTextArray.push(...filteredItems)
			}
		},
	)

	// Update the text only if there are valid values, otherwise keep "Loading..."
	typeOfPropertyText =
		typeOfPropertyTextArray.length > 0
			? typeOfPropertyTextArray.join(', ')
			: 'Select'

	console.log(
		'typeOfPropertyTextArray',
		typeOfPropertyTextArray,
		typeOfPropertyText,
	)

	// let typeOfPropertyText = ''

	// if (typeOfProperty1 && typeOfProperty1.length > 0) {
	// 	typeOfPropertyText += typeOfProperty1
	// 		.filter((item) => item.checked)
	// 		.map((item) => {
	// 			return item[langPref]
	// 		})
	// 		.join(', ')
	// }

	// if (typeOfProperty2 && typeOfProperty2.length > 0) {
	// 	typeOfPropertyText += typeOfProperty2
	// 		.filter((item) => item.checked)
	// 		.map((item) => {
	// 			return item[langPref]
	// 		})
	// 		.join(', ')
	// }

	// if (typeOfProperty3 && typeOfProperty3.length > 0) {
	// 	typeOfPropertyText += typeOfProperty3
	// 		.filter((item) => item.checked)
	// 		.map((item) => {
	// 			return item[langPref]
	// 		})
	// 		.join(', ')
	// }

	// if (typeOfProperty4 && typeOfProperty4.length > 0) {
	// 	typeOfPropertyText += typeOfProperty4
	// 		.filter((item) => item.checked)
	// 		.map((item) => {
	// 			return item[langPref]
	// 		})
	// 		.join(', ')
	// }

	return (
		<Popover className="relative flex flex-1">
			{({ open, close }) => (
				<>
					<PopoverButton
						className={`[ nc-hero-field-padding ] z-10 flex w-full flex-shrink-0 cursor-pointer space-x-3 text-left focus:outline-none ${
							open ? 'text-primary-6000' : ''
						}`}
						onClickCapture={() => document.querySelector('html')?.click()}
					>
						<div className="text-neutral-300 dark:text-neutral-400">
							<ClipboardSignatureIcon />
						</div>
						<div className="flex-1">
							<span className="block overflow-hidden font-semibold xl:text-sm">
								<span className="line-clamp-1">
									{typeOfPropertyText
										? typeOfPropertyText
										: '' || `${translations.select}`}
								</span>
							</span>
							<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
								{translations.moreFilters}
							</span>
						</div>
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
						<PopoverPanel className="absolute left-1/2 top-full z-20 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
							<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
								<div className="flex-grow overflow-y-auto">
									<div className="divide-y divide-neutral-200 px-10 dark:divide-neutral-800">
										<div className="py-7">
											<h3 className="text-l font-medium">
												{translations.general} {translations.space}{' '}
												{translations.amenities}
											</h3>
											<div className="relative">
												<div className="flex flex-wrap">
													{typeOfProperty1.map((item, index) => (
														<div key={item.field} className="mt-4 w-1/3">
															<Checkbox
																name={item.field}
																label={item[langPref]}
																defaultChecked={typeOfProperty1[index].checked}
																onChange={(e) => {
																	const newState = typeOfProperty1.map(
																		(item, i) => {
																			if (i == index) {
																				return { ...item, checked: e }
																			}
																			return item
																		},
																	)
																	setTypeOfProperty1(() => {
																		return newState
																	})

																	onChange && onChange(newState)
																}}
															/>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="py-7">
											<h3 className="text-l font-medium">
												{translations.other} {translations.space}{' '}
												{translations.amenities}
											</h3>
											<div className="relative">
												<div className="flex flex-wrap">
													{typeOfProperty2.map((item, index) => (
														<div key={item.field} className="mt-4 w-1/3">
															<Checkbox
																name={item.field}
																label={item[langPref]}
																defaultChecked={typeOfProperty2[index].checked}
																onChange={(e) => {
																	const newState = typeOfProperty2.map(
																		(item, i) => {
																			if (i == index) {
																				return { ...item, checked: e }
																			}
																			return item
																		},
																	)
																	setTypeOfProperty2(() => {
																		return newState
																	})

																	onChange && onChange(newState)
																}}
															/>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="py-7">
											<h3 className="text-l font-medium">
												{translations.safe} {translations.space}{' '}
												{translations.amenities}
											</h3>
											<div className="relative">
												<div className="flex flex-wrap">
													{typeOfProperty3.map((item, index) => (
														<div key={item.field} className="mt-4 w-1/3">
															<Checkbox
																name={item.field}
																label={item[langPref]}
																defaultChecked={typeOfProperty3[index].checked}
																onChange={(e) => {
																	const newState = typeOfProperty3.map(
																		(item, i) => {
																			if (i == index) {
																				return { ...item, checked: e }
																			}
																			return item
																		},
																	)
																	setTypeOfProperty3(() => {
																		return newState
																	})

																	onChange && onChange(newState)
																}}
															/>
														</div>
													))}
												</div>
											</div>
										</div>
										<div className="py-7">
											<h3 className="text-l font-medium">
												{translations.rules}
											</h3>
											<div className="relative">
												<div className="flex flex-wrap">
													{typeOfProperty4.map((item, index) => (
														<div key={item.field} className="mt-4 w-1/3">
															<Checkbox
																name={item.field}
																label={item[langPref]}
																defaultChecked={typeOfProperty4[index].checked}
																onChange={(e) => {
																	const newState = typeOfProperty4.map(
																		(item, i) => {
																			if (i == index) {
																				return { ...item, checked: e }
																			}
																			return item
																		},
																	)
																	setTypeOfProperty4(() => {
																		return newState
																	})

																	onChange && onChange(newState)
																}}
															/>
														</div>
													))}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</PopoverPanel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default PropertyTypeSelect
