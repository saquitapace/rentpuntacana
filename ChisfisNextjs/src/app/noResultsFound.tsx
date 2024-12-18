import React, { FC, useState } from "react";
import NotFoundImage from "@/images/notFound.png";
import ErrorImage from "@/images/error.svg";
import SearchImage from "@/images/search.svg";

import Image from "next/image";

export interface NoResultsFoundProps {
  className?: string;
  message?: string;
  category?:string;
}

const NoResultsFound: FC<NoResultsFoundProps> = ({
  className = "",
  message = "",
  category = ""
}) => {
  const [imgSrc,setImgSrc] = useState("");

  switch(category){
    case "error":
      setImgSrc("ErrorImage");
      break;
    case "noResults":
      setImgSrc( "SearchImage");
    break;
    default:
      setImgSrc("NotFoundImage");
  }

return(
  <div className="nc-NoResultsFound">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <Image src={imgSrc} 
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