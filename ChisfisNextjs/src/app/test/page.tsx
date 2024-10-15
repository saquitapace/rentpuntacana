"use client";

import React, { FC, useState  } from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try 
    {
      const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email,
        password,
      });
      
      if (response.status === 200) {
        console.log( response.data );
      }
    } 
    catch ( err ) 
    {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data?.message || "An error occurred");
      } else {
        console.log("An unknown error occurred");
      }
    }
  };


  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign In
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form onSubmit={ handleSubmit } className="grid grid-cols-1 gap-6" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/login" className="text-sm underline font-medium">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <ButtonPrimary type="submit"
            >Continue</ButtonPrimary>
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
