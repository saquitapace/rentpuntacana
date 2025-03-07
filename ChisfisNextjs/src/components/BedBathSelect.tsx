'use client'
import React, { Fragment, FC, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ClassOfBedBath } from './type'
import NcInputNumber from '@/components/NcInputNumber'
import { useSelector } from 'react-redux'
import options from '@/utils/options'
import { RootState } from '@/store/store'
//import ButtonThird from "@/shared/ButtonThird";
//import ButtonPrimary from "@/shared/ButtonPrimary";

const defaultBedBath: ClassOfBedBath[] = options.getBedBaths()

export interface BedBathSelectProps {
	onChange?: (data: any) => void
	fieldClassName?: string
}

const BedBathSelect: FC<BedBathSelectProps> = ({
	onChange,
	fieldClassName = '',
}) => {
	const [selection, setSelection] =
		React.useState<ClassOfBedBath[]>(defaultBedBath)
	const [total, setTotal] = useState(
		selection.filter((item) => item.defaultValue > 0).length,
	)

	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations,
	)
	let selectionText = 'Loading...'
	let count = 0

	if (selection && selection.length > 0) {
		selectionText = selection
			.filter((item) => item.defaultValue > 0)
			.map((item) => {
				return item.defaultValue + ' ' + translations[item.field]
			})
			.join(', ')
		count = selection.filter((item) => item.defaultValue > 0).length
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
							<i className="las la-bed h-5 w-5 text-2xl lg:h-7 lg:w-7"></i>
						</div>
						<div className="flex-1">
							<span className="block flex overflow-hidden font-semibold xl:text-sm">
								<span className="line-clamp-1">
									{selectionText || `${translations.select}`}
								</span>
							</span>
							<span className="mt-1 block text-sm font-light leading-none text-neutral-400">
								{translations.bedbath}
							</span>
						</div>
						<div className="totalCount flex-end block hidden overflow-hidden font-semibold xl:text-sm">
							{selection.filter((item) => item.defaultValue > 0).length}
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
						<Popover.Panel className="absolute left-0 top-full z-10 mt-3 w-full max-w-sm space-y-5 rounded-3xl bg-white px-4 py-5 shadow-xl dark:bg-neutral-800 sm:min-w-[340px] sm:px-8 sm:py-6">
							<div className="relative flex flex-col space-y-5">
								{selection.map((item, index) => (
									<div key={item.field} className="">
										<NcInputNumber
											label={translations[item.field]}
											max={10}
											defaultValue={item.defaultValue}
											onChange={(e) => {
												const newState = selection.map((item, i) => {
													if (i === index) {
														return { ...item, defaultValue: e }
													}
													return item
												})
												setSelection(() => {
													return newState
												})
												setTotal(() => {
													return selection.filter(
														(item) => item.defaultValue > 0,
													).length
												})
												onChange && onChange(newState)
											}}
										/>
									</div>
								))}
							</div>

							{/* <div className="flex items-center justify-between bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
										<ButtonThird 
                    onClick={(e) => {
                      e.preventDefault();

                      setSelection(defaultBedBath);
                     // close();
                    }} 
                    
                    sizeClass="px-4 py-2 sm:px-5">
											Clear
										</ButtonThird>
										<ButtonPrimary
											onClick={close}
											sizeClass="px-4 py-2 sm:px-5"
										>
											Apply
										</ButtonPrimary>
									</div> */}
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

export default BedBathSelect
