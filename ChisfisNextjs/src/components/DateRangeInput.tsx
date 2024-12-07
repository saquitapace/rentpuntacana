"use client";

import React, { Fragment, useState, useEffect } from "react";
import { FC } from "react";
import DatePicker , {registerLocale} from "react-datepicker";
import en from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { format } from 'date-fns';

import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import ClearDataButton from "../components/ClearDataButton";
import { useSelector } from 'react-redux';

export interface DateRangeInputProps {
  className?: string;
  fieldClassName?: string;
  hasButtonSubmit?: boolean;
  selectsRange?: false;
}

const DateRangeInput: FC<DateRangeInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  hasButtonSubmit = true,
  selectsRange = false
}) => {

  const [langPref,setLangPref] = useState('');
  const [locale, setLocale] = useState(langPref); // es || sp

  useEffect(() => {
    //@Ezra
    setLangPref(localStorage.getItem("langPref"));
  },[]);

 
  // localStorage.getItem("langPref")   https://codesandbox.io/p/sandbox/7j8z7kvy06?file=%2Fsrc%2Findex.js%3A11%2C3-11%2C21
  // https://date-fns.org/
  // https://stackoverflow.com/questions/76017714/date-fns-how-to-format-dates-for-multiple-languages
  switch(locale){
    case "sp":
      registerLocale("es",es);
    break;
    default:
      registerLocale("en",en);
  }
  
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const onChangeRangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const { translations, isLoading, error } = useSelector(
    (state) => state.translations
  );

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
        <CalendarIcon className=" w-4 h-4 lg:w-6 lg:h-6" />

        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-sm font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || translations.addDates }
            {selectsRange && endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {selectsRange ? "" : `${translations.availabilityDate}`}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <Popover className={`DateRangeInput flex relative ${className}`}>
        {({ open }) => (
          <>

{/* className={`flex z-10 text-left w-full flex-shrink-0 [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer ${
  open ? "text-primary-6000" : ""
			  }`} */}

            <div
              className={`flex-1 z-10 flex focus:outline-none ${
                open ? "text-primary-6000" : ""
              }`}
            >
              <Popover.Button
className={`flex z-10 text-left w-full flex-shrink-0 [ nc-hero-field-padding ] space-x-3 focus:outline-none cursor-pointer ${
  open ? "text-primary-6000" : ""
  }`}              >
                {renderInput()}

                {startDate && open && (
                  <ClearDataButton
                    onClick={() => onChangeRangeDate([null, null])}
                  />
                )}
              </Popover.Button>

              {/* BUTTON SUBMIT OF FORM */}
            {/*  {hasButtonSubmit && (
                <div className="pr-2 xl:pr-4">
                  <ButtonSubmit href="/listing-car-detail" />
                </div>
              )} */}
            </div>

{/*}
            {open && (
              <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-10 bg-white dark:bg-neutral-800"></div>
            )} */}

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
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                  {selectsRange ? (
                    <DatePicker
                      selected={startDate}
                      onChange={onChangeRangeDate}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      monthsShown={2}
                      showPopperArrow={false}
                      inline
                      renderCustomHeader={(p) => (
                        <DatePickerCustomHeaderTwoMonth {...p} />
                      )}
                      renderDayContents={(day, date) => (
                        <DatePickerCustomDay dayOfMonth={day} date={date} />
                      )}
                    />
                  ) : (
                    <DatePicker
                      selected={startDate}
                      locale={locale}
                      onChange={(date) => setStartDate(date)}
                      monthsShown={2}
                      showPopperArrow={false}
                      inline
                      renderCustomHeader={(p) => (
                        <DatePickerCustomHeaderTwoMonth {...p} />
                      )}
                      renderDayContents={(day, date) => (
                        <DatePickerCustomDay dayOfMonth={day} date={date} />
                      )}
                    />
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default DateRangeInput;
