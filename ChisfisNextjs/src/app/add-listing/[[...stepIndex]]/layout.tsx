import React from "react";
import { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { Route } from "@/routers/types";
//import listingHelper from "../listingHelper";

export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
  };
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const index = Number(params.stepIndex) || 1;
  const nextHref = (
    index < 10 ? `/add-listing/${index + 1}` : `/add-listing/${1}`
  ) as Route;
  const backtHref = (
    index > 1 ? `/add-listing/${index - 1}` : `/add-listing/${1}`
  ) as Route;
  const nextBtnText = index > 9 ? "Publish listing" : "Continue";

  return (
    <div
      className={`nc-PageAddListing1 px-3 max-w-3xl mx-auto pb-24 pt-14 sm:py-4 lg:pb-32`}
    >
      <div className="space-y-5">
          <h2 className="text-4xl font-semibold">Add New Listing</h2>
       <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 10
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
        {index != 1  && (

         <ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
        )}
          <ButtonPrimary href={nextHref}>
            {nextBtnText || "Continue"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
