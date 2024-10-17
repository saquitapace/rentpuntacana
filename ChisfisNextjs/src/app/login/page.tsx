"use client";

import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import  sessionState from "../../utils/sessionState";
export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const redirect = () => {
      const account_type = sessionState.getAccountType();

      switch(account_type) {
        case 'renter':
          router.push("/listing-stay" as any); // Redirect to listing page
          break;
        case 'property':
          router.push("/author" as any); // Redirect to listing page
          break;
        default:
          router.push("/listing-stay" as any); // Redirect to listing page
        }
    }
    
    if (sessionStorage.getItem('user')){
      console.log("user is known; return/ redirect; doing this to prevent submit on refresh");
      redirect()
      return;
    } else {
      console.log("user is not known");
    }

    setEmailError(""); // Reset email error
    setPasswordError(""); // Reset password error
    setGeneralError(""); // Reset general error

      // Validate inputs
      let isValid = true;
      if (!email) {
        setEmailError("Email is required.");
        isValid = false;
      }
      if (!password) {
        setPasswordError("Password is required.");
        isValid = false;
      }
  
      if (!isValid) return; // Stop if validation fails
  
      setLoading(true);
  
      try {
        const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          switch(response.status) {
            case 200 :
              console.log("Results of post response", response);
              sessionStorage.setItem('user', JSON.stringify(response.data));  
            break;
            default:
              console.log(response.status)
          }
          console.log(response);
         
        }).then((response) => {
          sessionState.init();
        }).then((response) => {
          console.log("redirecting");
          redirect();
        }).catch(function (error) {
          console.log("error");
          console.log(error.response.data.message);
          setGeneralError(error.response.data.message);
        });
      } catch {
       // setGeneralError("User does not exist"); todo: remove after testing
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-3 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign In
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form onSubmit={ handleLogin }
          className="grid grid-cols-1 gap-6" method="post">
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
                {emailError && <div className="text-red-600 text-sm">{emailError}</div>} {/* Email error message */}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgotPassword" className="text-sm underline font-medium">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {passwordError && <div className="text-red-600 text-sm">{passwordError}</div>} {/* Password error message */}
            </label>
            {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
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
