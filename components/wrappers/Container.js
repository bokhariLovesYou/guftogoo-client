import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`container px-3.5 mx-auto${className ? ` ` + className : ``}`}>{children}</div>
  );
};

export default Container;
