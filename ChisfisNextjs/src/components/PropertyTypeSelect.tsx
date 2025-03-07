'use client'
import React, { Fragment, FC, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Checkbox from '@/shared/Checkbox'
//import { ClassOfProperties } from "../components/type";
import { HomeIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import options from '@/utils/options'
import { RootState } from '@/store/store'
import { getLangPref } from '@/utils/helpers'

const defaultPropertyType = options.getListingTypes()

export interface PropertyTypeSelectProps {
	onChange?: (data: any) => void
	fieldClassName?: string
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
	onChange,
	fieldClassName = '',
}) => {
	const [langPref, setLangPref] = useState('')
	const [typeOfProperty, setTypeOfProperty] = useState(defaultPropertyType)
	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations,
	)

	useEffect(() => {
		//@Ezra
		setLangPref(getLangPref())
		// note: all localstorage checks have to be in useEffect to eliminate terminal errors;
		// need app defaults to be accesible in redux (options, translations, langpref, currencpref for now)
	}, [])

	let typeOfPropertyText = 'Loading...'
	if (typeOfProperty && typeOfProperty.length > 0) {
		typeOfPropertyText = typeOfProperty
			.filter((item) => item.checked)
			.map((item) => {
				return item[langPref]
			})
			.join(', ')
	}
	return (
		<Popover className="relative flex flex-1">
			{({ open, close }) => (
				<>
					<Popover.Button
						className={`[ nc-hero-field-padding ] z-10 flex w-full flex-shrink-0 cursor-pointer space-x-3 text-left focus:outline-none ${
							open ? 'text-primary-6000' : ''
						}`}
						onClickCapture={() => document.querySelector('html')?.click()}
					>
						<div className="text-neutral-300 dark:text-neutral-400">
							<HomeIcon className="h-5 w-5 lg:h-7 lg:w-7" />
						</div>
						<div className="flex-1">
							<span className="block overflow-hidden font-semibold xl:text-sm">
								<span className="line-clamp-1">
									{typeOfPropertyText || `${translations.select}`}
								</span>
							</span>
							<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
								{translations.propertyType}
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
						<Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-full max-w-sm rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<div className="">
								<div className="relative flex flex-col space-y-5">
									{typeOfProperty.map((item, index) => (
										<div key={item.field} className="">
											<Checkbox
												name={item.field}
												label={item[langPref]}
												subLabel=""
												defaultChecked={typeOfProperty[index].checked}
												onChange={(e) => {
													const newState = typeOfProperty.map((item, i) => {
														if (i === index) {
															return { ...item, checked: e }
														}
														return item
													})
													setTypeOfProperty(() => {
														return newState
													})
													onChange && onChange(newState)
												}}
											/>
										</div>
									))}
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default PropertyTypeSelect
