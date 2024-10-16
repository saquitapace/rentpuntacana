//import BackgroundSection from "@/components/BackgroundSection";
import BgGlassmorphism from "@/components/BgGlassmorphism";
//import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
//import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
//import SectionSubscribe2 from "@/components/SectionSubscribe2";
import React, { ReactNode } from "react";
//import SectionHeroArchivePage from "../(server-components)/SectionHeroArchivePage";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      {/* SECTION HERO */}
     
      {children}
    </div>
  );
};

export default Layout;
