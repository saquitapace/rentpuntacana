import { Fragment, FC, useEffect} from "react";
import { useState } from 'react';
import { Amenities_demos } from '../constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {Dialog, Transition, TransitionChild } from '@headlessui/react';
import ButtonSecondary from '@/shared/ButtonSecondary';
import ButtonClose from '@/shared/ButtonClose';
import LoadingInHeader from "@/components/LoadingInHeader";

interface Props {
  className?: "" | string;
  amenities: [];
  loading: boolean;
}

const AmenitiesSection: FC<Props> = ({ 
  className = "",
  amenities = [],
  loading = true
}) => {
  
  //console.log(amenities);

  const { translations, error } = useSelector(
    (state: RootState) => state.translations
  );
  const [isLoading, setIsLoading] = useState(loading);
  const [arr, setArr] = useState([]);
  const [amenitiesArray, setAmenitiesArray] = useState(false);
  const [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  const renderAmenities = async (amenities) => {
      
    setAmenitiesArray(true);

    if(amenities === null){
      return;
    }

    const Array = JSON.parse(amenities); 

    Array.forEach(has => {
      Amenities_demos.forEach(item => {
        if(has == item.key){
          arr.push({icon:item.icon,key:has })	
        }
      });
    });
  }

    useEffect(() => {
      setIsLoading(false);
  
      setAmenitiesArray(true);

      if(amenities === null){
        return;
      }
  
      const Array = JSON.parse(amenities); 
  
      Array.forEach(has => {
        Amenities_demos.forEach(item => {
          if(has == item.key){
            arr.push({icon:item.icon,key:has })	
          }
        });
      });



      
    },[amenities]);

    function closeModalAmenities() {
      setIsOpenModalAmenities(false);
    }

    function openModalAmenities() {
      setIsOpenModalAmenities(true);
    }

    const renderModalAmenities = () => {
      return (
        <Transition appear show={isOpenModalAmenities} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalAmenities}
          >
            <div className="min-h-screen px-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-40" />
              </TransitionChild>
    
              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block h-screen w-full max-w-4xl py-8">
                  <div className="inline-flex h-full w-full transform flex-col overflow-hidden rounded-2xl bg-white pb-2 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100">
                    <div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900"
                        id="headlessui-dialog-title-70"
                      >
                        Amenities
                      </h3>
                      <span className="absolute left-3 top-3">
                        <ButtonClose onClick={closeModalAmenities} />
                      </span>
                    </div>
                    <div className="divide-y divide-neutral-200 overflow-auto px-8 text-neutral-700 dark:text-neutral-300">
                      {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
                        >
                          <i
                            className={`las text-4xl text-neutral-6000 ${item.icon}`}
                          ></i>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
      )
    }

  return (
    <div className="listingSection__wrap">

        <h2 className="text-xl font-semibold flex">
            {translations.amenities}
            {isLoading && 
              <LoadingInHeader />}

            {!loading && (
              <div className="count">
                ({arr.length})
              </div>
            )}
        </h2>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
      
      {/* {!loading && ()} */}
      
        {amenitiesArray && (							
          arr.map((item) => (
            
            <div key={item.name} className="flex items-center space-x-3">
              <i className={`las text-3xl ${item.icon}`}></i>
              <span className=" ">{item.key}</span>
            </div>
          ))
        )}
      </div>

      {/* <div className="w-14 border-b border-neutral-200"></div> */}
      {/* <div >
        <ButtonSecondary className="text-red-700" onClick={openModalAmenities}>
          View more 20 amenities
        </ButtonSecondary>
      </div>  */}

      {/* {renderModalAmenities()} */}

    </div>
  );
};

export default AmenitiesSection;