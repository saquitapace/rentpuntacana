"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import HeroRealEstateSearchForm from "./(real-estate-search-form)/HeroRealEstateSearchForm";

import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";

export type SearchTab = "Stays";

export interface HeroSearchFormProps {
  className?: string;
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
}) => {

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      <StaySearchForm />
      <FlightSearchForm />
      

    </div>
  );
};

export default HeroSearchForm;
