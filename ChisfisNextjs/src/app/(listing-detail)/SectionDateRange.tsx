import React, { FC, Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

interface Props {
  className?: string;
  sDate?: any;
  eDate?: string;
}

const SectionDateRange: FC<Props> = ({ 
  className = "", 
  sDate = new Date(),
  eDate = new Date()
}) => {

  if(sDate === null) {
    sDate = new Date();
    eDate= sDate;
  }

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(sDate)
  );
  
  const [endDate, setEndDate] = useState<Date | null>(new Date(eDate));
  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderSectionCheckIndate = () => {

    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
          <h2 className="text-xl font-semibold">Availability</h2>
          {/* <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span> */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
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
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
