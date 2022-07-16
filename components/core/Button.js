import React from "react";
import Link from "next/link";

const Button = ({ variant, children, destination, type, className }) => {
  return (
    <Link href={destination}>
      <button
        className={`button 
        ${variant === `primary` ? `button-primary` : ``} 
        ${variant === `secondary` ? `button-secondary` : ``} 
        ${variant === `ghost` ? `button-ghost` : ``} 
        ${className ? className : ``}`}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;

Button.defaultProps = {
  variant: "primary",
  destination: "#",
  type: "button",
};
