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
import { signOut, useSession } from "next-auth/react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import Reviews from '@/components/Reviews';

import { 
  fetchUserProfile,
  getUserFullName,
  getUserAvatar,
  getUserLanguages,
  getUserAbout,
  getUserLoading,
  getUserCreatedAt,
  clearUserProfile,
  getUserId
} from '@/store/slices/userProfileSlice';
import { formatDateJoined } from "@/utils/helpers";

export interface AuthorPageProps {}

const AuthorPage: FC<AuthorPageProps> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [categories] = React.useState(["Published", "Drafts"]);

  // Get user data from Redux store
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const fullName = useSelector(getUserFullName);
  const userId = useSelector(getUserId);

  const avatar = useSelector(getUserAvatar);
  const languages = useSelector(getUserLanguages);
  const about = useSelector(getUserAbout);
  const isLoading = useSelector(getUserLoading);
  const dateJoined = formatDateJoined( useSelector(getUserCreatedAt) );

  // Debug logs
  // console.log("Session:", session);
  // console.log("UserProfile:", userProfile);

  const handleSignOut = () => {
    dispatch(clearUserProfile());
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    if (session?.user?.email) {
      
    }
    else
    {
      handleSignOut()
    }    
  }, [dispatch, session?.user?.email ]);


  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  ///TODO: move to helpers
  // Format date properly
  /* const formattedDate = dateJoined ? new Date(dateJoined).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  }) : '';
 */
  // Format languages properly
  const formattedLanguages = Array.isArray(languages) ? languages.join(', ') : '';

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          imgUrl={avatar}
          userName={fullName}
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
          isLoading={isLoading}
        />

        {/* User Info */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{fullName || 'Loading...'}</h2>
          <StartRating className="!text-base" />
        </div>

        {/* About Section */}
        {about ? (
          <p className="text-neutral-500 dark:text-neutral-400">
            {about}
          </p>
        ) : (
          <div className="flex bg-red-200 text-red-700 px-4 py-2 rounded-lg" role="alert">
            <ExclamationTriangleIcon className="h-6 w-6 mr-2" /> 
            <span>Complete Profile</span>
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
              Joined in {dateJoined}
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
          {/* <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {fullName}&apos;s
            {` listings is very rich, 5 star reviews help him to be
            more branded.`}
          </span> */}
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

      <Reviews
      className=""
      id={userId}
      type="user"
    />
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