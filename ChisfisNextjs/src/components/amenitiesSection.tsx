import LoadingInHeader from "@/components/LoadingInHeader";
import ButtonClose from '@/shared/ButtonClose';
import { RootState } from '@/store/store';
import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Amenities_demos } from '../app/(listing-detail)/constant';

interface AmenityItem {
  icon: string;
  key: string;
}

interface Props {
  className?: string;
  amenities: string[];
  loading?: boolean;
}

const AmenitiesSection: FC<Props> = ({ 
  className = "",
  amenities = [],
  loading = false
}) => {
  const { translations } = useSelector((state: RootState) => state.translations);
  const [isLoading, setIsLoading] = useState(loading);
  const [amenityItems, setAmenityItems] = useState<AmenityItem[]>([]);
  const [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  useEffect(() => {
    if (!amenities?.length) return;

    const mappedAmenities = amenities.reduce<AmenityItem[]>((acc, amenityKey) => {
      const foundAmenity = Amenities_demos.find(item => item.key === amenityKey);
      if (foundAmenity) {
        acc.push({ icon: foundAmenity.icon, key: amenityKey });
      }
      return acc;
    }, []);

    setAmenityItems(mappedAmenities);
    setIsLoading(false);
  }, [amenities]);

  const renderModalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsOpenModalAmenities(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block h-screen w-full max-w-4xl py-8">
                <div className="inline-flex h-full w-full transform flex-col overflow-hidden rounded-2xl bg-white pb-2 text-left align-middle shadow-xl transition-all dark:border dark:border-neutral-700 dark:bg-neutral-900">
                  <div className="relative flex-shrink-0 border-b border-neutral-200 px-6 py-4 text-center dark:border-neutral-800">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {translations.amenities}
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={() => setIsOpenModalAmenities(false)} />
                    </span>
                  </div>
                  
                  <div className="divide-y divide-neutral-200 overflow-auto px-8 text-neutral-700 dark:text-neutral-300">
                    {Amenities_demos.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center space-x-5 py-2.5 sm:py-4 lg:space-x-8 lg:py-5"
                      >
                        <i className={`las text-4xl text-neutral-6000 ${item.icon}`} />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className={`listingSection__wrap ${className}`}>
      <h2 className="text-xl font-semibold flex">
        {translations.amenities}
        {isLoading && <LoadingInHeader />}
        {!isLoading && <div className="count">({amenityItems.length})</div>}
      </h2>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      <div className="grid grid-cols-1 gap-6 text-sm text-neutral-700 dark:text-neutral-300 xl:grid-cols-3">
        {amenityItems.map((item) => (
          <div key={item.key} className="flex items-center space-x-3">
            <i className={`las text-3xl ${item.icon}`} />
            <span>{item.key}</span>
          </div>
        ))}
      </div>

      {renderModalAmenities()}
    </div>
  );
};

export default AmenitiesSection;