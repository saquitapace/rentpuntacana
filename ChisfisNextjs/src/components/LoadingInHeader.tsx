import React, { FC } from "react";

interface Props {
  className?: "" | string;
}

const LoadingInHeader: FC<Props> = ({ 
  className = ""
}) => {
  return (
    
    <div className="loader-container">
      <div className="loading-text">Loading<span className="dots"></span></div>
    </div>
  );
};

export default LoadingInHeader;