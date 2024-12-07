import React, { FC } from "react";
import imagePng from "@/images/hero-right-3.png";
//import HeroRealEstateSearchForm from "../(client-components)/(HeroSearchForm)/(flight-search-form)/FlightSearchForm";
import HeroRealEstateSearchForm from "../(client-components)/(HeroSearchForm)/(real-estate-search-form)/HeroRealEstateSearchForm";

import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col max-h-[400px] overflow-hidden relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-top max-h-[250px]">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-2xl md:text-5xl xl:text-4xl pt-20 !leading-[114%] ">
            Find your next place to call home
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Rated #1 in short-term or long-term stays in Punta Cana 
          </span>
          {/* <ButtonPrimary href="/listing-stay-map" sizeClass="px-5 py-4 sm:px-7">
            Start your search
          </ButtonPrimary> */}
        </div>
        <div className="flex-grow">
          <Image className="w-full" src={imagePng} alt="hero" priority />
        </div>
      </div>

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-30 w-full">
        <HeroRealEstateSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;
