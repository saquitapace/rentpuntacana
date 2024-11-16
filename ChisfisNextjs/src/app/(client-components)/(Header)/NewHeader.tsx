"use client";

import React, { FC } from "react";
import MainNav1 from "./MainNav1";
import MainNav2 from "./MainNav2";
import { useSession } from "next-auth/react";

export interface HeaderProps {
  navType?: "MainNav1" | "MainNav2";
  className?: string;
}

const NewHeader: FC<HeaderProps> = ({ navType = "MainNav1", className = "" }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const renderNav = () => {
    // Use session to determine which nav to show
    const navType = !user ? "MainNav1" : "MainNav2";
   
    switch (navType) {
      case "MainNav1":
        return <MainNav1 />;
      case "MainNav2":
        return <MainNav2 />;
      default:
        return <MainNav1 />;
    }
  };

  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
    >
      {renderNav()}
    </div>
  );
};

export default NewHeader;
