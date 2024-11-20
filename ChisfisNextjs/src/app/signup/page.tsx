"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import googleSvg from "@/images/Google.svg";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { signUpUser, resetSignUpState } from '@/store/slices/signUpSlice';
import { signInUser, resetAuthState } from '@/store/slices/authSlice';

export interface PageSignUpProps {}

const loginSocials = [
  {
    name: "Continue with Google",
    provider: "google",
    icon: googleSvg,
  }
];

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading: signUpLoading, error: signUpError } = useSelector((state: RootState) => state.signUp);
  const { isLoading: authLoading, error: authError } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      await signIn("google", {
        callbackUrl: "/",
      });
      
    } catch (error) {
      console.error("SignUp error:", error);
      setError("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // First create the account
      await dispatch(signUpUser({
        accountType: formData.accountType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
      })).unwrap();

      // Then sign in
      await dispatch(signInUser({
        email: formData.email,
        password: formData.password,
      })).unwrap();

      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || "An error occurred during sign up");
    } finally {
      dispatch(resetSignUpState());
      dispatch(resetAuthState());
    }
  };

  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* SOCIAL SIGNUP BUTTONS */}
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <button
                key={index}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
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
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Account Type
              </span>
              <select
                name="accountType"
                className="mt-1 w-full rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
                onChange={handleChange}
                required
              >
                <option value="">Select account type</option>
                <option value="renter">Renter</option>
                <option value="property">Property Manager</option>
              </select>
            </label>

            {formData.accountType === "property" && (
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Company Name
                </span>
                <Input
                  type="text"
                  name="companyName"
                  className="mt-1"
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input
                type="text"
                name="firstName"
                className="mt-1"
                onChange={handleChange}
                required
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input
                type="text"
                name="lastName"
                className="mt-1"
                onChange={handleChange}
                required
              />
            </label>

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
              <span className="text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                name="password"
                className="mt-1"
                onChange={handleChange}
                required
              />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                name="confirmPassword"
                className="mt-1"
                onChange={handleChange}
                required
              />
            </label>

            <ButtonPrimary type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
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
