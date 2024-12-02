"use client";
import React, { Fragment, FC, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import Checkbox from "@/shared/Checkbox";
import { ClassOfOptions } from "./type";
import options from '@/utils/options';
import translations2 from '@/utils/translation2';

const defaultPropertyType: ClassOfOptions[] = (options.getGeneralAmenities().concat(options.getOtherAmenities().concat(options.getSafeAmenities().concat(options.getHouseRulesAmenities()))));
//console.log(defaultPropertyType);

export interface PropertyTypeSelectProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
}

const PropertyTypeSelect: FC<PropertyTypeSelectProps> = ({
  onChange,
  fieldClassName = "",
}) => {
  const [typeOfProperty, setTypeOfProperty] =
    React.useState<ClassOfOptions[]>(defaultPropertyType);
    const x = translations2.get();
    const[t,setT] = useState(x);  
    const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
    const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
    const langPref = localStorage.getItem("langPref"); //todo: saquita move to useEffect to  error from terminal.

    // const closeModalMoreFilter = () => setisOpenMoreFilter(false); //todo: move modal code here when doing modal. saquita
    // const openModalMoreFilter = () => setisOpenMoreFilter(true);

  let typeOfPropertyText = "";
  if (typeOfProperty && typeOfProperty.length > 0) {
    typeOfPropertyText = typeOfProperty
      .filter((item) => item.checked)
      .map((item) => {
        return item.en;
      })
      .join(", ");
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
              <span className="block xl:text-sm font-semibold overflow-hidden">
                <span className="line-clamp-1">
                  {typeOfPropertyText || `${t.select}`}
                </span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                {t.moreFilters}
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

            <Popover.Panel className="absolute left-1/2 z-20 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
								<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900
								">
								<div className="flex-grow overflow-y-auto">
										<div className="divide-y divide-neutral-200 px-10 dark:divide-neutral-800">
											<div className="py-7">

												<h3 className="text-l font-medium">{t.general} {t.space} {t.amenities}</h3>
												<div className="relative">
                        <div className="flex flex-wrap">

                          {typeOfProperty.filter((item) => item.category =="general_amenities").map((item, index) => (
                            <div key={item.field} className="mt-4 w-1/3">
                              <Checkbox
                                name={item.field}
                                label={item[langPref]}
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
											</div>
											<div className="py-7">
												<h3 className="text-l font-medium">{t.other} {t.space} {t.amenities}</h3>
												<div className="relative">
                        <div className="flex flex-wrap">
													{/* {renderMoreFilterItem(moreFilter2)} */}

                          {typeOfProperty.filter((item) => item.category =="other_amenities").map((item, index) => (
                            <div key={item.field} className="mt-4 w-1/3">
                              <Checkbox
                                name={item.field}
                                label={item[langPref]}
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
											</div>
											<div className="py-7">
												<h3 className="text-l font-medium">{t.safe} {t.space} {t.amenities}</h3>
												<div className="relative">
                        <div className="flex flex-wrap">

                          {typeOfProperty.filter((item) => item.category =="safe_amenities").map((item, index) => (
                            <div key={item.field} className="mt-4 w-1/3">
                              <Checkbox
                                name={item.field}
                                label={item[langPref]}
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
											</div>
											<div className="py-7">
												<h3 className="text-l font-medium">{t.rules}</h3>
												<div className="relative">
                        <div className="flex flex-wrap">

                          {typeOfProperty.filter((item) => item.category =="house_options").map((item, index) => (
                            <div key={item.field} className="mt-4 w-1/3">
                              <Checkbox
                                name={item.field}
                                label={item[langPref]}
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
											</div>
										</div>
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