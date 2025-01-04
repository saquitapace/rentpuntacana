"use client";

import Link from "next/link";
import React, { ButtonHTMLAttributes, FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import { Route } from "next";

export interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  loading?: boolean;
}

const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  className = "",
  href,
  children,
  type,
  loading,
  onClick = () => {},
  ...rest
}) => {
  const CLASSES =
    `nc-ButtonPrimary relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  ${className} ` +
    twFocusClass(true);

  if (!!href) {
    return (
      <Link href={href as Route} className={CLASSES} >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={CLASSES}
      onClick={onClick}
      disabled={loading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
