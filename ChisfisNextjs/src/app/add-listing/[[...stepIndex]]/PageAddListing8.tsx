import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";

export interface PageAddListing8Props {}

const PageAddListing8: FC<PageAddListing8Props> = () => {
  
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Price your Property</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {`Prices can vary based on the length of the stay.`}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Currency">
          <Select>
            <option value="USD">USD</option>
            <option value="RD">RD</option>
          </Select>
        </FormItem>
        <FormItem label="Short term / 3 month price ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </FormItem>
        {/* ----- */}
        <FormItem label="Standard term / 6 month price ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </FormItem>
        {/* ----- */}
        <FormItem label="Long term / 12 month price ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input className="!pl-8 !pr-10" placeholder="0.00" />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing8;
