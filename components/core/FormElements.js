import React from "react";
import TextareaAutosize from "react-textarea-autosize";

export const Input = ({
  label,
  name,
  autoComplete,
  placeholder,
  type,
  required,
  register,
  errors,
  validations,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name}>
          <span className="text-sm mb-2 block">{label}</span>
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-theme-primary focus:border-theme-primary focus:z-10 sm:text-sm"
        placeholder={placeholder}
        {...register(name, {
          ...validations,
        })}
      />
      {errors && errors[name] && (
        <div className="text-xs text-red-800 mt-2">
          <span>{errors[name]?.message}</span>
        </div>
      )}
    </>
  );
};

export const Textarea = ({
  label,
  name,
  autoComplete,
  placeholder,
  type,
  required,
  register,
  errors,
  validations,
  minRows,
  maxRows,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name}>
          <span className="text-sm mb-2 block">{label}</span>
        </label>
      )}
      <TextareaAutosize
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-theme-primary focus:border-theme-primary focus:z-10 sm:text-sm"
        placeholder={placeholder}
        minRows={minRows}
        maxRows={maxRows}
        {...register(name, {
          ...validations,
        })}
      />
      {errors && errors[name] && (
        <div className="text-xs text-red-800 mt-2">
          <span>{errors[name]?.message}</span>
        </div>
      )}
    </>
  );
};
