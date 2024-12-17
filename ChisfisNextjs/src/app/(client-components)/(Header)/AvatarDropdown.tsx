"use client";

import { useSession, signOut } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Avatar from "@/shared/Avatar";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { 
  Cog6ToothIcon,
  EnvelopeIcon,
  UserCircleIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { updateJWT } from "@/store/slices/authSlice";
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2'

interface Props {
  className?: string;
  handleSignOut: () => Promise<void>;
}

export default function AvatarDropdown({ className = "", handleSignOut }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const dispatch = useDispatch<AppDispatch>();
  
  const { translations, isLoading, error } = useSelector(
    (state: RootState) => state.translations
  );

 /*  useEffect(() => {
    if (!session?.user?.email) {
      handleSignOut
    }
  }, [ dispatch, session?.user?.email ]); */

  return (
    <>
      <Popover className={`relative ${className}`}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
            >
              <Avatar imgUrl={user?.avatar} userName={user?.firstName} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3.5 -right-10 sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
                    <div className="flex items-center space-x-3">
                      <Avatar imgUrl={user?.avatar} userName={user?.firstName} />
                      <div className="flex-grow">
                        <h4 className="font-semibold">{user?.firstName} {user?.lastName}</h4>
                        {/*<p className="text-sm text-neutral-500">{user?.email}</p> */}
                      </div>
                    </div>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* Menu items */}
                    <Link
                      href="/author"
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <UserCircleIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{translations.profile}</p>
                      </div>
                    </Link>

                    <Link
                      href="/account"
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <Cog6ToothIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{translations.settings}</p>
                      </div>
                    </Link>

                    {/* Messages Link */}
                    <Link
                      href="/messages"
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <EnvelopeIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{translations.messages}</p>
                      </div>
                    </Link>

                    {/* Favorites Link */}
                    <Link
                      href="/favorites"
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <HeartIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{translations.favorites}</p>
                      </div>
                    </Link>

                    <div className="-m-3 flex items-center justify-between rounded-lg p-2 transition duration-150 ease-in-out hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-neutral-700">
											<div className="flex items-center">
												<div className="flex flex-shrink-0 items-center justify-center text-neutral-500 dark:text-neutral-300">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium">{translations.darkTheme}</p>
												</div>
											</div>
											<SwitchDarkMode2 />
										</div>

                    <div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

                    {/* Logout Button */}
                    <button
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => {
                        close();
                        handleSignOut();
                      }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <ArrowLeftStartOnRectangleIcon className="h-6 w-6"/>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{translations.logout}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
}