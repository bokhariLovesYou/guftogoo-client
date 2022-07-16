import React from "react";

const Main = ({ children, className, style }) => {
  return (
    <main style={style} className={className}>
      {children}
    </main>
  );
};

export default Main;
