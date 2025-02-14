import React, { FC } from "react";
import { ListingDataType } from "@/dataTypes/ListingDataType";
import StartRating from "@/components/StartRating";
import Price from "@/components/Price";
import BtnLikeIcon from "@/components/FormElements/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import GallerySlider from "../GallerySlider";
import { Route } from "next";
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";

export interface StayCardProps {
  className?: string;
  data?: ListingDataType;
  size?: "default" | "small";
}

const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data
}) => {

  let {
    galleryImgs,
    address,
    title,
    bedrooms,
    bathrooms,
    sqft,
    href,
    likes,
    saleOff,
    isAds,
    price,
    reviewStart,
    reviewCount,
    id,
    listingId
  } = data;

  const { translations, isLoading, error } = useSelector(
    (state: RootState) => state.translations
  );

  const renderSliderGallery = () => {
  
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${listingId}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs={galleryImgs}
          href={href as Route}
          galleryClass={size === "default" ? undefined : ""}
        />
        <BtnLikeIcon isLiked={likes} id={listingId} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-5">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {bedrooms} {translations.space}
            {bedrooms <1 && (translations.beds) }
            {bedrooms >1 && (translations.beds) }
            {bedrooms == 1 && (translations.bed) }

          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {bathrooms} {translations.space}
          {bathrooms <1 && (translations.baths) }
          {bathrooms >1 && (translations.baths) }
          {bathrooms == 1 && (translations.bath) }
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">

          {sqft && 
          (<span>{sqft}  m<sup>2</sup></span>)}

          {!sqft && 
          (<span className="text-red-700"> {translations.notSet}</span>)}
           
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-1"}>
        <div className={size === "default" ? "space-y-2" : "space-y-1"}>
          <div className="flex items-center space-x-2">
            {isAds && <Badge name="ADS" color="green" />}
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {renderTienIch()}
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
            <StartRating reviewCount={reviewCount} point={reviewStart} />
            <Price className="text-sm" currency="RD" price={price} />
        </div>
      </div>
    );
  };

  return (
    
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${
        size === "default"
          ? "border border-neutral-200 dark:border-neutral-800 "
          : ""
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()} 
      <Link href={href}>{renderContent()}</Link>
    </div>
  );
};

export default StayCard;