"use client";

import { useState, FC } from "react";
import FiveStartIconForRate from './FiveStartIconForRate';
import CommentListing from "./CommentListing";
import Input from "@/shared/Input";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import useFetchReviews from "@/hooks/useFetchReviews";
import LoadingInHeader from "./LoadingInHeader";
import { useSelector } from 'react-redux';

interface Props {
  className?: string;
  type?: string;
  id?: any;
}

const Reviews: FC<Props> = ({ 
  className = "", 
  type = "",
  id = null
}) => {

//todo: couldnt use error from translations here bc it is used in usefetchreviews
const { translations, isLoading } = useSelector(
  (state) => state.translations
);

const [formEnabled, setFormEnabled] = useState(false);
const params = {type: type, id: id}; //parameters to pass to service

const {
  data,
  loading,
  error,
} = useFetchReviews(params);

  return (
    <>
    <div className="listingSection__wrap">
        {error && 
        <div className="error">{error}</div>
        }

        <h2 className="text-xl font-semibold flex">
            {translations.reviews}
            {loading && 
              <LoadingInHeader />}

            {!loading && (
              <div className="count">
                ({data.length})
              </div>
            )}
        </h2>

				<div className="h-px w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/*todo - add form : saquita; make component */}
        
        {formEnabled && (
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
        )}

				{/* comment */}
				<div className="divide-y divide-neutral-100 dark:divide-neutral-800">

            {data.map((item, index) => (
              <div
                key={index}
              >
                <CommentListing
                  className="py-4" 
                  avatar={item.avatar} 
                  name={item.name} 
                  date={item.time} 
                  comment={item.review} 
                  starPoint={item.rating}       
                />
              </div>
            ))}

          {/* todo saquita : make a component; displayMore modal */}
          
          {data.length > 20 && (
            <div className="pt-8 hidden">
              <ButtonSecondary>View more reviews</ButtonSecondary>
            </div>
          )}
				</div>
			</div>
    </>
  );
};

export default Reviews;