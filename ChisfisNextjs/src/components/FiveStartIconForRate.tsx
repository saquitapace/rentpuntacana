"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export interface FiveStartIconForRateProps {
  className?: string;
  iconClass?: string;
  defaultPoint?: number;
}

const FiveStartIconForRate: FC<FiveStartIconForRateProps> = ({
  className = "",
  iconClass = "w-4 h-4",
  defaultPoint = 5,
}) => {
  const [point, setPoint] = useState(defaultPoint);
  const [currentHover, setCurrentHover] = useState(0);
  
  const { translations, isLoading, error } = useSelector(
    (state) => state.translations
  );

  useEffect(() => {
    setPoint(defaultPoint);
  }, [defaultPoint]);

  return (
    <div
      className={`nc-FiveStartIconForRate flex items-center text-neutral-300 ${className}`}
      data-nc-id="FiveStartIconForRate"
    >
      {[1, 2, 3, 4, 5].map((item) => {
        return (
          <StarIcon
            key={item}
            className={`${
              point >= item || currentHover >= item ? "text-yellow-500" : ""
            } ${iconClass}`}
            onMouseEnter={() => setCurrentHover(() => item)}
            onMouseLeave={() => setCurrentHover(() => 0)}
            onClick={() => setPoint(() => item)}
          />
        );
      })}
    </div>
  );
};

export default FiveStartIconForRate;
