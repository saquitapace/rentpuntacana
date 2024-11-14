import React, { Fragment,FC } from "react";
import LocationInput from "../LocationInput";
import PriceRangeInput from "./PriceRangeInput";
import PropertyTypeSelect from "./PropertyTypeSelect";
import FlightDateRangeInput from "../(flight-search-form)/FlightDateRangeInput";
import {
	Dialog,
	DialogTitle,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import ButtonThird from '@/shared/ButtonThird'

export interface RealEstateSearchFormProps {}

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({}) => {

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

  const renderForm = () => {
    return (
      <form className="w-full relative xl:mt-8 flex flex-col lg:flex-row lg:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
      {/*<form className="w-full relative xl:mt-8 flex flex-col lg:flex-row lg:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0"> */}
      {/*}  <LocationInput className="flex-[1.5]" /> */}
        <PropertyTypeSelect />
        <PriceRangeInput />
        <FlightDateRangeInput />
        
       {/*} <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}


      </form>
    );
  };

  return renderForm();
};

export default RealEstateSearchForm;
