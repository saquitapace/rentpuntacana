
"use client";
import React, { FC } from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import HeroRealEstateSearchForm from "./(HeroSearchForm)/(real-estate-search-form)/HeroRealEstateSearchForm";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export interface SectionHero2Props {
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({
  className = "",
}) => {

const { translations, isLoading, error } = useSelector(
  (state: RootState) => state.translations
);

  return (
    <div
      className={`nc-SectionHero2 relative ${className}`}
      data-nc-id="SectionHero2"
    >
      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <Image fill className="object-cover" src={imagePng} alt="hero" />
      </div>
      <div className="relative py-14">
        <div className="relative inline-flex">
          <div className="w-screen right-10 md:right-32 inset-y-0 absolute bg-primary-500"></div>

          <div className="relative min-w-[500px] max-w-3xl inline-flex flex-shrink-0 flex-col items-start py-16 sm:py-20 space-y-8 sm:space-y-10 text-white">
            <h2 className="font-medium text-2xl max-w-[350px] md:text-3xl xl:text-4xl pt-10">
            {translations.homeH2}
            </h2>

            <ButtonPrimary href="/listing-search" className="mt-10 px-5 py-4 sm:px-7">
            {translations.startYourSearch}
            </ButtonPrimary>
          </div>
        </div>
        <div className="hidden lg:block mt-10 w-full">
          <HeroRealEstateSearchForm />
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;
