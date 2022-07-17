import React, { useState, useEffect } from "react";
import Heading from "@/components/core/Heading";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Header from "@/components/modules/Header";
import AccountForm from "@/components/modules/AccountForm";
import Section from "@/components/layouts/Section";
import { useForm } from "react-hook-form";
import { Schema__Form__CreateAccount } from "@/lib/Schema";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";
import { useAppContext } from "@/context/AppWrapper";

const Signup = () => {
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
  const [newUser, setNewUser] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = (data) => {
    setNewUser((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, payload)
        .then(sleeper(500))
        .then((res) => {
          console.log(res);
          setNewUser((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          reset();
          setSuccessMessage(
            `Awesome, ${data.firstName}! We just emailed you a verification link at ${data.email}. Please sign in using that link.`
          );
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setErrorMessage(err.response.data.error.message);
          }
          setNewUser((prevState) => ({ ...prevState, isError: true, isLoading: false }));
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
                        Create an account on Guftogoo for free!
                      </Heading>
                    </div>
                    <AccountForm
                      onSubmit={handleSubmit(onSubmit)}
                      register={register}
                      schema={Schema__Form__CreateAccount}
                      errors={errors}
                      isDirty={isDirty}
                      isValid={isValid}
                      isLoading={newUser.isLoading}
                      errorMessage={errorMessage}
                      successMessage={successMessage}
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

export default Signup;
