import React from "react";

const Heading = ({ tag: Tag, size, children, className }) => {
  return <Tag className={size + ` ` + className}>{children}</Tag>;
};

export default Heading;

Heading.defaultProps = {
  tag: `h1`,
  size: `h1`,
  content: `Sample Heading`,
};
