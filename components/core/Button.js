import React from "react";

const Button = ({ variant, children, destination, type, className }) => {
  return (
    <a href={destination}>
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
    </a>
  );
};

export default Button;

Button.defaultProps = {
  variant: "primary",
  destination: "#",
  type: "button",
};
