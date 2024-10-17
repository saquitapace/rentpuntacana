"use client";

import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MailSlurp } from 'mailslurp-client';
export interface PageForgotPasswordProps {}

const PageForgotPassword: FC<PageForgotPasswordProps> = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(""); // Reset email error
    setGeneralError(""); // Reset general error

      // Validate inputs
      let isValid = true;
      if (!email) {
        setEmailError("Email is required.");
        isValid = false;
      }
  
      if (!isValid) return; // Stop if validation fails
  
      setLoading(true);
  
      try {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`, {
          email: email,
        })
        .then(async (response) => {
          const email = response.data.email;
          const pwd = response.data.password;
          const API_KEY = "e6209418fb671c31e08b51eef5152bb840b3fc4f0500a4a9e5621e7ce7115eec";
          console.log(response.data.email);
          console.log(email, pwd);
          
          const mailslurp = new MailSlurp({ apiKey: "e6209418fb671c31e08b51eef5152bb840b3fc4f0500a4a9e5621e7ce7115eec" });
          async function createInbox() {
            // call MailSlurp createInbox endpoint
            return await axios
              .post(`https://api.mailslurp.com/createInbox?apiKey=${API_KEY}`)
              .then((res) => res.data);
          }

          await axios({
            method: "POST",
            url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
            data: {
              to: "saquitab@gmail.com",
              subject: "Password Reset Request",
              body: "We received a request to reset your password. " +
              "If you didn't make this request, please contact customer support for assistance."
              +"Otherwise, your temporary password is:" + pwd+"",
            },
          }).then((response) => {
            console.log(response);
            if(response.status=== 201){
              setGeneralError("Email Successfully Sent");
            }
          });
        }).catch(function (error) {
          console.log("error");
          console.log(error);
          setGeneralError(error.response.data.message);
        });
      } catch {
       // setGeneralError("User does not exist"); todo: remove after testing
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className={`nc-PageForgotPassword`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-5 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form onSubmit={ handleForgotPassword }
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
            {generalError && <div className="text-red-600 text-sm">{generalError}</div>} {/* General error message */}
            <ButtonPrimary type="submit"
            >Continue</ButtonPrimary>
          </form>

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

export default PageForgotPassword;
