'use client';
import React, { FC, useState } from "react";
import translations2 from '@/utils/translation2';

export interface PriceProps {
  className?: string;
  currency?: string;
  price?:null | number;
}

const Price: FC<PriceProps> = ({
  className = "",
  currency = "RD",
  price = 0,
}) => {
  const x = translations2.get();
	const[t,setT] = useState(x);
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
          <span>{t.noPriceSet}</span>
      )}

    </span>
    </div>
  );
};

export default Price;