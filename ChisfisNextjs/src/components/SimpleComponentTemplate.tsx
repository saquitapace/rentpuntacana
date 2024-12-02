import React, { FC } from "react";

interface Props {
  className?: "" | string;
}

const SimpleComponentTemplate: FC<Props> = ({ 
  className = "/listing-stay-map" 
}) => {
  return (
    <div className={className}>

      body of SimpleComponentTemplate component
    </div>
  );
};

export default SimpleComponentTemplate;