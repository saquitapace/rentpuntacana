"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserEmail } from "@/store/slices/userProfileSlice";

interface PasswordUpdateFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}

const AccountPass: React.FC = () => {
  const email = useSelector(getUserEmail);
  console.log("user email: ",email)
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordUpdateFormInputs>();

  const onSubmit: SubmitHandler<PasswordUpdateFormInputs> = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/updatePassword`, {
        email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      if (response.data.success) {
        setSuccessMessage("Password has been successfully updated.");

        try {
          const API_KEY = "e6209418fb671c31e08b51eef5152bb840b3fc4f0500a4a9e5621e7ce7115eec";

          await axios.post(`https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`, {
            to: "saquitab@gmail.com", 
            subject: "Password Changed Successfully",
            body: "Your password has been changed successfully. If you did not make this change, please contact support immediately.",
          });
          console.log("Confirmation email sent successfully.");
          
        } catch (emailError: any) {
          console.error("Error sending confirmation email:", emailError);
          
        }

      }
       
    
    } catch (error) {
      if(error.response ){
      if(error.response.status === 400)
      {
        setError("currentPassword", {
          type: "manual",
          message: "Current password is incorrect.",
        });
      }

      else if(error.response.status === 500){
        console.error("Erdating password:", error);
       
      }

      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="max-w-xl space-y-6">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
          {errors.currentPassword && (
              <p className="text-red-500 mb-3">{errors.currentPassword.message}</p>
            )}
            <Label>Current password</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...register("currentPassword", { required: "Current password is required." })}
            />
            
          </div>
          <div>
            <Label>New password</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...register("newPassword", { required: "New password is required." })}
            />
            {errors.newPassword && (
              <p className="text-red-500">{errors.newPassword.message}</p>
            )}
          </div>
          <div>
            <Label>Confirm password</Label>
            <Input
              type="password"
              className="mt-1.5"
              {...register("confirmPassword", { required: "Confirm password is required." })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="pt-2">
            <ButtonPrimary type="submit">Update password</ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPass;