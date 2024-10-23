"use client";

import React, { FC, useState, useEffect } from "react";
import Label from "@/components/Label";
import axios from "axios";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Checkbox from "@/shared/Checkbox";
import Textarea from "@/shared/Textarea";
import sessionState from "@/utils/sessionState";
import { checkSession } from "@/utils/checkSession";

export interface AccountPageProps {}

const AccountPage = () => {

  const user = {};

  const [formData, setFormData] = useState({
    firstName : sessionState.getFirstName(),
    lastName : sessionState.getLastName(),
    email : sessionState.getEmail(),
    phoneNumber : sessionState.getPhoneNumber(),
    about : sessionState.getAbout(),
    languages : sessionState.getLanguages(),
    companyName:sessionState.getCompanyName(),
  });

  const {
    firstName,
    companyName,
    lastName,
    email,
    phoneNumber,
    about,
    languages,
  } = formData;


  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");

  const [fieldErrors, setFieldErrors] = useState({
    firstName : "",
    lastName : "",
    email : "",
    phoneNumber : "",
    languages : "",
  });

  let languageOptions = [
    { name: 'English', defaultChecked : false },
    { name: 'Spanish', defaultChecked : false },
    { name: 'French', defaultChecked : false },
  ]

for(var x = 0; x<=languageOptions.length-1; x++){
  for (let i = 0; i < languages.length; i++) {
    if(languageOptions[x].name == (languages[i])){
      languageOptions[x].defaultChecked = true;
    } else {

    }
  }
}

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    // Clear field-specific errors on change
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    console.log(formData)
  };

  const validateForm = () => {
    const errors: any = {};
    const errorArray = [];
    let isValid = false;
          
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) { 
        if(!formData[key]){
          errors[key] = "this is a required"; 
          errorArray.push(errors)
        }
      }

      if(languages.length === 0){
        errors.languages = "at least 1 language is a required"; 
        errorArray.push(errors.languages)
      }
      
      setFieldErrors(errors);

      if(errorArray.length === 0){
        isValid = true;
      }
    } 
    return isValid;
  };

  const makeRequests = async () => { 
    //resetErrors();
    setLoading(true);

    if (validateForm()) {
      setLoading(true); // Set loading to true when starting the submission
        // Send formData to backend API using Axios
        let data = formData;
        data["user_id"] = sessionState.getUserId();
        const userId = sessionState.getUserId();
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/updateUser`, {
          data
        })
        .then((response) => {
          console.log("Response Received:");
          console.log(response);
          switch(response.status) {
            case 200 :
              console.log("Storing user to session storage");
            //  sessionStorage.setItem('user', JSON.stringify(response.data));  
            break;
            default:
              alert("check login response an unknown error code received");
          }
        }).then((response) => {
          //sessionState.init();
        }).then((response) => {
          console.log("Redirecting User to their landing page");
          //redirect();
        }).catch(function (error) {
          console.log("Error Received from Sign up entry:");
          console.log(error);
          //setGeneralError(error.response.data.message);
        });   
      
      setLoading(false);
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(validateForm()){
      makeRequests();
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* HEADING */}
      
      <h2 className="text-3xl font-semibold">Account Information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar sizeClass="w-32 h-32" />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mt-1 text-xs">Change Image</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>


        <form onSubmit={ handleUpdate } className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6" method="post">
        {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
        <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
        <div>
            <Label>Company Name</Label>
            <Input className="mt-1.5" 
              name="companyName"
              value={companyName}
              onChange={handleChange} 
            />
        </div>
          {/* ---- */}
          <div>
            <Label>First Name</Label>
            <Input className="mt-1.5"
              name="firstName"
              defaultValue={formData.firstName}
              onChange={handleChange}
            />
            {fieldErrors.firstName && (
              <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
            )}
            </div>
          {/* ---- */}
          <div>
            <Label>Last Name</Label>
            <Input className="mt-1.5" 
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
            {fieldErrors.lastName && (
                <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
            )}
          </div>
          {/* ---- */}
          <div>
            <Label>Email</Label>
            <Input className="mt-1.5" 
              name="email"
              value={email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
                <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
          </div>          
          {/* ---- */}
          <div>
            <Label>Phone number</Label>
            <Input 
            className="mt-1.5"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
             />
            {fieldErrors.phoneNumber && (
                <p className="text-red-500 text-sm">{fieldErrors.phoneNumber}</p>
            )}
          </div>
          {/* ---- */}
          <div>
          <Label>Languages</Label>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex flex-wrap flexspace-y-5 pr-5 py-6">
                {languageOptions.map((item, index) => (
                  <div key={item.name} className="px-5">
                    <Checkbox
                      name={item.name}
                      label={item.name}
                      defaultChecked= {item.defaultChecked}
                      onChange={(e) => {
                        var idx = languages.indexOf(item.name, 0);
                        
                        if(idx >=0 && e == true){
                        // do nothing item is in the array
                        }
                        
                        if(idx>=0 && e == false){
                          languages.splice(idx,1);
                          // remove from array
                        }

                        if(idx==-1 && e == true){
                          languages.push(item.name);
                        }
                      }}
                  />
                  </div>
                ))}
              </div>
          </div>
          {fieldErrors.languages && (
                <p className="text-red-500 text-sm">{fieldErrors.languages}</p>
            )}
          </div>
          <div>
            <Label>About you</Label>
            <Textarea className="mt-1.5" placeholder="ex. Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor."
            defaultValue={about} /> 
          </div>
          <div className="pt-2">         
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Loading..." : "Update info"}
            </ButtonPrimary>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;
