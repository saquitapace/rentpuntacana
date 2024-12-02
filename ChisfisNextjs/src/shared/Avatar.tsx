"use client";

import React, { FC, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import translations2 from '@/utils/translation2';

export interface AvatarProps {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  imgUrl?: string | StaticImageData;
  userName?: string;
  hasChecked?: boolean;
  hasCheckedClass?: string;
  isLoading?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
  hasChecked,
  hasCheckedClass = "w-4 h-4 -top-0.5 -right-0.5",
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | StaticImageData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
	const x = translations2.get();
	const[t,setT] = useState(x);

  useEffect(() => {
    if (imgUrl) {
      setIsLoading(true);
      const urlString = typeof imgUrl === 'string' ? imgUrl : imgUrl.src;
      
      if (urlString.startsWith('/images/avatars/')) {
        setImageSrc(`${urlString}?t=${new Date().getTime()}`);
        setImageError(false);
      } else {
        setImageSrc(urlString);
        setImageError(false);
      }
    }
  }, [imgUrl]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
   /* if (imageSrc && typeof imageSrc === 'string' && imageSrc.startsWith('/images/avatars/')) {
      interval = setInterval(() => {
        setImageSrc(`${imageSrc.split('?')[0]}?t=${new Date().getTime()}`);
      }, 1000);
    } */

    return () => {
     {/*} if (interval) {
        clearInterval(interval);
      } */}
    };
  }, [imageSrc]);

  const name = userName || "";

  const handleImageError = () => {
    console.log('Image failed to load:', imageSrc);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center bg-green-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
    >
      {imageSrc && !imageError ? (
        <>
          <Image
            className={`absolute inset-0 w-full h-full object-cover ${radius} ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-200`}
            src={imageSrc}
            alt={name}
            width={100}
            height={100}
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority
            unoptimized
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-sm">
              <span className="animate-pulse">{t.loading}...</span>
            </div>
          )}
        </>
      ) : (
        <span className="wil-avatar__name">{name[0]}</span>
      )}

      {hasChecked && (
        <span className={`bg-teal-500 rounded-full text-white text-xs flex items-center justify-center absolute ${hasCheckedClass}`}>
          <i className="las la-check"></i>
        </span>
      )}
    </div>
  );
};

export default Avatar;
