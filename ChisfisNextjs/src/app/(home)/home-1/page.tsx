import React from "react";
import SectionHero from "../../../app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionVideos from "@/components/SectionVideos";
import SectionClientSay from "@/components/SectionClientSay";

function PageHome1() {
  return (
    <main className="nc-PageHome1 relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-0 lg:pt-0 lg:pb-0" />
       {/*<SectionHero className="pt-10 lg:pt-16 lg:pb-16" /> */}

        {/* SECTION 1 */}

        <SectionGridFeaturePlaces cardType="card2" />

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
{/*
       

        <SectionVideos /> */}

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
