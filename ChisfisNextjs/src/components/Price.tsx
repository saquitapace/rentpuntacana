'use client';
import React, { FC, useState } from "react";
import { useSelector } from 'react-redux';

export interface PriceProps {
  className?: string;
  currency?: string;
  price?: any;
}

const Price: FC<PriceProps> = ({
  className = "",
  currency = "RD",
  price = 0,
}) => {
  const { translations, isLoading, error } = useSelector(
    (state) => state.translations
  );

  const currencySymbol ="$";

  return (
    <div
      className={`nc-Price flex items-center space-x-1 ${className}`}
      data-nc-id="Price"
    >
    
    <span className={`flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none font-medium text-secondary-500 ${className}`} >
    
      {price >0 && (
            currencySymbol +""+ currency + " " + price
      )}

      {!price && (
          <span>{translations.noPriceSet}</span>
      )}

    </span>
    </div>
  );
};

export default Price;