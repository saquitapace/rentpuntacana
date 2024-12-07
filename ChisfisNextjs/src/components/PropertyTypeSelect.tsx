"use client";
import React, { Fragment, FC, useState, useEffect} from "react";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";
//import { ClassOfProperties } from "../components/type";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useSelector } from 'react-redux';
import options from "@/utils/options";

const defaultPropertyType = options.getListingTypes();

export interface PropertyTypeSelectProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
  onChange,
  fieldClassName = "",
}) => {
  
  const [langPref,setLangPref] = useState('');
  const [typeOfProperty, setTypeOfProperty] = useState(defaultPropertyType);
  const { translations, isLoading, error } = useSelector(
    (state) => state.translations
  );

  useEffect(() => {
    //@Ezra
    setLangPref(localStorage.getItem("langPref")); 
    // note: all localstorage checks have to be in useEffect to eliminate terminal errors;
    // need app defaults to be accesible in redux (options, translations, langpref, currencpref for now)
  },[]);
  
  let typeOfPropertyText = "";
  if (typeOfProperty && typeOfProperty.length > 0) {
    typeOfPropertyText = typeOfProperty
      .filter((item) => item.checked)
      .map((item) => {
        return item[langPref];
      })
      .join(", ");
  }
  return (
    <Popover className="flex relative flex-1">
      {({ open, close }) => (
        <>
            <Popover.Button
            className={`flex z-10 text-left w-full flex-shrink-0 [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer ${
              open ? "text-primary-6000" : ""
            }`}
            onClickCapture={() => document.querySelector("html")?.click()}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <HomeIcon className="w-5 h-5 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-sm font-semibold overflow-hidden">
                <span className="line-clamp-1">
                  {typeOfPropertyText || `${translations.select}`}
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
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
            <Popover.Panel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
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
                              return { ...item, checked: e };
                            }
                            return item;
                          });
                          setTypeOfProperty(() => {
                            return newState;
                          });
                          onChange && onChange(newState);
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
  );
};

export default PropertyTypeSelect;