import React, { useState, useEffect } from "react";
import Main from "@/components/wrappers/Main";
import Container from "@/components/wrappers/Container";
import Section from "@/components/wrappers/Section";
import Heading from "@/components/core/Heading";
import Header from "@/components/modules/Header";
import CardWrapper from "@/components/wrappers/CardWrapper";
import Form from "@/components/modules/Form";
import { useAppContext } from "@/context/AppWrapper";
import { Schema__Form__Profile } from "@/lib/Schema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoute from "@/components/modules/ProtectedRoute";

const Settings = () => {
  const { user } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: `all`,
  });
  const [profileUpdate, setProfileUpdate] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log(user);
    reset(user);
  }, [user]);

  const onSubmit = (data) => {
    setProfileUpdate((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      profileTagline: data.profileTagline,
      profileBio: data.profileBio,
    };
    const postPayload = async () => {
      await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, payload, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(sleeper(500))
        .then((res) => {
          console.log(res);
          setProfileUpdate((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          toast.success("Profile updated successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Oops. Something went wrong, please try again later.");
          if (err.response) {
            setErrorMessage(err.response.data.error.message);
          }
          setProfileUpdate((prevState) => ({ ...prevState, isError: true, isLoading: false }));
        });
    };
    postPayload();
  };

  return (
    <>
      <ProtectedRoute />
      {!user.isLoading && user.isLoggedIn && (
        <>
          <Header />
          <Toaster />
          <Main style={{ backgroundColor: "#fafbff", minHeight: "100vh" }}>
            <Section className="py-8">
              <Container>
                <div className="flex -mx-2">
                  <div className="px-2 w-[30%]">
                    <CardWrapper>
                      <Heading tag="h1" size="h3" className="mb-0">
                        User Settings
                      </Heading>
                    </CardWrapper>
                    <CardWrapper className="font-bold">
                      <button
                        type="button"
                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm mb-4 hover:bg-gray-100`}
                      >
                        <svg
                          className="w-6 h-6 mr-2 fill-current dark:text-zp-white"
                          css=""
                          viewBox="0 0 496 512"
                        >
                          <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"></path>
                        </svg>
                        Profile
                      </button>
                      <button
                        type="button"
                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm mb-4 hover:bg-gray-100`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                        Social
                      </button>
                      <button
                        type="button"
                        className={`group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-100`}
                      >
                        <svg className="w-6 h-6 mr-2 fill-current" viewBox="0 0 512 512">
                          <path d="M168 255.1c0-47.7 39.4-88 88-88s88 40.3 88 88c0 49.5-39.4 88.9-88 88.9s-88-39.4-88-88.9zm88-56c-30.9 0-56 26-56 56 0 31.8 25.1 56 56 56s56-24.2 56-56c0-30-25.1-56-56-56zM65.67 230.6l-40.33-36.8c-11.12-10.1-13.68-26.6-6.16-39.6l30.24-52.4c7.52-13.02 23.09-19.05 37.42-14.48l51.96 16.58c13.4-10.34 28.2-18.94 44-25.47l11.7-53.27C197.7 10.47 210.7 0 225.8 0h60.4c15.1 0 28.1 10.47 31.3 25.16l11.7 53.27c14.9 6.53 30.6 15.13 44 25.47l52-16.58c14.3-4.57 29.9 1.46 37.4 14.48l30.2 52.4c7.5 13 5 29.5-6.1 39.6l-40.4 36.8c1.1 8.3 1.7 16.8 1.7 24.5 0 9.5-.6 18-1.7 26.3l40.4 36.8c11.1 10.1 13.6 26.6 6.1 39.6l-30.2 52.4c-7.5 13-23.1 19-37.4 14.5l-52-16.6c-13.4 10.3-29.1 18.9-44 25.5l-11.7 53.2c-3.2 14.7-16.2 25.2-31.3 25.2h-60.4c-15.1 0-28.1-10.5-31.3-25.2l-11.7-53.2c-15.8-6.6-30.6-15.2-44-25.5l-51.96 16.6c-14.33 4.5-29.9-1.5-37.42-14.5l-30.24-52.4c-7.52-13-4.96-29.5 6.16-39.6l40.33-36.8c-1.1-8.3-1.67-16.8-1.67-26.3 0-7.7.57-16.2 1.67-24.5zm92.73-101.4-13.3 10.3-67.97-21.7-30.24 52.4 52.69 48-2.19 16.6c-.92 6.9-1.39 14-1.39 20.3 0 8.1.47 15.2 1.39 22.1l2.19 16.6-52.69 48 30.24 52.4 67.97-21.7 13.3 10.3c11.1 8.6 23.5 15.8 36.6 20.3l15.5 7.3 15.3 69.6h60.4l15.3-69.6 14.6-7.3c14-4.5 26.4-11.7 37.5-20.3l13.3-10.3 68 21.7 30.2-52.4-52.7-48 2.2-16.6c.9-6.9 1.4-14 1.4-21.2 0-7.2-.5-14.3-1.4-21.2l-2.2-16.6 52.7-48-30.2-52.4-68 21.7-13.3-10.3c-11.1-8.6-23.5-15.8-37.5-21.2l-14.6-6.4L286.2 32h-60.4l-15.3 69.6L195 108c-13.1 5.4-25.5 12.6-36.6 21.2z"></path>
                        </svg>
                        Account
                      </button>
                    </CardWrapper>
                  </div>
                  <div className="px-2 w-[70%]">
                    <CardWrapper>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        schema={Schema__Form__Profile}
                        errors={errors}
                        isDirty={true}
                        isValid={isValid}
                        isLoading={profileUpdate.isLoading}
                        errorMessage={errorMessage}
                      />
                    </CardWrapper>
                  </div>
                </div>
              </Container>
            </Section>
          </Main>
        </>
      )}
    </>
  );
};

export default Settings;
