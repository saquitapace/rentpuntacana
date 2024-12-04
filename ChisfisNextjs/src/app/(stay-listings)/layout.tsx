// import BackgroundSection from "@/components/BackgroundSection";
// import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
// import SectionSubscribe2 from "@/components/SectionSubscribe2";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative`}>
      {children}


      {/* saquita - remove all below  */}
      {/* <div className="container overflow-hidden hidden">
        <SectionSubscribe2 className="py-24 lg:py-28" />        
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div> */}
    </div>
  );
};

export default Layout;
