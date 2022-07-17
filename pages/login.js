import React, { useState, useEffect } from "react";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Heading from "@/components/core/Heading";
import Header from "@/components/modules/Header";
import Section from "@/components/layouts/Section";
import AccountForm from "@/components/modules/AccountForm";
import { useForm } from "react-hook-form";
import { Schema__Form__Login } from "@/lib/Schema";
import { setCookie } from "nookies";
import { useAppContext } from "@/context/AppWrapper";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";

const Login = () => {
  const { handlers, user } = useAppContext();
  useEffect(() => {
    handlers.checkLogin();
  }, []);
  if (user.isLoggedIn) {
    location.replace("/");
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: `all`,
  });
  const [loginUser, setLoginUser] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (data) => {
    setLoginUser((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      identifier: data.email,
      password: data.password,
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, payload)
        .then(sleeper(500))
        .then((res) => {
          console.log(res);
          const jwt = res.data.jwt;
          const id = res.data.user.id;
          setLoginUser((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          setCookie({ res }, "token", jwt, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          setCookie({ res }, "id", id, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          location.replace("/");
          reset();
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setErrorMessage(err.response.data.error.message);
          }
          setLoginUser((prevState) => ({ ...prevState, isError: true, isLoading: false }));
        });
    };
    postPayload();
  };

  return (
    <>
      {!user.isLoggedIn && (
        <>
          <Header />
          <Main style={{ backgroundColor: "#fafbff", minHeight: "100vh" }}>
            <Container>
              <Section>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8">
                    <div>
                      <Heading tag="h1" className="mt-6 text-center text-3xl font-extrabold">
                        Sign in to your account
                      </Heading>
                    </div>
                    <AccountForm
                      onSubmit={handleSubmit(onSubmit)}
                      register={register}
                      schema={Schema__Form__Login}
                      errors={errors}
                      isDirty={isDirty}
                      isValid={isValid}
                      isLoading={loginUser.isLoading}
                      errorMessage={errorMessage}
                    />
                  </div>
                </div>
              </Section>
            </Container>
          </Main>
        </>
      )}
    </>
  );
};

export default Login;
