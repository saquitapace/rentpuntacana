"use client";

import { useEffect, useState, FC, Fragment } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import moment from "moment";
import FiveStartIconForRate from './FiveStartIconForRate';
import CommentListing from "./CommentListing";
import Input from "@/shared/Input";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  className?: string;
}

const Reviews: FC<Props> = ({ className = "" }) => {

const [reviews, setReviews] = useState([]);

const reviewId = "M29SZDR4QDJBB6";


  useEffect(() => {
    if (reviewId) {
      loadReviewsData();
    }
  }, []);

  const loadReviewsData = async () => {
   const data = await fetchReviewsData();
   if (data) {
      data.map((str) => {
        str.time = moment(new Date(str.time)).fromNow();   
      });

      setReviews(data);
    } 
  };

  const fetchReviewsData = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reviews/get`, {reviewId});

      if (response) {
       return await response.data[0];
      }
    } catch (error) {
      console.error('Error fetching notification data:', error);
      // alert("Loading reviews failed. Network error. Please contact helpdesk. Error code: 500.");
    } finally {
    } 
  };

  return (
    <>

    <div className="listingSection__wrap">
				{/* HEADING */}
        <h2 className="text-xl font-semibold flex">
            Reviews ( {reviews.length}  reviews)
        </h2>

				<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

				{/* Content */}
				<div className="space-y-5 hidden">
					<FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
					<div className="relative">
						<Input
							fontClass=""
							sizeClass="h-16 px-4 py-3"
							rounded="rounded-3xl"
							placeholder="Share your thoughts ..."
						/>
						<ButtonCircle
							className="absolute right-2 top-1/2 -translate-y-1/2 transform"
							size=" w-12 h-12 "
						>
							<ArrowRightIcon className="h-5 w-5" />
						</ButtonCircle>
					</div>
				</div>

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">

          {reviews.length == 0 && (
                      <div>You have 0 Reviews</div>
                    )}
                    {reviews.map((item, index) => (
                      <div
                        key={index}
                      >
                       <CommentListing
                          className="py-8" 
                          avatar={item.avatar} 
                          name={item.name} 
                          date={item.time} 
                          comment={item.review} 
                          starPoint={item.rating}       
                        />
                      </div>
                    ))}

					<div className="pt-8 hidden">
						<ButtonSecondary>View more reviews</ButtonSecondary>
					</div>
				</div>
			</div>
    </>
  );
};

export default Reviews;