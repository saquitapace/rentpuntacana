"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import Label from "@/components/Label";
import Avatar from "@/shared/Avatar";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Checkbox from "@/shared/Checkbox";
import Textarea from "@/shared/Textarea";
import sessionState from "@/utils/sessionState";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setUserProfile, setAvatar } from '@/store/slices/userProfileSlice';

const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:3000';

export interface AccountPageProps {}
export interface AccountFormInputs {
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  about: string;
  languages: string[];
  companyName: string;
  address: string;
  avatar: string;
}

const AccountPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");
  
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName || "",
    lastName: userProfile.lastName || "",
    email: userProfile.email || "",
    phoneNumber: userProfile.phoneNumber || "",
    about: userProfile.about || "",
    languages: [],
    companyName: "",
    address: userProfile.address || "",
    avatar: userProfile.avatar || "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    languages: "",
    address: "",
  });

  const languageOptions = [
    { name: 'English', defaultChecked: false },
    { name: 'Spanish', defaultChecked: false },
    { name: 'French', defaultChecked: false },
  ];

  // Set initial checked state for languages
  languageOptions.forEach(option => {
    option.defaultChecked = formData.languages.includes(option.name);
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user-data?userId=' + sessionState.getUserId());
      if (response.ok) {
        const data = await response.json();
        dispatch(setUserProfile(data));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const uniqueId = uuidv4();
      const fileName = `UserProfilePhoto-${uniqueId}.png`;
      const filePath = `/images/avatars/${fileName}`;
      
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('filePath', filePath);

      try {
        const response = await fetch('/api/update-avatar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setAvatar(data.avatarUrl));
        } else {
          console.error('Failed to update avatar');
        }
      } catch (error) {
        console.error('Error updating avatar:', error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFieldErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    const errors: any = {};
    let isValid = true;

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = "This field is required";
        isValid = false;
      }
    });

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate languages
    if (formData.languages.length === 0) {
      errors.languages = "Please select at least one language";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        user_id: sessionState.getUserId()
      };
      
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/updateUser`,
        { data }
      );

      if (response.status === 200) {
        // Update session storage if needed
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setGeneralError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Account information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
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

        <form onSubmit={handleSubmit} className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
          {generalError && <div className="text-red-600 text-sm">{generalError}</div>}
          
          <div>
            <Label>Company Name</Label>
            <Input 
              className="mt-1.5"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>First Name</Label>
            <Input 
              className="mt-1.5"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {fieldErrors.firstName && (
              <p className="text-red-500 text-sm">{fieldErrors.firstName}</p>
            )}
          </div>

          <div>
            <Label>Last Name</Label>
            <Input 
              className="mt-1.5"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {fieldErrors.lastName && (
              <p className="text-red-500 text-sm">{fieldErrors.lastName}</p>
            )}
          </div>

          <div>
            <Label>Email</Label>
            <Input 
              className="mt-1.5"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <Label>Address</Label>
            <Input 
              className="mt-1.5"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {fieldErrors.address && (
              <p className="text-red-500 text-sm">{fieldErrors.address}</p>
            )}
          </div>

          <div>
            <Label>Phone number</Label>
            <Input 
              className="mt-1.5"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {fieldErrors.phoneNumber && (
              <p className="text-red-500 text-sm">{fieldErrors.phoneNumber}</p>
            )}
          </div>

          <div>
            <Label>Languages</Label>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
              <div className="flex flex-wrap space-y-5 pr-5 py-6">
                {languageOptions.map((item) => (
                  <div key={item.name} className="px-5">
                    <Checkbox
                      name={item.name}
                      label={item.name}
                      defaultChecked={item.defaultChecked}
                      onChange={(checked) => {
                        setFormData(prev => ({
                          ...prev,
                          languages: Array.isArray(prev.languages) && checked 
                            ? [...prev.languages, item.name]
                            : Array.isArray(prev.languages) 
                              ? prev.languages.filter(lang => lang !== item.name)
                              : [item.name]
                        }));
                        setFieldErrors(prev => ({
                          ...prev,
                          languages: ""
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {fieldErrors.languages && (
              <p className="text-red-500 text-sm">{fieldErrors.languages}</p>
            )}
          </div>

          <div>
            <Label>About you</Label>
            <Textarea 
              className="mt-1.5"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
            />
          </div>

          <div className="pt-2">
            <ButtonPrimary type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update info"}
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountPage;