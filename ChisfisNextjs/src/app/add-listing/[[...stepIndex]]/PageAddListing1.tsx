"use client";

import React, { FC, useState } from "react";
import i18n from "../../../utils/i18n";
import options from "../../../utils/options";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import Checkbox from "@/shared/Checkbox";
import FormItem from "../FormItem";
//import addListingFormData from "../../../utils/addListingFormData";

// 1 import form to track all changes.

//options for form
//const listing_types = options.getListingTypes(); // not used yet
const rental_length = options.getRentalLength();
const language =  i18n.getLanguage();
const strings = i18n.getStrings();

const page1FormData = JSON.parse(sessionStorage.getItem("page1FormData"))

export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {

  if(!sessionStorage.page1FormData) {
    sessionStorage.setItem("page1FormData",JSON.stringify({listingType:"",title:"", rentalLength: []}));
  }
  const page1FormData = JSON.parse(sessionStorage.getItem("page1FormData"))

  const [formData, setFormData] = useState({
    listingType: page1FormData.listingType,
    title:page1FormData.title,
    rentalLength: page1FormData.rentalLength
  });
  
  const {
    listingType,
    title,
    rentalLength,
  } = formData;


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    //console.log(name, value);
    console.log(formData)
    formData[name] = value;
    sessionStorage.setItem("page1FormData", JSON.stringify(formData));

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData)
  };

  let rentalTermOptions = rental_length;

  for(var x = 0; x<=rentalTermOptions.length-1; x++){
    for (let i = 0; i < rentalLength.length; i++) {
      if(rentalTermOptions[x].field == (rentalLength[i])){
        rentalTermOptions[x].defaultChecked = true;
      } else {
  
      }
    }
  }
  //console.log(sessionStorage.getItem("page1FormData"));

  return (
    <>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem
          label="Choose a listing type"
        >
          <Select 
           name="listingType"
           value={listingType}
           onChange={handleChange}>
            <option value=""></option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Hotel">Hotel</option>
          </Select>
        </FormItem>
        <FormItem
          label="Listing Title"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input 
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Listing Title (**Cannot be the Property Name)" />
        </FormItem>
        
        <FormItem
          label="Rental length (Check all that apply)">
          <div className="flex flex-wrap">
                {rentalTermOptions.map((item, index) => (
                  <div key={item.field} className="pr-5">
                    <Checkbox
                      name={item.field}
                      label={item[language]}
                      defaultChecked= {item.defaultChecked}
                      onChange={(e) => {
                        var idx = rentalLength.indexOf(item.field, 0);
                        
                        if(idx >=0 && e == true){
                        // do nothing item is in the array
                        }
                        
                        if(idx>=0 && e == false){
                          rentalLength.splice(idx,1);
                          // remove from array
                        }

                        if(idx==-1 && e == true){
                          rentalLength.push(item.field);
                        }
                        //formData.rentalLength = rentalLength;
                        //console.log(formData)

                        sessionStorage.setItem("page1FormData", JSON.stringify(formData));
                        setFormData((prevData) => ({ ...prevData, [rentalLength]: rentalLength }));
                        console.log(JSON.parse(sessionStorage.getItem("page1FormData")));

                      }}
                    />
                  </div>
                ))}
              </div>
        </FormItem>
      </div>
    </>
  );
};

export default PageAddListing1;
