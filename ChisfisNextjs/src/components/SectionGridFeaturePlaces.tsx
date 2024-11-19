"use client";

import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import HeaderFilter from "./HeaderFilter";
import { usePathname } from 'next/navigation';
import StayCard from "./StayCard";
//import StayCard2 from "./StayCard2";
import TabFilters from "../app/(stay-listings)/TabFilters";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const pathname = usePathname;

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "",
  subHeading = "",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card1",
}) => {
  const renderCard = (stay: StayDataType) => {
    let CardName = StayCard;
  
    return <CardName key={stay.id} data={stay} />;
  };

  return (    
    <div className="nc-SectionGridFeaturePlaces relative">
    
      <TabFilters />

     {/*} <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      /> */}
      <div
        className={`grid gap-6 py-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {stayListings.map((stay) => renderCard(stay))}
      </div>
      <div className="flex mt-16 justify-center items-center">

      {pathname == "/" ? (
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      ) : (
        <ButtonSecondary href="/listing-stay-map" className="!leading-none">
				<div className="flex items-center justify-center">
				<span>View all</span>
				<ArrowRightIcon className="w-5 h-5 ml-3" />
				</div>
			</ButtonSecondary>
				)}

      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
