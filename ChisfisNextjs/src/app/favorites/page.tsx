"use client";

import StayCard from "@/components/StayCard";
import Heading2 from '@/shared/Heading2'
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import React, { Fragment, useState } from "react";
import ButtonSecondary from "@/shared/ButtonSecondary";

const Favorites = () => {
  return (
    <div className={`nc-Favorites`}>
      <div className="container mt-12 mb-24 lg:mb-32">

      <Heading2 heading="Favorites" />
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DEMO_STAY_LISTINGS.filter((_, i) => i < 8).map((stay) => (
              <StayCard key={stay.id} data={stay} />
            ))}
          </div>
          <div className="flex mt-11 justify-center items-center">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

export default Favorites;