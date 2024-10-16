"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    accountType: "property",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear field-specific errors on change
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const errors: any = {};
    const { companyName, firstName, lastName, email, password, confirmPassword, accountType } = formData;

    if (!firstName) errors.firstName = "First name is required.";
    if (accountType === "property" && !companyName) errors.companyName = "Company name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) errors.email = "Email address is required.";
    if (!password) errors.password = "Password is required.";
    if (!confirmPassword) errors.confirmPassword = "Confirm password is required.";
    if (password && confirmPassword && password !== confirmPassword) setPasswordMismatch("Password does not match Confirm Password.");
    else setPasswordMismatch("");

    setFieldErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0 && password === confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true); // Set loading to true when starting the submission
      try {
        // Send formData to backend API using Axios
        const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, formData);
        console.log("Form submitted successfully!", response);
        
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      
      setTimeout(() => {
        setLoading(false);
        router.push("/home-1" as any);  // Redirect to MainNav2
      }, 2000); 

      // Reset form after successful submission 
      setFormData({
        accountType: "property",
        companyName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const { accountType, companyName, firstName, lastName, email, password, confirmPassword } = formData;

  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign Up
        </h2>

        {passwordMismatch && (
          <div className="text-red-500 text-center mb-4">{passwordMismatch}</div>
        )}

        <div className="max-w-md mx-auto space-y-6 ">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
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
                <option value=""></option>
                <option value="renter">Renter</option>
                <option value="property">Rental Property Manager</option>
              </select>
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
          </form>

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
