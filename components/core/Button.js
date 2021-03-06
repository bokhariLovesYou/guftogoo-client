import React from "react";
import Link from "next/link";
import Spinner from "@/components/core/Spinner";

const Button = ({
  variant,
  children,
  destination,
  type,
  className,
  withoutDestination,
  disabled,
  isLoading,
}) => {
  const clx = `button 
  ${variant === `primary` ? `button-primary` : ``} 
  ${variant === `secondary` ? `button-secondary` : ``} 
  ${variant === `ghost` ? `button-ghost` : ``} 
  ${disabled ? `opacity-40 pointer-events-none` : ``}
  ${isLoading ? `opacity-70 pointer-events-none flex items-center justify-center` : ``}
  ${className ? className : ``}`;

  return (
    <>
      {withoutDestination && (
        <button className={clx} type={type} disabled={disabled}>
          {isLoading && <Spinner button white />}
          {children}
        </button>
      )}
      {!withoutDestination && (
        <Link href={destination}>
          <button className={clx} type={type} disabled={disabled}>
            {children}
          </button>
        </Link>
      )}
    </>
  );
};

export default Button;

Button.defaultProps = {
  variant: "primary",
  destination: "#",
  type: "button",
};
