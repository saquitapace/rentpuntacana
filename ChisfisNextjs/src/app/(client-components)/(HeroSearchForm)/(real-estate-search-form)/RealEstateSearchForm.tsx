import React, { FC } from "react";
import LocationInput from "./LocationInput";
import PriceRangeInput from "./PriceRangeInput";
import PropertyTypeSelect from "./PropertyTypeSelect";

export interface RealEstateSearchFormProps {}

const RealEstateSearchForm: FC<RealEstateSearchFormProps> = ({}) => {
  const renderForm = () => {
    return (
      <form className="relative mt-8 flex w-full rounded-full bg-white shadow-xl dark:bg-neutral-800 dark:shadow-2xl h-20">
        <LocationInput className="flex-[1.5]"/>
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <PropertyTypeSelect />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <PriceRangeInput />
      </form>
    );
  };

  return renderForm();
};

export default RealEstateSearchForm;
