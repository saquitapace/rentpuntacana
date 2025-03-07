"use client";
import { StarIcon as SolidStarIcon} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";

export interface StartRatingProps {
  className?: string;
  point?: null | number;
  reviewCount?: null | number;
}

const StartRating: FC<StartRatingProps> = ({
  className = "",
  point = null,
  reviewCount = null,
}) => {

  const { translations, isLoading, error } = useSelector(
    (state: RootState) => state.translations
  );

  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <div className="pb-[2px]">
        {point && (
          <SolidStarIcon className="w-[18px] h-[18px] text-orange-500" />
        )}
        {!point && (
          <OutlineStarIcon className="w-[18px] h-[18px] text-orange-500" />
        )}
      </div>

      <span className="font-medium ">{point}</span>

      <span className="text-neutral-500 dark:text-neutral-400">
        {reviewCount >0 && (
          "("+reviewCount+")"
        )}

        {!reviewCount && (
          <span>{translations.noReviews}</span>
        )}

      </span>
    </div>
  );
};

export default StartRating;