import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Checkbox from "@/shared/Checkbox";
import FormItem from "../FormItem";

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem
          label="Choose a property type"
        >
          <Select>
            <option value=""></option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Hotel">Hotel</option>
          </Select>
        </FormItem>
        <FormItem
          label="Place name"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input placeholder="Places name (**Cannot be the Complex Name)" />
        </FormItem>
        <FormItem
          label="Rental form (Check all that apply)"
        >
        <div>
          <input type="checkbox" name="12" /><span> 12 Mos   </span>
          <input type="checkbox" name="9" /><span> 6 Mos    </span>
          <input type="checkbox" name="9" /><span> 9 Mos    </span>
          <input type="checkbox" name="1" /><span> Monthly    </span>
        </div>
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing1;
