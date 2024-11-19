"use client";

import React, { FC, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from 'axios';

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  id?: string;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white",
  isLiked,
  id = "",
}) => {
  const [likedState, setLikedState] = useState(isLiked);
  const { data: session } = useSession();
  const router = useRouter();

  const postLike = async (propertyId: string) => {
    try {
      const response = await axios.post(`/api/likes`, {
        userId: session?.user?.id,
        propertyId: parseInt(propertyId),
      });

      if (response.data) {
        setLikedState(true);
      }
    } catch (error) {
      console.error("Error posting like:", error);
    }
  };

  const deleteLike = async (propertyId: string) => {
    try {
      const response = await axios.delete(`/api/likes`, {
        params: { 
          userId: session?.user?.id,
          propertyId: parseInt(propertyId)
        }
      });

      if (response.data) {
        setLikedState(false);
      }
    } catch (error) {
      console.error("Error deleting like:", error);
    }
  };

  const handleClick = async () => {
    if (!session?.user) {
      router.push('/login');
      return;
    }

    try {
      if (!likedState) {
        await postLike(id);
      } else {
        await deleteLike(id);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded-full ${className} ${
        likedState ? "nc-liked" : ""
      }`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${colorClass}`}
        viewBox="0 0 24 24"
        fill={likedState ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
};

export default BtnLikeIcon;
