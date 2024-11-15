"use client";

import React, { FC, useState, useEffect} from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { signUpUser, resetSignUpState } from "@/store/slices/signUpSlice";
import { redirect } from "@/utils/helpers";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";

import Cookies from "js-cookie";
import { setUserProfile } from "@/store/slices/userProfileSlice";

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

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const router = useRouter();

  //using react hook form
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpFormInputs>();

  const accountType = watch("accountType");
  const password = watch("password");

  //using redux
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, success, error } = useSelector((state: RootState) => state.signUp);

  // general errors
  const [generalError, setGeneralError] = useState<string>("");

  const resetErrors = () => {
    setGeneralError(""); // Reset general error  
  }

  const handleSignup: SubmitHandler<SignUpFormInputs> = async (data) => {  
    try {
      resetErrors();
  
      // Dispatch the signUpUser action, 
      const response = await dispatch(signUpUser(data)).unwrap();
  
      console.log("Response Received:", response);
  
      // Check the response code or process based on the response content
      if (response.status === 200) {
        console.log("Storing user to session storage");

        dispatch(setUserProfile(response.data));
        router.push( redirect( response.data.account_type ) );

        //TODO: Use JWT
        Cookies.set('authToken', response.data.user_id, { expires: 1, secure: true });

        console.log("Redirecting User to their landing page");
      } else {
        console.log("Unknown response code received during signup");
      }
    } catch (error) {
      console.log("Error Received from Signup entry:", error);
  
      //backend error message
      setGeneralError(error.response?.data?.message || "An unknown error occurred during signup.");
    }
  };

  // Reset state and redirect after successful sign-up
  useEffect(() => {
    if (success) {
      //router.push("/");
      dispatch(resetSignUpState());
    }
  }, [success, router, dispatch]);

  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>

        <div className="max-w-md mx-auto space-y-6">

        <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
            <div>
        </div>
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}

          {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
          <form onSubmit={ handleSubmit( handleSignup ) } 
          className="grid grid-cols-1 gap-6" method="post">
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

              <ButtonPrimary type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Continue"} {/* Update button text based on loading state */}
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
