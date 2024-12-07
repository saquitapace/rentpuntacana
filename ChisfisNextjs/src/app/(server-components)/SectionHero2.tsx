import React, { FC } from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
//import HeroRealEstateSearchForm from "../(client-components)/(HeroSearchForm)/(real-estate-search-form)/HeroRealEstateSearchForm";
export interface SectionHero2Props {
  className?: string;
  children?: React.ReactNode;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "", children }) => {
  return (
    <div className={`nc-SectionHero2 relative ${className}`}>

      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">

      <Image fill className="object-cover" src={imagePng} alt="hero" />     
      </div>
        <div className="relative inline-flex">
        <div className="w-screen right-20 md:right-2 inset-y-0 absolute bg-primary-500"></div>
          {/* py-16 sm:py-20 lg:py-24 space-y-8 sm:space-y-10 */}
          <div className="relative absolute max-w-3xl inline-flex flex-shrink-0 flex-col items-start text-white">
           
              <h2 className="min-h-[400px] pt-8 pr-8 text-pretty text-3xl md:text-5xl xl:text-6xl !leading-[100%]">
                Find Your Next <br /> Rental in  <br /> Punta Cana<br />
                <ButtonPrimary href="/listing-stay-map" className="left-20" sizeClass="mt-9 px-5 py-4 sm:px-7">
                Start your search
              </ButtonPrimary>
              </h2>      
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;
