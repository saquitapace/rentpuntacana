"use client";

import {
  DEMO_STAY_LISTINGS,
} from "@/data/listings";
import React, { FC, Fragment, useState } from "react";
import Avatar from "@/shared/Avatar";
import ButtonSecondary from "@/shared/ButtonSecondary";
import SocialsList from "@/shared/SocialsList";
import sessionState from "../../utils/sessionState";
import Image from "next/image";
import Input from "@/shared/Input";
import avatar4 from "@/images/avatars/Image-4.png";
import avatar5 from "@/images/avatars/Image-5.png";
import avatar6 from "@/images/avatars/Image-6.png";

const notifications = [
  {
    name: "Eden Tuan",
    description: "Measure actions your users take",
    time: "3 minutes ago",
    href: "#a",
    avatar: avatar4,
  },
  {
    name: "Leo Messi",
    description: "Create your own targeted content",
    time: "1 minute ago",
    href: "#a",
    avatar: avatar5,
  },
  {
    name: "Leo Kante",
    description: "Keep track of your growth",
    time: "3 minutes ago",
    href: "#a",
    avatar: avatar6,
  },
];

export interface AuthorPageProps {}

const AuthorPage: FC<AuthorPageProps> = ({}) => {
  
  const fullName = sessionState.getFullName();
  const about = sessionState.getAbout();
  const dateJoined = sessionState.getDateJoined();
  const languages = sessionState.getLanguages();
  
  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
      sidebar
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        section 1
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        section 2
      </div>
    );
  };

  return (
    <div className={"nc-AuthorPage "}>
      <div className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">
             {renderSidebar()}
            </div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
            {renderSection1()}
            {renderSection2()}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;