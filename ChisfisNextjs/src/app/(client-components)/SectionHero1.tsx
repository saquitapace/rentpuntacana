'use client';

import React, { FC} from "react";
import imagePng from "@/images/hero-right-3.png";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export interface SectionHero1Props {
  className?: string;
  children?: React.ReactNode;
}

const SectionHero1: FC<SectionHero1Props> = ({ className = "", children }) => {
  
  const { translations, isLoading, error } = useSelector(
    (state: RootState) => state.translations
  );

  return (
    <div className={`nc-SectionHero1 relative ${className}`}>

      <div className="absolute inset-y-0 w-5/6 xl:w-3/4 right-0 flex-grow">
        <Image fill className="object-cover" src={imagePng} alt="hero" />     
      </div>

      <div className="relative inline-flex">
        <div className="w-screen right-20 md:right-2 inset-y-0 absolute bg-primary-500"></div>
        <div className="relative absolute min-w-[400px] inline-flex flex-shrink-0 flex-col items-start text-white">
          <div className="min-h-[400px]">
            <h2 className="pt-10 pr-8 max-w-[350px] text-2xl md:text-3xl xl:text-4xl">
              {translations.homeH2}
            </h2>
            <ButtonPrimary href="/listing-search" sizeClass="mt-10 px-5 py-4 sm:px-7">
            {translations.startYourSearch}
            </ButtonPrimary>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default SectionHero1;