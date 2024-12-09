"use client";
import React, { Fragment, FC, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ClassOfBedBath } from "./type";
import NcInputNumber from '@/components/NcInputNumber';
import { useSelector } from 'react-redux';

const defaultBedBath: ClassOfBedBath[] = [ //todo: get from options to enable translation saquita
  {
    name: "Bedrooms",
    abbreviation: "Beds",
    defaultValue : 0
  },
  {
    name: "Bathrooms",
    abbreviation: "Baths",
    defaultValue : 0
  }
];

export interface BedBathSelectProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
}

const BedBathSelect: FC<BedBathSelectProps> = ({
  onChange,
  fieldClassName = "",
}) => {
  const [selection, setSelection] = React.useState<ClassOfBedBath[]>(defaultBedBath);
  const [total, setTotal] = useState(selection.filter((item) => item.defaultValue >0).length);

  const { translations, isLoading, error } = useSelector(
    (state: RootState) => state.translations
  );
  let selectionText = "";
  let count = 0;
  if (selection && selection.length > 0) {
    selectionText = selection
      .filter((item) => item.defaultValue >0)
      .map((item) => {        
        return item.abbreviation;
      })
      .join(", ");
      count = selection.filter((item) => item.defaultValue >0).length;
  }
  
  return (
    <Popover className="flex relative flex-1">
      {({ open, close }) => (
        <>
            <Popover.Button
            className={`flex z-10 text-left w-full flex-shrink-0 [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer ${
              open ? "filter-field-focused" : ""
            }`}
              onClickCapture={() => document.querySelector("html")?.click()}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <i className="las la-bed text-2xl w-5 h-5 lg:w-7 lg:h-7"></i>
            </div>
            <div className="flex-1">
            <span className="block xl:text-sm font-semibold overflow-hidden flex">
                <span className="line-clamp-1">
                {selectionText || `${translations.select}`}
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                {translations.bedbath}
              </span>
              </div>
              <div className="hidden totalCount block xl:text-sm font-semibold overflow-hidden flex-end">{selection.filter((item) => item.defaultValue >0).length}</div>
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
            <Popover.Panel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <div className="relative flex flex-col space-y-5">
                {selection.map((item, index) => (
                    <div key={item.name} className="">
                      <NcInputNumber label="Bathrooms" max={10} defaultValue={item.defaultValue}
                        onChange={(e) => {
                        const newState = selection.map((item, i) => {
                          if (i === index) {
                            return { ...item, defaultValue: e };
                          }
                          return item;
                        });
                        setSelection(() => {
                           return newState;
                        });
                        setTotal(() => {
                          return selection.filter((item) => item.defaultValue >0).length;
                       });
                        onChange && onChange(newState);
                     }}
                    />
                    </div>
                    
                  ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default BedBathSelect;