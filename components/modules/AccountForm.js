import React from "react";
import Link from "next/link";
import { Input } from "@/components/core/FormElements";
import Button from "@/components/core/Button";

const AccountForm = ({
  onSubmit,
  schema,
  register,
  errors,
  isDirty,
  isValid,
  isLoading,
  errorMessage,
  successMessage,
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 py-10 px-6 rounded-md bg-white border">
      <div className="mb-6">
        {schema?.fields.map((elem, index) => {
          const { group } = elem;
          return (
            <>
              {group && group.length > 0 ? (
                <div className="mb-4" key={index}>
                  <div className="flex -mx-2">
                    {elem.group.map((elem2) => {
                      return (
                        <div className="px-2" key={elem2.name}>
                          <Input
                            key={elem2.name}
                            label={elem2.label}
                            name={elem2.name}
                            type={elem2.type}
                            validations={elem2.validations}
                            register={register}
                            errors={errors}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mb-4" key={elem.name}>
                  <Input
                    key={elem.name}
                    label={elem.label}
                    name={elem.name}
                    type={elem.type}
                    validations={elem.validations}
                    register={register}
                    errors={errors}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
      {schema?.helpLinkAboveButton?.title && (
        <div className="flex items-center justify-center">
          <div className="text-sm mb-5">
            <a
              href={schema.helpLinkAboveButton.destination}
              className="font-medium text-indigo-600 hover:text-theme-primary"
            >
              {schema.helpLinkAboveButton.title}
            </a>
          </div>
        </div>
      )}
      {schema?.button?.title && (
        <div>
          <Button
            withoutDestination={true}
            type={schema.button.type}
            variant={schema.button.variant}
            className={schema.button.className + ``}
            disabled={!isDirty || !isValid}
            isLoading={isLoading}
          >
            {schema.button.title}
          </Button>
        </div>
      )}
      {schema?.helpLinkBelowButton?.title && (
        <div className="mt-5 text-sm text-center">
          <Link href={schema.helpLinkBelowButton.destination}>
            <span className="font-medium text-indigo-600 hover:text-theme-primary cursor-pointer">
              {schema.helpLinkBelowButton.title}
            </span>
          </Link>
        </div>
      )}
      {errorMessage && (
        <div className="text-xs text-red-800 mt-5 text-center">
          <span>{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div className="bg-teal-100 text-xs mt-5 rounded text-teal-900 px-4 py-3" role="alert">
          <div className="flex">
            <div>
              <span>{successMessage}</span>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default AccountForm;
