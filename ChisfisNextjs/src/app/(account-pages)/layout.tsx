import React, { FC } from "react";
import { Nav } from "./(components)/Nav";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <Nav />
      </div>
      <div className="container pt-7 sm:pt-10 pb-12 lg:pb-16">{children}</div>
    </div>
  );
};

export default CommonLayout;
