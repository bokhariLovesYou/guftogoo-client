import React from "react";

const CardWrapper = ({ children, className }) => {
  return (
    <>
      <div className={`px-5 py-5 bg-white border rounded-lg ${className ? className : ``}`}>
        {children}
      </div>
    </>
  );
};

export default CardWrapper;
