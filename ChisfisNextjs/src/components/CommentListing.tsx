import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";

import React, { FC } from "react";
import Avatar from "@/shared/Avatar";

interface CommentListingDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface CommentListingProps {
  className?: string;
  //data?: CommentListingDataType;
  hasListingTitle?: boolean;
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

const DEMO_DATA: CommentListingDataType = {
  name: "Cody Fisher",
  date: "May 20, 2021",
  comment:
    "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
  starPoint: 5,
};

const CommentListing: FC<CommentListingProps> = ({
  className = "",
 // data = DEMO_DATA,
  hasListingTitle,
  name,
  avatar,
  date,
  comment,
  starPoint,

}) => {
  return (
    <div
      className={`nc-CommentListing flex space-x-4 ${className}`}
      data-nc-id="CommentListing"
    >
      <div className="pt-0.5">
        <Avatar
          sizeClass="h-10 w-10 text-lg"
          radius="rounded-full"
          userName={name}
          imgUrl={avatar}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between space-x-3">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{name}</span>
              {hasListingTitle && (
                <>
                  <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                    {` review in `}
                  </span>
                  <a href="/">The Lounge & Bar</a>
                </>
              )}
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {date}
            </span>
          </div>
          <div className="flex text-yellow-500">

            {!!starPoint || starPoint <=0 && (
            <><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /></>           
            )}

            {starPoint == 1 && (
            <><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /></>           
            )}

            {starPoint == 2 && (
            <><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /></>           
            )}

            {starPoint == 3 && (
            <><OutlineStarIcon className="w-4 h-4" /><OutlineStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /></>           
            )}
            {starPoint == 4 && (
            <><OutlineStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /></>           
            )}
            {starPoint == 5 && (
            <><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /><SolidStarIcon className="w-4 h-4" /></>           
            )}
          </div>

        </div>
        <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
          {comment}
        </span>
      </div>
    </div>
  );
};

export default CommentListing;
