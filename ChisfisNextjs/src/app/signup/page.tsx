"use client";

import React, { FC, useState, useEffect} from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sessionState from "@/utils/sessionState";

export interface PageSignUpProps {}


const PageSignUp: FC<PageSignUpProps> = () => {
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    accountType: "",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const {
    accountType,
    companyName,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = formData;

  const [fieldErrors, setFieldErrors] = useState({
    accountType: "",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // general errors
  const [generalError, setGeneralError] = useState<string>("");
  //animations
  const [loading, setLoading] = useState(false);

  const [passwordMismatch, setPasswordMismatch] = useState("");

  const resetErrors = () => {
    setGeneralError(""); // Reset general error  
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
 
     // Clear field-specific errors on change
     setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  const makeRequests = async () => { 
    resetErrors();
    setLoading(true);

    if (validateForm()) {
      setLoading(true); // Set loading to true when starting the submission
        // Send formData to backend API using Axios
        const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, formData)
        .then((response) => {
          console.log("Response Received:");
          console.log(response);
          switch(response.status) {
            case 200 :
              console.log("Storing user to session storage");
              sessionStorage.setItem('user', JSON.stringify(response.data));  
            break;
            default:
              alert("check login response an unknown error code received");
          }
        }).then((response) => {
          sessionState.init();
        }).then((response) => {
          console.log("Redirecting User to their landing page");
          redirect();
        }).catch(function (error) {
          console.log("Error Received from Sign up entry:");
          console.log(error.response.data.message);
          setGeneralError(error.response.data.message);
        });   
      
      setLoading(false);
    }
  }

    const validateForm = () => {
      const errors: any = {};
      const errorArray = [];
      let isValid = false;
            
      for (const key in formData) {

        if (formData.hasOwnProperty(key)) { 
          if(!formData[key]){
            console.log("no key");
            console.log(key);
            errors[key] = "this is a required"; 
            errorArray.push(errors)
          }
        }

        if(errorArray.length === 0){
          isValid = true;
        }
        return isValid;
      }
      
      setFieldErrors(errors);
      return false;
    };

    if(validateForm()){
      console.log("Form is validated proceed to post request");
      makeRequests();
    }

  const redirect = () => {
    const account_type = sessionState.getAccountType();

    console.log("getaccounttype",sessionState.getAccountType());
    console.log(account_type);

    switch(account_type) {
      case 'renter':
        router.push("/listing-stay" as any); // Redirect to listing page
        break;
      case 'property':
        router.push("/author" as any); // Redirect to listing page
        break;
      //default:
        //router.push("/listing-stay" as any); // Redirect to listing page
      }
  }

  setLoading(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true); // Set loading to true when starting the submission
      try {
        // Send formData to backend API using Axios
        const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, formData).then((response) => {
        sessionState.init();
      }).then((response) => {
        console.log("Redirecting User to their landing page");
        redirect();
      }).catch(function (error) {
      });        
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  }
  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>

        {passwordMismatch && (
          <div className="text-red-500 text-center mb-4">{passwordMismatch}</div>
        )}

        <div className="max-w-md mx-auto space-y-6 ">
        {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Account Type
              </span>
              <select
                id="account_type"
                name="accountType"
                className="block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                value={accountType}
                onChange={handleChange}
              >
                <option value="">Choose ...</option>
                <option value="renter">Renter</option>
                <option value="property">Rental Property Manager</option>
              </select>
              {fieldErrors.accountType && (
                  <p className="text-red-500 text-sm">{fieldErrors.accountType}</p>
                )}
            </label>

            {accountType === "property" && (
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Company Name
                </span>
                <Input
                  type="text"
                  className="mt-1"
                  name="companyName"
                  value={companyName}
                  onChange={handleChange}
                />
                {fieldErrors.companyName && (
                  <p className="text-red-500 text-sm">{fieldErrors.companyName}</p>
                )}
              </label>
            )}

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                type="text"
                className="mt-1"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
              {fieldErrors.firstName && (
                <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
              )}
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                type="text"
                className="mt-1"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
              {fieldErrors.lastName && (
                <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
              )}
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm">{fieldErrors.email}</p>
              )}
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {fieldErrors.password && (
                <p className="text-red-500 text-sm">{fieldErrors.password}</p>
              )}
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-sm">{fieldErrors.confirmPassword}</p>
              )}
            </label>

            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Loading..." : "Continue"} {/* Update button text based on loading state */}
            </ButtonPrimary>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
