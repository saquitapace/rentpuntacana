"use client";

import React, { useState, useEffect } from "react";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Checkbox from "@/shared/Checkbox";
import Textarea from "@/shared/Textarea";
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { 
  setUserProfile, 
  setAvatar, 
  updateUserProfile,
  getUserId,
  getUserFullName,
  getUserLanguages,
  getUserLoading,
  getUserAbout,
  getUserCreatedAt,
  getUserAvatar 
} from '@/store/slices/userProfileSlice';
import { useSession } from "next-auth/react";

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:3000';

export interface AccountPageProps {}
export interface AccountFormInputs {
  accountType?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  about?: string;
  languages?: string[];
  companyName?: string;
  address?: string;
  avatar?: string;
}

const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const { data: session, update: updateSession } = useSession();
  const user = session?.user;
  
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<AccountFormInputs>({
    defaultValues: {
      languages: []
    }
  });

  const userId = useSelector(getUserId) as string;
  const fullName = useSelector(getUserFullName) as string;
  const avatar = useSelector(getUserAvatar) as string;
  const about = useSelector(getUserAbout) as string;
  const isLoading = useSelector(getUserLoading) as boolean;
  const dateJoined = useSelector(getUserCreatedAt) as string;

  const [generalError, setGeneralError] = useState<string>("");

  // Set initial checked state for languages
  const languages = watch("languages", []);

  const languageOptions = [
    { name: 'English', defaultChecked: userProfile.languages.includes('English') },
    { name: 'Spanish', defaultChecked: userProfile.languages.includes('Spanish') },
    { name: 'French', defaultChecked: userProfile.languages.includes('French') },
  ];

  // Update Redux store with session data
  useEffect(() => {
    if (user) {
      dispatch(setUserProfile({
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        accountType: user.account_type,
        avatar: user.avatar,
        // Set other fields with defaults if they don't exist in session
        phoneNumber: userProfile.phoneNumber || '',
        about: userProfile.about || '',
        languages: userProfile.languages || [],
        companyName: userProfile.companyName || '',
        address: userProfile.address || '',
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, dispatch]);

  // Load additional user data
  useEffect(() => {
    const loadUserData = async () => {
      if (user?.id) {
        const data = await fetchUserData();
        if (data) {
          dispatch(setUserProfile({
            ...data,
            // Preserve session data
            userId: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            accountType: user.account_type,
            avatar: user.avatar,
          }));
        }
      }
    };

    loadUserData();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, dispatch]);

  // Sync form with Redux state
  useEffect(() => {
    setValue('companyName', userProfile.companyName);
    setValue('firstName', userProfile.firstName);
    setValue('lastName', userProfile.lastName);
    setValue('email', userProfile.email);
    setValue('phoneNumber', userProfile.phoneNumber);
    setValue('about', userProfile.about);
    setValue('languages', userProfile.languages);
    setValue('address', userProfile.address);
  }, [userProfile, setValue]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user-data?userId=' + (user?.id || userId));
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Create filename using user ID for consistency
      const fileName = `UserProfile_${user?.id}.png`;
      const filePath = `/images/avatars/${fileName}`;
      
      // Create local URL for immediate display
      const localUrl = URL.createObjectURL(file);
      
      // Update Redux immediately for instant UI feedback
      dispatch(setAvatar(localUrl));
      
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('filePath', filePath);

      try {
        // Start the upload in the background
        const uploadPromise = fetch('/api/update-avatar', {
          method: 'POST',
          body: formData,
        });

        // Update session in parallel
        const sessionPromise = updateSession({
          ...session,
          user: {
            ...session?.user,
            avatar: filePath // Use the expected final path
          }
        });

        // Wait for both operations to complete
        const [response] = await Promise.all([uploadPromise, sessionPromise]);

        if (!response.ok) {
          const error = await response.json();
          console.error('Failed to update avatar:', error);
          // Revert Redux state on error
          dispatch(setAvatar(user?.avatar || ''));
        }

        // Clean up local URL
        URL.revokeObjectURL(localUrl);
      } catch (error) {
        console.error('Error updating avatar:', error);
        // Revert Redux state on error
        dispatch(setAvatar(user?.avatar || ''));
      }
    }
  };

  const onUpdateSubmit = async (data: Partial<AccountFormInputs>) => {
    try {
      const currentUserId = user?.id || userId;
      await dispatch(updateUserProfile({ formData: data, userId: currentUserId })).unwrap();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/*<h2 className="text-3xl font-semibold">Account information</h2> */}
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-shrink-0 flex items-start">
          <div className="relative rounded-full overflow-hidden flex">
            <Avatar 
              imgUrl={avatar} 
              sizeClass="w-32 h-32"
              userName={`${fullName}`}
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

        <form onSubmit={handleSubmit(onUpdateSubmit)} className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          {generalError && <div className="text-red-600 text-sm">{generalError}</div>}
          
          <div>
            <Label>Company Name</Label>
            <Input 
              className="mt-1.5"
              { ...register("companyName", { required: "Company Name is required" }) }
            />
            { errors.companyName && <div className="text-red-600 text-sm">{ errors.companyName.message }</div> }
          </div>

          <div>
            <Label>First Name</Label>
            <Input 
              className="mt-1.5"
              { ...register("firstName", { required: "First Name is required" }) }
            />
            { errors.firstName && <div className="text-red-600 text-sm">{ errors.firstName.message }</div> }
          </div>

          <div>
            <Label>Last Name</Label>
            <Input 
              className="mt-1.5"
              { ...register("lastName", { required: "Last Name is required"}) }
            />
            { errors.lastName && <div className="text-red-600 text-sm">{ errors.lastName.message }</div> }
          </div>

          <div>
            <Label>Email</Label>
            <Input 
              className="mt-1.5"
              { ...register("email", { required: "Email is required" }) }
            />
            { errors.email && <div className="text-red-600 text-sm">{ errors.email.message }</div> }
          </div>

          <div>
            <Label>Address</Label>
            <Input 
              className="mt-1.5"
              { ...register("address", { required: "Address is required" }) }
            />
            { errors.address && <div className="text-red-600 text-sm">{ errors.address.message }</div> }
          </div>

          <div>
            <Label>Phone number</Label>
            <Input 
              className="mt-1.5"
              { ...register("phoneNumber", { required: "Phone Number is required" }) }
            />
            { errors.phoneNumber && <div className="text-red-600 text-sm">{ errors.phoneNumber.message }</div> }
          </div>
          
          <div>
            <Label>Languages</Label>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex flex-wrap gap-4 px-5 py-6">
                {languageOptions.map((item) => (
                  <Controller
                    key={item.name}
                    name="languages"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={item.name}
                          checked={languages.includes(item.name)}
                          onChange={(e) => {
                            const updatedLanguages = e.target.checked
                              ? [...languages, item.name]
                              : languages.filter((lang) => lang !== item.name);
                            setValue("languages", updatedLanguages);
                          }}
                          className="form-checkbox h-5 w-5 text-primary-600"
                        />
                        <label htmlFor={item.name} className="text-sm font-medium">
                          {item.name}
                        </label>
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>
            {errors.languages && (
              <div className="text-red-600 text-sm">{errors.languages.message}</div>
            )}
          </div>

          <div>
            <Label>About you</Label>
            <Textarea 
              className="mt-1.5"
              { ...register("about", { required: "About you is required" }) }
            />
             { errors.about && <div className="text-red-600 text-sm">{ errors.about.message }</div> }
          </div>

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