import React from "react";
import SectionHero from "../../../app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeatureProperty from "../SectionGridFeatureProperty";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionClientSay from "@/components/SectionClientSay";
import Heading from "@/shared/Heading";

function PageHome1() {
  return (
    <main className="nc-PageHome1 relative overflow-hidden">

      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-10 lg:mb-28">
      {/* <div className="container relative space-y-15 mb-15 lg:space-y-15 lg:mb-28"> */}

        <SectionHero className="pt-0 lg:pt-0 lg:pb-20" />
       {/*<SectionHero className="pt-10 lg:pt-16 lg:pb-16" /> */}

        <div className="relative">
          <Heading
          className=""
          desc="Featured Listings" />
        </div>

        <div className="relative py-6">
          <BackgroundSection />
          <SectionGridFeatureProperty />
        </div>

        <SectionHowItWork />

        <SectionOurFeatures />

        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>

        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> 

        <SectionSubscribe2 />

      </div>
    </main>
  );
}

export default PageHome1;
