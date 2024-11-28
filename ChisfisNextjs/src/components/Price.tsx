import React, { FC } from "react";

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

  const currencySymbol ="$";

  return (
    <div
      className={`nc-Price flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="Price"
    >
    
    <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">

      {price >0 && (
            currencySymbol + currency + price
      )}

      {!price && (
          "no price set"
      )}

    </span>
    </div>
  );
};

export default Price;