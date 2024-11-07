"use client";

import React, { FC, useState } from "react";
import axios from "axios";
import  sessionState from "../utils/sessionState";

export interface BtnLikeIconProps {
  className?: string;
  colorClass?: string;
  isLiked?: boolean;
  id?: string;
}

const BtnLikeIcon: FC<BtnLikeIconProps> = ({
  className = "",
  colorClass = "text-white bg-black bg-opacity-30 hover:bg-opacity-50",
  isLiked = false,
  id = "",
}) => {
  const [likedState, setLikedState] = useState(isLiked);

  const postLike = async(id: number)=>{
    const activeUser = sessionState.getUserId();
    const user_id = activeUser;
    const property_id = parseInt(id);

    console.log(user_id,
      property_id,)

    const response = await axios.post( `${process.env.NEXT_PUBLIC_API_URL}/auth/postLike`, {
      user_id,
      property_id,
    })
    .then((response) => {
      console.log("Response Received:");
      console.log(response);
      setLikedState(!likedState);
      //sessionState.updateData('likes',response.data)

    }).catch(function (error) {
      console.log("Error Received from post Like");
      console.log(error.response.data.message);
    });

  }

  const deleteLike = async(id: number)=>{
    const activeUser = sessionState.getUserId();
    const user_id = activeUser;
    const property_id = id;
    
    const arr = sessionState.getLikes();
    const matchingLike = arr.filter(val => val['property_id'] ==(id));
    const deleteId = parseInt(matchingLike[0].id);
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/auth/deleteLike`,{
      params: { id: 2 },
    })
    .then((response) => {
      console.log("Response Received:");
      console.log(response);

      setLikedState(!likedState);
    }).catch(function (error) {
      console.log("Error Received from login entry:");
      console.log(error.response.data.message);
    });
  } 

  const handleChangeData = (e: { currentTarget: { id: any; }; }) => {
    const activeUser = sessionState.getUserId();
    const property_id  = e.currentTarget.id;
    if(activeUser){
      if(!likedState){
        postLike(property_id);
      } else {
        deleteLike(property_id);
      }
    } else {
     alert("login modal");
    }
  }

  const saveProperty = () => {
    alert("modal goes here for login prompt");
  }

  return (
    <div
      className={`nc-BtnLikeIcon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
        likedState ? "nc-BtnLikeIcon--liked" : ""
      }  ${colorClass} ${className}`}
      data-nc-id="BtnLikeIcon"
      title="Save"
      id={id}
      onClick= {handleChangeData}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill={likedState ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
};

export default BtnLikeIcon;
