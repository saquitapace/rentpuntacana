"use client";

import { useSession, signOut } from "next-auth/react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import Avatar from "@/shared/Avatar";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { clearUserProfile, setUserProfile } from '@/store/slices/userProfileSlice';
import { useRouter } from "next/navigation";
import { 
  EnvelopeIcon,
  UserCircleIcon,
  ShieldExclamationIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon 
} from "@heroicons/react/24/outline";
import { updateJWT } from "@/store/slices/authSlice";

interface Props {
  className?: string;
  handleSignOut: () => Promise<void>;
}

export default function AvatarDropdown({ className = "", handleSignOut }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const dispatch = useDispatch<AppDispatch>();

  

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
                        <p className="text-sm font-medium">{"Profile"}</p>
                      </div>
                    </Link>

                    <Link
                      href="/account"
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <ShieldExclamationIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{"Account"}</p>
                      </div>
                    </Link>

                    {/* Messages Link */}
                    <Link
                      href="/blank"
                      className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => close()}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <EnvelopeIcon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium">{"Messages"}</p>
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
                        <p className="text-sm font-medium">{"Favorites"}</p>
                      </div>
                    </Link>

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
                        <p className="text-sm font-medium">{"Log out"}</p>
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