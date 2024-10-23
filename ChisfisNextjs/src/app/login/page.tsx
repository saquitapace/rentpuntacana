"use client";

import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation"; // useRouter is causing an issue in some place when the page isnt fully rendered.
import sessionState from "../../utils/sessionState";

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  
  const router = useRouter(); 
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  // general errors
  const [generalError, setGeneralError] = useState<string>("");
  //animations
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
 
    // Clear field-specific errors on change
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // need to put this into a global component
  const redirect = () => {
    const account_type = sessionState.getAccountType();

    switch(account_type) {
      case 'renter':
        router.push("/listing-stay" as any);
        break;
      case 'property':
        router.push("/author" as any);
        break;
      default:
        router.push("/" as any);
      }
  }

  if (sessionStorage.getItem('user')){
    console.log("user is known; return/ redirect; doing this to prevent submit on refresh");
    redirect();
  } else {
    console.log("User is not logged, redirect from login page");
  }
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validateForm = () => {
      const errors: any = {};
      let isValid = false;

      if (!email) {
        errors.email = "Email address is required."; 
      }

      if (!password) {
         errors.password = "Password is required.";
      }
      
      setFieldErrors(errors);
      
      if(Object.keys(errors).length === 0){
        isValid = true;
      }
      return isValid;
    };

    const resetErrors = () => {
      setGeneralError(""); // Reset general error  
    }

    const makeRequests = async () => {
      
      resetErrors();
      setLoading(true);

      const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        email,
        password,
      })
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
        
       // var timeout = redirect();
        const myTimeout = setTimeout(redirect, 1000);
       
      }).catch(function (error) {
        console.log("Error Received from login entry:");
        console.log(error.response.data.message);
        setGeneralError(error.response.data.message);
      });
    }

    if(validateForm()){
      console.log("Form is validated proceed to post request");
      makeRequests();
    }
    setLoading(false);
  };

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign In
        </h2>
        <div className="max-w-md mx-auto space-y-6">
        {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
          {/* FORM */}
          <form onSubmit={ handleLogin }
          className="grid grid-cols-1 gap-6" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                name="email"
                type="email"
                placeholder="example@example.com"
                className="mt-1"
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
                <Link href="/forgotPassword" className="text-sm underline font-medium">
                  Forgot password?
                </Link>
              </span>
              <Input 
              name="password"
              type="password" className="mt-1" 
              value={password} 
              onChange={handleChange}
              />

              {fieldErrors.password && (
                  <p className="text-red-500 text-sm">{fieldErrors.password}</p>
              )}
            </label>
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link href="/signup" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
