"use client";

import React, { FC, useState } from "react";
import Checkbox from "@/shared/Checkbox";
import i18n from "../../../utils/i18n";
import options from "../../../utils/options";
import Label from "@/components/Label";
const generalAmenitiesOptions = options.getGeneralAmenities();
const otherAmenitiesOptions = options.getOtherAmenities();
const safeAmenitiesOptions = options.getSafeAmenities();

const language = i18n.getLanguage();

export interface PageAddListing4Props {}

const PageAddListing4: FC<PageAddListing4Props> = () => {

  if(!sessionStorage.page4FormData) {
    sessionStorage.setItem("page4FormData",JSON.stringify({listingType:"",title:"", rentalLength: []}));
  }
  const page4FormData = JSON.parse(sessionStorage.getItem("page4FormData"));


  const [formData, setFormData] = useState({
    generalAmenities: page4FormData.generalAmenities || [],
    otherAmenities: page4FormData.otherAmenities || [],
    safeAmenities: page4FormData.safeAmenities || [],
  });
  
  const {
    generalAmenities,
    otherAmenities,
    safeAmenities,
  } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    //console.log(name, value);
    console.log(formData)
    formData[name] = value;
    sessionStorage.setItem("page4FormData", JSON.stringify(formData));

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData)
  };

  generalAmenitiesOptions.forEach(option => {
    option.defaultChecked = formData.generalAmenities.includes(option.field);
  });

  otherAmenitiesOptions.forEach(option => {
    option.defaultChecked = formData.otherAmenities.includes(option.field);
  });
  
  safeAmenitiesOptions.forEach(option => {
    option.defaultChecked = formData.safeAmenities.includes(option.field);
  });

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Amenities</h2>
        {/* <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Many customers have searched for accommodations based on amenities
          criteria
        </span> */}
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <div>
          <Label className="text-lg font-semibold">
            General amenities
          </Label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {generalAmenitiesOptions.map((item, index) => (
                  <div key={item.field} className="pr-5">
                    <Checkbox
                      name={item.field}
                      label={item[language]}
                      defaultChecked= {item.defaultChecked}
                      onChange={(e) => {
                        var idx = generalAmenities.indexOf(item.field, 0);
                        
                        if(idx >=0 && e == true){
                        // do nothing item is in the array
                        }
                        
                        if(idx>=0 && e == false){
                          generalAmenities.splice(idx,1);
                          // remove from array
                        }

                        if(idx==-1 && e == true){
                          generalAmenities.push(item.field);
                        }
                        formData.generalAmenities = generalAmenities;

                        console.log(formData)

                        sessionStorage.setItem("page4FormData", JSON.stringify(formData));
                        setFormData((prevData) => ({ ...prevData, [generalAmenities]: generalAmenities }));
                        console.log(JSON.parse(sessionStorage.getItem("page4FormData")));
                      }}
                    />
                  </div>
              ))}        
          </div>
        </div>

        {/* ITEM */}
        <div>
          <Label className="text-lg font-semibold">
            Other amenities
          </Label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherAmenitiesOptions.map((item, index) => (
                  <div key={item.field} className="pr-5">
                    <Checkbox
                      name={item.field}
                      label={item[language]}
                      defaultChecked= {item.defaultChecked}
                      onChange={(e) => {
                        var idx = otherAmenities.indexOf(item.field, 0);
                        
                        if(idx >=0 && e == true){
                        // do nothing item is in the array
                        }
                        
                        if(idx>=0 && e == false){
                          otherAmenities.splice(idx,1);
                          // remove from array
                        }

                        if(idx==-1 && e == true){
                          otherAmenities.push(item.field);
                        }
                        formData.otherAmenities = otherAmenities;

                        //console.log(formData)

                        sessionStorage.setItem("page4FormData", JSON.stringify(formData));
                        setFormData((prevData) => ({ ...prevData, [otherAmenities]: otherAmenities }));
                        //console.log(JSON.parse(sessionStorage.getItem("page4FormData")));
                      }}
                    />
                  </div>
              ))} 
          </div>
        </div>

        {/* ITEM */}
        <div>
          <Label className="text-lg font-semibold">
            Safe amenities
          </Label>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {safeAmenitiesOptions.map((item, index) => (
                  <div key={item.field} className="pr-5">
                    <Checkbox
                      name={item.field}
                      label={item[language]}
                      defaultChecked= {item.defaultChecked}
                      onChange={(e) => {
                        var idx = safeAmenities.indexOf(item.field, 0);
                        
                        if(idx >=0 && e == true){
                        // do nothing item is in the array
                        }
                        
                        if(idx>=0 && e == false){
                          safeAmenities.splice(idx,1);
                          // remove from array
                        }

                        if(idx==-1 && e == true){
                          safeAmenities.push(item.field);
                        }
                        formData.safeAmenities = safeAmenities;

                        //console.log(formData)

                        sessionStorage.setItem("page4FormData", JSON.stringify(formData));
                        setFormData((prevData) => ({ ...prevData, [safeAmenities]: safeAmenities }));
                        //console.log(JSON.parse(sessionStorage.getItem("page4FormData")));
                      }}
                    />
                  </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing4;
