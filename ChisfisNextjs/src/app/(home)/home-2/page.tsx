import React from "react";
import SectionHero from "../../(server-components)/SectionHero"
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionClientSay from "@/components/SectionClientSay";

function PageHome2() {
  return (
    <main className="nc-PageHome relative overflow-hidden">
      <div className="container relative space-y-5 mb-5 lg:space-y-5 lg:mb-5">
        
        <SectionHero className="pt-0 lg:pt-0 lg:pb-10" />

        <SectionGridFeaturePlaces cardType="card1" />
        
        <div className="relative py-5">
          <BackgroundSection />
          <SectionHowItWork />
          </div>

          <SectionOurFeatures />

        <div className="relative py-5">
          <BackgroundSection />
          <SectionGridAuthorBox boxCard="box2" />
        </div>

        <SectionBecomeAnAuthor />

        <div className="relative py-5">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        <SectionSubscribe2 />

      </div>
    </main>
  );
}

export default PageHome2;