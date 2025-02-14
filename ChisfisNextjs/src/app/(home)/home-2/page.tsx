import React from "react";
<<<<<<< HEAD
import SectionOurFeatures from "@/components/Sections/SectionOurFeatures";
import BackgroundSection from "@/components/Sections/BackgroundSection";
import SectionGridFeaturePlaces from "../SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/Sections/SectionHowItWork";
import SectionSubscribe from "@/components/Sections/SectionSubscribe";
=======
import SectionHero from "../../(server-components)/SectionHero"
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
>>>>>>> main
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/Sections/SectionBecomeAnAuthor";
import SectionClientSay from "@/components/SectionClientSay";
import SectionHero2ArchivePage from "../../(client-components)/SectionHero2";
//import BgGlassmorphism from "@/components/Sections/BgGlassmorphism";

function PageHome2() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      <div className="container relative space-y-5 mb-5 lg:space-y-5 lg:mb-5">
        
<<<<<<< HEAD
        <SectionHero2ArchivePage />
        <SectionGridFeaturePlaces />
=======
        <SectionHero className="pt-0 lg:pt-0 lg:pb-10" />
>>>>>>> main

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