"use client";

import React, { FC, useEffect, useState, ReactNode } from "react";
import Heading from "@/shared/Heading";
import Nav from "@/shared/Nav";
import NavItem from "@/shared/NavItem";

export interface HeaderFilterProps {
  tabActive: string;
  tabs: string[];
  heading: ReactNode;
  subHeading?: ReactNode;
  onClickTab?: (item: string) => void;
}

const HeaderFilter: FC<HeaderFilterProps> = ({
  tabActive,
  tabs,
  subHeading = "",
  heading = "Latest Articles 🎈",
  onClickTab = () => {},
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive);

  useEffect(() => {
    setTabActiveState(tabActive);
  }, [tabActive]);

  const handleClickTab = (item: string) => {
    onClickTab(item);
    setTabActiveState(item);
  };

  return (
    <div className="flex flex-col mb-4 relative">
      <Heading desc={subHeading}>{heading}</Heading>
      <div className="flex items-center justify-between">
        <Nav
          className="sm:space-x-2"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActiveState === item}
              onClick={() => handleClickTab(item)}
            >
              {item}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default HeaderFilter;
