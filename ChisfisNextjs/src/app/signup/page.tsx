"use client";

import React, { FC, useState, useEffect} from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import sessionState from "@/utils/sessionState";
import { useForm, SubmitHandler } from "react-hook-form";

export interface PageSignUpProps {}
export interface SignUpFormInputs {
  accountType: string,
  companyName?: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
}


const PageSignUp: FC<PageSignUpProps> = () => {
  
  const router = useRouter();

  //using react hook form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormInputs>();

  const accountType = watch("accountType");
  const password = watch("password");

  // general errors
  const [generalError, setGeneralError] = useState<string>("");
  //animations
  const [loading, setLoading] = useState(false);

  const resetErrors = () => {
    setGeneralError(""); // Reset general error  
  }

  const handleSignup: SubmitHandler<SignUpFormInputs> = async (data) => {  
    const makeRequests = async () => { 
      resetErrors();
      setLoading(true); // Set loading to true when starting the submission

      // Send formData to backend API using Axios
      const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, data)
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

    makeRequests();

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
  }
  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
          <form onSubmit={ handleSubmit( handleSignup ) } className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6" method="post">
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Account Type
                </span>
                <select
                  id="account_type"
                  name="accountType"
                  className="block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                  { ...register("accountType", { required: "Account Type is required" }) }
                >
                  <option value="">Choose ...</option>
                  <option value="renter">Renter</option>
                  <option value="property">Rental Property Manager</option>
                </select>
                { errors.accountType && <div className="text-red-600 text-sm">{ errors.accountType.message }</div> } 
              </label>

              { accountType === "property" && (
                <label className="block">
                  <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                    Company Name
                  </span>
                  <Input
                    type="text"
                    className="mt-1"
                    { ...register("companyName", { required: "Company Name is required" }) }
                  />
                  { errors.companyName && <div className="text-red-600 text-sm">{ errors.companyName.message }</div> } 
                </label>
              )}

              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input
                  type="text"
                  className="mt-1"
                  { ...register("firstName", { required: "First Name is required" }) }
                />
                { errors.firstName && <div className="text-red-600 text-sm">{ errors.firstName.message }</div> }
              </label>

              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input
                  type="text"
                  className="mt-1"
                  name="lastName"
                  { ...register("lastName", { required: "Last Name is required" }) }
                />
                { errors.lastName && <div className="text-red-600 text-sm">{ errors.lastName.message }</div> }
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <Input
                  type="email"
                  placeholder="example@example.com"
                  className="mt-1"
                  { ...register("email", { required: "Email is required" }) }
              />
                { errors.email && <div className="text-red-600 text-sm">{ errors.email.message }</div> }
              </label>

              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  { ...register("password", { required: "Password is required" }) } 
                  />
                  { errors.password && <div className="text-red-600 text-sm">{ errors.password.message }</div> }
              </label>

              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </span>
                <Input
                  type="password"
                  className="mt-1"
                  { ...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: value =>
                      value === password || "Passwords do not match" // Validate if confirmPassword matches password
                  }) } 
                  />
                  { errors.confirmPassword && <div className="text-red-600 text-sm">{ errors.confirmPassword.message }</div> }
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
