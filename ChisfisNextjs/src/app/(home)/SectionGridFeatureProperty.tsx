import React, { FC, ReactNode } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import PropertyCardH from "@/components/PropertyCardH";
import HeaderFilter from "@/components/HeaderFilter";
import Heading2 from "@/shared/Heading2";
import Heading from "@/shared/Heading";
import TabFilters from "../(real-estate-listings)/TabFilters";
// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);
//
export interface SectionGridFeaturePropertyProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  className?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  className = "",
  heading = "Featured Properties",
  subHeading = "text goes here",
  headingIsCenter,
  tabs = [],
}) => {
  const renderCard = (stay: StayDataType, index: number) => {
    return <PropertyCardH key={index} className="h-full" data={stay} />;
  };

  return (
    // <div className="nc-SectionGridFeatureProperty relative">
    //   <HeaderFilter
    //     tabActive={"New York"}
    //     subHeading={subHeading}
    //     tabs={tabs}
    //     heading={heading}
    //   />
    //   <div
    //     className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
    //   >
    //     {stayListings.map(renderCard)}
    //   </div>
    // </div>

<div className={`nc-SectionGridFilterCard ${className}`}>

{/* <div className="mb-2 lg:mb-5">
<Heading
  className=""
  subHeading=""
/>
</div> */}

<div className="mb-2 lg:mb-5">

  <TabFilters />
</div>

{/* <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2"> */}
  {/* {stayListings.map((stay) => (
    <PropertyCardH key={stay.id} data={stay} />
  ))} */}

<div
   className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
    >
        {stayListings.map(renderCard)}
     </div>

{/* </div> */}


<div className="flex mt-16 justify-center items-center">
  {/* <Pagination /> */}
</div>
</div>






  );
};





{/*  */}


export default SectionGridFeatureProperty;
