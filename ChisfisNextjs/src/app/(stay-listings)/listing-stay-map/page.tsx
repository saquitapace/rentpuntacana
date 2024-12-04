import React, { FC } from "react";
// import SectionGridHasMap from "../SectionGridHasMap";
import SectionGridFilterCard from "../SectionGridFilterCard";


export interface ListingStayMapPageProps {}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({}) => {
  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      {/* <SectionGridHasMap /> */}
      <SectionGridFilterCard />

    </div>
  );
};

export default ListingStayMapPage;
