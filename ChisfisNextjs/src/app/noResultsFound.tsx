import React, { FC } from "react";
import NotFoundPng from "@/images/notFound.png";
import Image from "next/image";

export interface NoResultsFoundProps {
  className?: string;
  message?: string;
}

const NoResultsFound: FC<NoResultsFoundProps> = ({
  className = "",
  message = ""
}) => {

return(
  <div className="nc-NoResultsFound">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <Image src={NotFoundPng} 
          className="notfound"
          alt="not-found" />
          <span className={`block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium ${className}`}>
            {message}
          </span>
      </header>
    </div>
  </div>)
};

export default NoResultsFound;