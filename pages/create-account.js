import React, { useState } from "react";
import Heading from "@/components/core/Heading";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Header from "@/components/modules/Header";
import AccountForm from "@/components/modules/AccountForm";
import Section from "@/components/layouts/Section";
import { useForm } from "react-hook-form";
import { Schema__Form__CreateAccount } from "@/lib/schema";
// XHR
import axios from "axios";
import { sleeper } from "@/lib/Helpers";

const Signup = () => {
  const {
    register,
    handleSubmit,
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

  const onSubmit = (data) => {
    setNewUser((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      username: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, payload)
        .then(sleeper(1500))
        .then((res) => {
          console.log(res);
          setNewUser((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
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
                />
              </div>
            </div>
          </Section>
        </Container>
      </Main>
    </>
  );
};

export default Signup;
