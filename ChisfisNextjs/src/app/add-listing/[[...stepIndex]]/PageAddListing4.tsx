import React, { FC } from "react";
import Checkbox from "@/shared/Checkbox";

export interface PageAddListing4Props {}

const PageAddListing4: FC<PageAddListing4Props> = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodations based on amenities
          criteria
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            General amenities
          </label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Wifi" name="Wifi" defaultChecked />
            <Checkbox label="Cable" name="Cable" />
            <Checkbox label="TV" name="TV" defaultChecked />
            <Checkbox label="Air conditioning" name="Air conditioning" />
            <Checkbox label="Fan" name="Fan" />
            <Checkbox label="Security Guard" name="Security Guard" />
            <Checkbox label="Dryer" name="Dryer" defaultChecked />
            <Checkbox label="Washing machine" name="Washing machine" />
            <Checkbox label="Fully Furnished" name="Furnished" defaultChecked />
            <Checkbox label="Fridge" name="Fridge" />
            <Checkbox label="Dryer" name="Dryer" defaultChecked />
            <Checkbox label="Balcony" name="Balcony" defaultChecked />
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Other amenities
          </label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Dishes" name="Dishes" />
            <Checkbox label="Gas stove" name="Gas stove" />
            <Checkbox label="Dishwasher" name="Dishwasher" defaultChecked />
            <Checkbox label="Private Parking" name="Private Parking" />
            <Checkbox label="Pool" name="Pool" />
            <Checkbox label="Dining table" name="Dining table" />
          </div>
        </div>

        {/* ITEM */}
        <div>
          <label className="text-lg font-semibold" htmlFor="">
            Safe amenities
          </label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Checkbox label="Smoke Detector" name="Smoke Detector" defaultChecked />
            <Checkbox label="Fire extinguisher" name="Fire extinguisher" />
            <Checkbox label="Safe vault" name="Safe vault" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing4;
