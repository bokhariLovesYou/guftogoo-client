import React, { Fragment } from "react";
import Heading from "@/components/core/Heading";
import { Dialog, Transition } from "@headlessui/react";
import Button from "@/components/core/Button";

const Modal = ({
  openModal,
  handleModal,
  heading,
  description,
  children,
  buttonTitle,
  buttonHandler,
  buttonVariant,
  isLoading,
}) => {
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          handleModal(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {heading || description ? (
                <div className="bg-white bg-gray-50 border-b px-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <>
                      {heading && (
                        <Dialog.Title as="div" className="text-lg leading-6">
                          <Heading tag="h2" size="h4">
                            {heading}
                          </Heading>
                        </Dialog.Title>
                      )}
                      {description && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-0">{description}</p>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              ) : (
                ``
              )}
              <div className=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
              <div className="bg-gray-50 border-t px-4 py-5 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  withoutDestination
                  variant="ghost"
                  className="ml-4"
                  onClick={() => handleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={buttonVariant}
                  withoutDestination
                  onClick={buttonHandler}
                  isLoading={isLoading}
                >
                  {buttonTitle}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
