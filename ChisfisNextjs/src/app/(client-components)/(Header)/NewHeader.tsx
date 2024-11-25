"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Route } from "@/routers/types";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import Logo from "@/shared/Logo";
import Navigation from "@/shared/Navigation/Navigation";
import Button from "@/shared/Button";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeroSearchForm2MobileFactory from "../(HeroSearchForm2Mobile)/HeroSearchForm2MobileFactory";
import LangDropdownSingle from "./LangDropdownSingle";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchUserProfile, setUserProfile } from "@/store/slices/userProfileSlice";
import { isTokenValid } from "@/utils/helpers";

export interface NewHeaderProps {
  className?: string;
}

const NewHeader: FC<NewHeaderProps> = ({ className = "" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  console.log("newHeader");

  // Fetch user profile data when component mounts or session changes
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email) {
        try {
          const response = await dispatch(fetchUserProfile()).unwrap();

          //TODO: if token has expired, signout
          alert( 'isTokenValid ' + isTokenValid( 1735116781 ) )
          if ( !isTokenValid( 1735116781 ) )
          {

            return;
          }

          dispatch(setUserProfile(response));
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchData();
  }, [useDispatch, session?.user?.email]);


  return (
    <div className={`nc-Header border-b border-neutral-200 sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}>
      <div className={`relative z-10 ${className}`}>
        <div className="px-4 lg:container h-20 flex justify-between">
          
          <div className="hidden md:flex justify-start flex-1 space-x-4 sm:space-x-10">
            <Logo className="w-24 self-center" />
            
            <Navigation />
          </div>

          <div className="self-center lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
            <HeroSearchForm2MobileFactory />
          </div>
          
          <div className="hidden md:flex flex-shrink-0 justify-center items-center flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
           
           {(pathname != "/login" && pathname !== "/signup")  && 
              <LangDropdownSingle />
            }

            {!user ? (
              <div className="hidden xl:flex space-x-0.5">
                <div className="px-1" />
              
                {pathname === "/" ? (
                  <>
                    <Button 
                      className="self-center block" 
                      href="/login"
                      >
                      Sign In
                    </Button>
                    <ButtonPrimary 
                      className="self-center" 
                      href="/signup"
                    >
                      Sign Up
                    </ButtonPrimary>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="hidden lg:flex space-x-1">                
                {user.accountType === "property" && (
                  <Link
                    href={"/add-listing" as Route<string>}
                    className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    + Add Listing
                  </Link>
                )}
                <NotifyDropdown />
              </div>
            )}
            
            <div className="flex space-x-2">
              {user && <AvatarDropdown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeader;
