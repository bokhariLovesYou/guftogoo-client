import React, { useState, useEffect } from "react";
import Settings from "@/components/layouts/Settings";
import CardWrapper from "@/components/core/CardWrapper";
import Form from "@/components/modules/Form";
import { useAppContext } from "@/context/AppWrapper";
import { Schema__Form__Social } from "@/lib/Schema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";
import toast, { Toaster } from "react-hot-toast";

const SettingsSocial = () => {
  const { user, recentlyUploadedImages, handlers } = useAppContext();
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
    reset(user);
  }, [user]);

  const onSubmit = (data) => {
    setProfileUpdate((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      profileTagline: data.profileTagline,
      profileBio: data.profileBio,
      avatar: recentlyUploadedImages.avatar ? recentlyUploadedImages.avatar.id : user.avatar.id,
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
          handlers.mutateUser({
            firstName: data.firstName,
            lastName: data.lastName,
            profileTagline: data.profileTagline,
            profileBio: data.profileBio,
            avatar: recentlyUploadedImages.avatar ? recentlyUploadedImages.avatar : user.avatar,
          });
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
    <Settings heading="Social Accounts">
      <Toaster />
      <CardWrapper>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          schema={Schema__Form__Social}
          errors={errors}
          isDirty={true}
          isValid={isValid}
          isLoading={profileUpdate.isLoading}
          errorMessage={errorMessage}
          avatar={user.avatar}
        />
      </CardWrapper>
    </Settings>
  );
};

export default SettingsSocial;
