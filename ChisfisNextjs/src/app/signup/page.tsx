import React, { FC } from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";

export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Register
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="./login.php" method="post">

          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Account Type
            </span>
            <select id="account_type" name="account_type" className="block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`">
              <option value="property">Rental Property</option>
              <option value="renter">Renter</option>
            </select>
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Company Name  (shoudld be initially hidden and shown when Rental Property is selected)
            </span>
            <Input type="text" className="mt-1" />
          </label>

          <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input type="text" className="mt-1" />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Last Name
              </span>
              <Input type="text" className="mt-1" />
            </label>

            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input type="password" className="mt-1" />
            </label>

            <ButtonPrimary type="submit">Continue</ButtonPrimary>
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
