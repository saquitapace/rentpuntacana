import React from "react";
import SectionOurFeatures from "@/components/Sections/SectionOurFeatures";
import BackgroundSection from "@/components/Sections/BackgroundSection";
import SectionGridFeaturePlaces from "../SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/Sections/SectionHowItWork";
import SectionSubscribe from "@/components/Sections/SectionSubscribe";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/Sections/SectionBecomeAnAuthor";
import SectionClientSay from "@/components/SectionClientSay";
import SectionHero2ArchivePage from "../../(client-components)/SectionHero2";
import BgGlassmorphism from "@/components/Sections/BgGlassmorphism";

function PageHome2() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      <div className="container relative space-y-5 mb-5 lg:space-y-5 lg:mb-5">
        
        <SectionHero2ArchivePage />
        <SectionGridFeaturePlaces />

        {/* <BgGlassmorphism/> */}
 
        <div className="relative py-10">
          <BackgroundSection />
          <SectionHowItWork />
        </div>

          <SectionOurFeatures />

        <div className="relative py-10">
          <BackgroundSection />
          <SectionGridAuthorBox boxCard="box2" />
        </div>

        <SectionBecomeAnAuthor />

        <div className="relative py-5">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionSubscribe />

      </div>
    </main>
  );
}

export default PageHome2;