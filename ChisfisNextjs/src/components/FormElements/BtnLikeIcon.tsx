"use client";

import React, { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: any;
  id?: any;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = 'text-white bg-black bg-opacity-30 hover:bg-opacity-50',
	isLiked = false,
  id
}) => {

  const [likedState, setLikedState] = useState(isLiked);
  const [listingId, setListingId] = useState(id);
  const { data: session } = useSession();
  const router = useRouter();
  
  const createLike = async () => {

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/likes/create`, {
        userId: session?.user?.id,
        listingId: listingId,
      });

      if (response) {
        setLikedState(1);
      }
    } catch (error) {
      console.error("Error creating like:", error);
    }
  };

  const deleteLike = async () => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/auth/likes/delete`, {
        userId: session?.user?.id,
        listingId: listingId
      });

      if (response.data) {
        setLikedState(0);
      }
    } catch (error) {
      console.error("Error deleting like:", error);
    }
  };

  const handleClick = async () => {
    setLikedState(!likedState)

    if (!session?.user) {
      alert("add the login modal or message; do not redirect");
      //router.push('/login');
      return;
    }
    
    try {
      if (!likedState) { // value is 0 
        await createLike();
      } else { // value is 1 
        await deleteLike();
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div
    className={`nc-BtnLikeIcon flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
      likedState ? 'nc-BtnLikeIcon--liked' : ''
    } ${colorClass} ${className}`}
    data-nc-id="BtnLikeIcon"
    title="Save"
    onClick={handleClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5"
      fill={likedState >0 ? '#ef4444' : 'none'}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  </div>
  );
};
export default BtnLikeIcon;