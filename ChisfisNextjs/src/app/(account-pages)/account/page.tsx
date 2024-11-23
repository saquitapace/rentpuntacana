"use client";

import CommentListing from "@/components/CommentListing";
import StartRating from "@/components/StartRating";
import StayCard from "@/components/StayCard2";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import React, { Fragment, FC, useEffect } from "react";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import SocialsList from "@/shared/SocialsList";
import { ExclamationTriangleIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";
import ExperiencesCard from "@/components/ExperiencesCard";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { 
  fetchUserProfile,
  getUserFullName,
  getUserAvatar,
  getUserLanguages,
  getUserAbout,
  getUserLoading,
  getUserCreatedAt
} from '@/store/slices/userProfileSlice';

export interface AuthorPageProps {}

const AuthorPage: FC<AuthorPageProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [categories] = React.useState(["Published", "Drafts"]);

  // Get user data from Redux store
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const fullName = useSelector(getUserFullName);
  const avatar = useSelector(getUserAvatar);
  const languages = useSelector(getUserLanguages);
  const about = useSelector(getUserAbout);
  const isLoading = useSelector(getUserLoading);
  const dateJoined = useSelector(getUserCreatedAt);

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

        {/* Social Links */}
        <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        />

        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* User Details */}
        <div className="space-y-4 w-full">
          {/* Location */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-600 dark:text-neutral-300 flex-1 text-left">
              Punta Cana, Dominican Republic
            </span>
          </div>

          {/* Languages */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className="text-neutral-600 dark:text-neutral-300 flex-1 text-left">
              Speaks {Array.isArray(languages) ? languages.join(', ') : 'English'}
            </span>
          </div>

          {/* Join Date */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-neutral-600 dark:text-neutral-300 flex-1 text-left">
              Joined in {formattedDate}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl">{fullName}&apos;s Listings</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {fullName}&apos;s
            {` listings is very rich, 5 star reviews help him to be
            more branded.`}
          </span>
        </div>
        
        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {DEMO_STAY_LISTINGS.filter((_, i) => i < 8).map((stay) => (
                    <StayCard key={stay.id} data={stay} />
                  ))}
                </div>
                {/*<div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div> */}
              </Tab.Panel>
              <Tab.Panel className="mt-8">
                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {DEMO_STAY_LISTINGS.filter((_, i) => i < 2).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div>
                {/*<div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div> */}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
  










          
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage`}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            {renderSidebar()}
            <div className="flex pt-5 justify-center border-solid">
              <EyeIcon className="h-6 w-6" />
              <div className="pl-5">Preview Public Profile</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {renderSection2()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;