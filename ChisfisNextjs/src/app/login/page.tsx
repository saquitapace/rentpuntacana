"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import facebookSvg from "@/images/Facebook.svg";
import googleSvg from "@/images/Google.svg";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { signInUser, resetAuthState } from '@/store/slices/authSlice';
import { fetchUserProfile, setUserProfile } from '@/store/slices/userProfileSlice';
import { redirect } from "@/utils/helpers";

export interface PageLoginProps {}

const loginSocials = [
  {
    name: "Continue with Google",
    provider: "google",
    icon: googleSvg,
  },
  {
    name: "Continue with Facebook",
    provider: "facebook",
    icon: facebookSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: reduxLoading, error: authError } = useSelector((state: RootState) => state.auth);
  
  // Local state for form handling
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      dispatch(resetAuthState());
      setLocalLoading(true);
      setLocalError("");
      
      await signIn(provider, {
        callbackUrl: "/",
      });
      
    } catch (error) {
      console.error("Login error:", error);
      setLocalError("An error occurred during login");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLocalError("");
      
      const result = await dispatch(signInUser({
        email: formData.email,
        password: formData.password,
      })).unwrap();

      if (result?.ok) {
        const response = await dispatch(fetchUserProfile()).unwrap();
        dispatch(setUserProfile(response));
        router.push( redirect( response.accountType ) );
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setLocalError(error.message || "An error occurred during login");
    } finally {
      dispatch(resetAuthState());
    }
  };

  // Update the button disabled state to use both loading states
  const isSubmitting = localLoading || reduxLoading;

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] text-neutral-900 dark:text-neutral-100 justify-center">
          Sign In
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* SOCIAL LOGIN BUTTONS */}
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <button
                key={index}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                onClick={() => handleSocialLogin(item.provider)}
                disabled={isSubmitting}
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </button>
            ))}
          </div>

          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>

          {/* FORM */}
          {(authError || localError) && (
            <div className="text-red-500 text-sm text-center">
              {authError || localError}
            </div>
          )}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={handleChange}
                required
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgotPassword" className="text-sm underline">
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                onChange={handleChange}
                required
              />
            </label>
            <ButtonPrimary type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Continue"}
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