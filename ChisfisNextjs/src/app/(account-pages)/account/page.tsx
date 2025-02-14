"use client";

import React, { useState, useEffect } from "react";
import Label from "@/components/FormElements/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import PhoneNumberInput from "@/components/PhoneNumberInput";

import { 
  setUserProfile, 
  setAvatar, 
  updateUserProfile,
  getUserId,
  getUserFullName,
  getUserLoading,
  getUserAbout,
  getUserCreatedAt,
  getUserAvatar,
  fetchUserProfile
} from '@/store/slices/userProfileSlice';
import { useSession } from "next-auth/react";

export interface AccountFormInputs {
  accountType?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  about?: string;
  languages: string[];
  companyName?: string;
  address?: string;
}

const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, update: updateSession } = useSession();
  const userProfile = useSelector((state: RootState) => state.userProfile);

  console.log(userProfile);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors }
  } = useForm<AccountFormInputs>({
    defaultValues: {
      firstName: userProfile.firstName || '',
      lastName: userProfile.lastName || '',
      email: userProfile.email || '',
      phoneNumber: userProfile.phoneNumber || '',
      about: userProfile.about || '',
      languages: userProfile.languages || ['English'],
      companyName: userProfile.companyName || '',
      address: userProfile.address || '',
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const languageOptions = [
    { name: 'English', defaultChecked: true },
    { name: 'Spanish', defaultChecked: false },
    { name: 'French', defaultChecked: false },
  ];

  // Set initial form values when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setValue('companyName', userProfile.companyName || '');
      setValue('firstName', userProfile.firstName || '');
      setValue('lastName', userProfile.lastName || '');
      setValue('phoneNumber', userProfile.phoneNumber || '');
      setValue('about', userProfile.about || '');
      setValue('languages', userProfile.languages || ['English']);
      setValue('address', userProfile.address || '');
    }
  }, [userProfile, setValue]);

  const onSubmit = async (data: AccountFormInputs) => {
    try {
      setIsLoading(true);
      setError('');
      setNotification({ type: null, message: '' });

      // Update the profile
      const result = await dispatch(updateUserProfile(data)).unwrap();
      
      // Fetch the updated profile to ensure Redux state is in sync
      await dispatch(fetchUserProfile()).unwrap();

      setNotification({
        type: 'success',
        message: 'Profile updated successfully'
      });

      // Update session if needed
      if (session?.user) {
        await updateSession({
          ...session,
          user: {
            ...session.user,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          }
        });
      }

    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      setNotification({
        type: 'error',
        message: 'Failed to update profile'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileName = `UserProfile_${userProfile.userId}.png`;
      const filePath = `/images/avatars/${fileName}`;
      
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('filePath', filePath);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/avatar/update`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setAvatar(data.avatarUrl));
          if (session?.user) {
            await updateSession({
              ...session,
              user: {
                ...session.user,
                avatar: data.avatarUrl
              }
            });
          }
          setNotification({
            type: 'success',
            message: 'Avatar updated successfully'
          });
        } else {
          throw new Error('Failed to update avatar');
        }
      } catch (err) {
        console.error('Error updating avatar:', err);
        setNotification({
          type: 'error',
          message: 'Failed to update avatar'
        });
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Notification banner */}
      {notification.type && (
        <div className={`p-4 rounded-md ${
          notification.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar 
              imgUrl={userProfile.avatar} 
              sizeClass="w-32 h-32"
              userName={`${userProfile.firstName} ${userProfile.lastName}`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-1 text-xs">Change Image</span>
            </div>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          
          {/* Company Name */}
          <div>
            <Label>Company Name</Label>
            <Input 
              className="mt-1.5"
              defaultValue={userProfile.companyName}
              {...register("companyName")}
            />
          </div>

          <div className="grid grid-flow-col grid-rows-1 gap-4">
            <div className="">
            <Label>First Name</Label>
            <Input 
              className="mt-1.5"
              defaultValue={userProfile.firstName}
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && <div className="text-red-600 text-sm">{errors.firstName.message}</div>}

            </div>
            <div className="">
            <Label>Last Name</Label>
            <Input 
              className="mt-1.5"
              defaultValue={userProfile.lastName}
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && <div className="text-red-600 text-sm">{errors.lastName.message}</div>}

            </div>
          </div>

          <div className="grid grid-flow-col grid-rows-1 gap-4">
            <div className="">

            <Label>Email</Label>

            <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    className="!rounded-l-none"
                    placeholder="example@email.com"
                    value={userProfile.email}
                    disabled
                    readOnly
                  />
                </div>

            </div>
            <div className="">
              <Label>Phone Number</Label>
              <PhoneNumberInput
                className="mt-1.5"
                phoneNumber={userProfile.phoneNumber}
                {...register("phoneNumber")}
              />
            </div>
          </div>
          
          {/* About */}
          <div>
            <Label>Bio</Label>
            <Textarea 
              className="mt-1.5"
              defaultValue={userProfile.about}
              {...register("about")}
            />
          </div>

          {/* User Name */}
          {/* <div>
            <Label>Username</Label>
            <Input 
              className="mt-1.5"
              defaultValue={userProfile.lastName}
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && <div className="text-red-600 text-sm">{errors.lastName.message}</div>}
          </div> */}

          {/* Phone Number */}
          {/* <div>
            <Label>Phone Number</Label>
            <Input 
              className="mt-1.5"
              defaultValue={userProfile.phoneNumber}
              {...register("phoneNumber")}
            />
          </div> */}


          {/* Address */}
          {/* <div>
            <Label>Address</Label>
            <Input 
              className="mt-1.5"
              defaultValue={userProfile.address}
              {...register("address")}
            />
          </div> */}

          {/* Languages */}
          <div>
            <Label>Languages</Label>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex flex-wrap gap-4 px-5 py-6">
                <Controller
                  name="languages"
                  control={control}
                  defaultValue={userProfile.languages}
                  render={({ field }) => (
                    <>
                      {languageOptions.map((option) => (
                        <div key={option.name} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.name}
                            checked={field.value?.includes(option.name)}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...(field.value || []), option.name]
                                : field.value?.filter((lang) => lang !== option.name) || [];
                              field.onChange(newValue);
                            }}
                            className="form-checkbox h-5 w-5"
                          />
                          <label htmlFor={option.name} className="ml-2">
                            {option.name}
                          </label>
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>
            </div>
          </div>



          <div className="">
                <Label>Website</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-3 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    https://
                  </span>
                  <Input
                    className="!rounded-l-none"
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>
              {/* ---- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <Label>Facebook</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-facebook-f"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="yourfacebook"
                      sizeClass="h-11 px-4 pl-2 pr-3"
                    />
                  </div>
                </div>
                <div>
                  <Label>Twitter</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-twitter"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="yourtwitter"
                      sizeClass="h-11 px-4 pl-2 pr-3"
                    />
                  </div>
                </div>
                <div>
                  <Label>Instagram</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl lab la-instagram"></i>
                    </span>
                    <Input
                      className="!rounded-l-none"
                      placeholder="yourinstagram"
                      sizeClass="h-11 px-4 pl-2 pr-3"
                    />
                  </div>
                </div>
              </div>







          {/* Submit Button */}
          <div className="pt-2">
            <ButtonPrimary type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update info"}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;