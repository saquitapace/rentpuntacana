"use client";

import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation"; // useRouter is causing an issue in some place when the page isnt fully rendered.
import sessionState from "../../utils/sessionState";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/LoginSlice';
import { setUserProfile } from '@/store/slices/userProfileSlice';
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";

export interface PageLoginProps {}
export interface LoginFormInputs {
  email: string;
  password: string;
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

const PageLogin: FC<PageLoginProps> = ({}) => {
  const router = useRouter();

  //using react hook form
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.login);
  
  const [generalError, setGeneralError] = useState("");

	// need to put this into a global component
	const redirect = (account_type: 'renter' | 'property' | 'default') => {
    try {
      switch (account_type) {
        case 'renter':
          return router.push("/listing-stay" as const);
        case 'property':
          return router.push("/author" as const);
        default:
          return router.push("/" as const);
      }
    } catch (error) {
      console.error("Failed to redirect:", error);
    }
  };

  /* if (sessionStorage.getItem('user')){
    console.log("user is known; return/ redirect; doing this to prevent submit on refresh");
    redirect();
  } else {
    console.log("User is not logged, redirect from login page");
  } */
 
	const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
      setGeneralError('');
      dispatch(loginStart());

			const makeRequests = async () => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, data)
        .then((response) => {
          console.log("Response Received:");
          console.log(response.data.account_type);

          switch(response.status) {
            case 200 :
              dispatch(loginSuccess(data));

              dispatch(setUserProfile(response.data));
              redirect( response.data.account_type ); 

              //TODO: Use JWT

            break;
            default:
              alert("check login response an unknown error code received");
          }
        }).catch(function (error) {
          console.log("Error Received from login entry:");
          console.log(error.response.data.message);
          setGeneralError(error.response.data.message);

          dispatch(loginFailure("Failed to login. Please try again."));
        });
		}
		
		makeRequests();
	};

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign In
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
          {/* FORM */}
          <form onSubmit={ handleSubmit( handleLogin ) }
          className="grid grid-cols-1 gap-6" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                { ...register("email", { required: "Email is required" }) }
              />
                { errors.email && <div className="text-red-600 text-sm">{ errors.email.message }</div> } {/* Email error message */}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgotPassword" className="text-sm underline font-medium">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" { ...register("password", { required: "Password is required" }) } 
              />
              { errors.password && <div className="text-red-600 text-sm">{ errors.password.message }</div> } {/* Password error message */}
            </label>
            <ButtonPrimary type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Continue"}
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