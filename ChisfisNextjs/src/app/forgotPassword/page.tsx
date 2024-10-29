"use client";

import React, { FC, useState, useEffect } from "react";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { forgotPassword, sendForgotPasswordEmail } from '@/store/slices/forgotPasswordSlice';

export interface PageForgotPasswordProps {}
export interface ForgotPasswordFormInputs {
  email: string;
}


const PageForgotPassword: FC<PageForgotPasswordProps> = ({}) => {
	const router = useRouter();

	//using react hook form
	const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>();

	//using react redux
	const dispatch = useDispatch<AppDispatch>();
	const forgotPasswordState = useSelector((state: RootState) => state.forgotPassword);
	const { isLoading, error, success } = useSelector((state: RootState) => state.forgotPassword);



	const [generalError, setGeneralError] = useState("");

	const handleForgotPassword: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
		setGeneralError(""); // Reset general error
		
		try {
			// Dispatch forgot password API request
			const response = await dispatch(forgotPassword(data.email)).unwrap();

			const { email, password } = response;

			// After successful password reset, trigger mail
			await dispatch(sendForgotPasswordEmail({ email, password })).unwrap();
		} catch {
			// setGeneralError("User does not exist"); todo: remove after testing
		} finally {
			
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
					<form onSubmit={ handleSubmit( handleForgotPassword ) }
					className="grid grid-cols-1 gap-6" method="post">
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
							{ errors.email && <div className="text-red-600 text-sm">{ errors.email.message }</div> } {/* Email error message */}
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
