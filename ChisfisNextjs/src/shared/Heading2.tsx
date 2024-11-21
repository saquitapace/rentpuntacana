import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "",
  subHeading = "",
}) => {
  return (
    <div className={`mb-6 lg:mb-6 ${className}`}>
      <h2 className="text-3xl">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        ""
      )
      }
    </div>
  );
};

export default Heading2;