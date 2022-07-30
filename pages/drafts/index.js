import React, { useState } from "react";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Section from "@/components/layouts/Section";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import Header from "@/components/modules/Header";
import { Schema__TrendingTopics, Schema__Form__CreateNewDraft } from "@/lib/Schema";
import TrendingArticles from "@/components/modules/TrendingArticles";
import TrendingTopics from "@/components/modules/TrendingTopics";
import CardWrapper from "@/components/core/CardWrapper";
import Modal from "@/components/modules/Modal";
import Form from "@/components/modules/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { sleeper, slugify, generateRandomNumber } from "@/lib/Helpers";
import { useAppContext } from "@/context/AppWrapper";
import { useDraftsByUserIdGET } from "@/lib/Fetcher";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { useSWRConfig } from "swr";

const DraftsIndex = () => {
  const { handlers, user } = useAppContext();
  const {
    data,
    isLoading: draftsLoading,
    isError: draftsError,
  } = useDraftsByUserIdGET(user.id, user.token);
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: `all`,
  });
  const [newDraft, setNewDraft] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [deleteDraft, setDeleteDraft] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalIntent, setModalIntent] = useState(null);
  const [deleteIntent, setDeleteIntent] = useState(null);
  let drafts;
  if (data) {
    drafts = data.data;
  }

  const handleModal = (bool) => {
    setOpenModal(bool);
    if (!bool) {
      setTimeout(() => {
        setModalIntent(null);
      }, 500);
    }
  };

  const onSubmit = (data) => {
    setNewDraft((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      data: {
        draftTitle: data.articleTitle.trim(),
        author: user.id,
        slug: `${slugify(data.articleTitle)}-${Date.now()}${user.id}${generateRandomNumber()}`,
        status: `draft`,
      },
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/articles`, payload, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(sleeper(500))
        .then((res) => {
          if (typeof window !== "undefined") {
            window.location.href = `/drafts/${res.data.data.id}`;
          }
          setNewDraft((prevState) => ({ ...prevState, isLoading: false }));
          handleModal(false);
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setErrorMessage(err.response.data.error.message);
          }
          setNewDraft((prevState) => ({ ...prevState, isLoading: false }));
        });
    };
    postPayload();
  };

  const onDelete = () => {
    setDeleteDraft((prevState) => ({ ...prevState, isLoading: true }));
    const postPayload = async () => {
      await axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/${deleteIntent.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(sleeper(500))
        .then((res) => {
          mutate([
            `${process.env.NEXT_PUBLIC_API_URL}/articles?filters[author][id][$eq]=${user.id}&populate=featuredImage`,
            user.token,
          ]);
          toast.success(`${deleteIntent.title} deleted successfully`);
          handleModal(false);
          setTimeout(() => {
            setDeleteDraft((prevState) => ({ ...prevState, isLoading: false }));
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Oops. Something went wrong, please try again later.");
          setDeleteDraft((prevState) => ({ ...prevState, isLoading: false }));
        });
    };
    postPayload();
  };

  return (
    <>
      <Header />
      <Main style={{ backgroundColor: "#fafbff", minHeight: "100vh" }}>
        <Section>
          <Container>
            <div className="flex -mx-3">
              <div className="px-3 w-full lg:max-w-[17%]">
                <div className="py-6 Navigation text-sm sticky top-0">
                  <TrendingTopics title="Trending Topics" topics={Schema__TrendingTopics} />
                </div>
              </div>
              <div className="px-3 w-full lg:max-w-[60%]">
                <div className="Timeline py-6">
                  <div className="pb-4 mb-4 border-b-2">
                    <CardWrapper>
                      <div className="py-3">
                        <Heading tag="h1" size="h3" className="mb-4">
                          Your Drafts
                        </Heading>
                        <p className="text-md mb-0">All your pending drafts are here</p>
                        <Button
                          withoutDestination
                          className="mt-6"
                          onClick={() => {
                            setModalIntent(`new`);
                            handleModal(true);
                          }}
                        >
                          Create New Draft
                        </Button>
                      </div>
                    </CardWrapper>
                  </div>
                  {(draftsLoading || deleteDraft.isLoading) && (
                    <>
                      {[...Array(4)].map((elem, index) => {
                        return (
                          <CardWrapper className="mb-4" key={index}>
                            <div className="flex -mx-2">
                              <div className="px-2 w-[60%]">
                                <div className="flex items-center">
                                  <div className="w-44 h-28 rounded-lg animate-pulse bg-gray-200 mr-4"></div>
                                  <div className="">
                                    <div className="w-56 h-4 rounded-lg bg-gray-200 animate-pulse mb-4"></div>
                                    <div className="w-36 h-4 rounded-lg bg-gray-200 animate-pulse mb-2"></div>
                                    <div className="w-28 h-3 rounded-lg bg-gray-200 animate-pulse mb-2"></div>
                                    <div className="w-24 h-3 rounded-lg bg-gray-200 animate-pulse"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="px-2 w-[40%]">
                                <div className="text-right">
                                  <div className="w-28 h-8 rounded-md bg-gray-200 animate-pulse ml-auto"></div>
                                </div>
                              </div>
                            </div>
                          </CardWrapper>
                        );
                      })}
                    </>
                  )}
                  {!draftsLoading && (
                    <>
                      {drafts.length < 1 ? (
                        <div className="min-h-[300px] flex flex-col items-center justify-center">
                          <div className="text-center text-gray-500">
                            <div className="mb-4">
                              <svg
                                className="w-12 h-12 mx-auto"
                                fill="currentColor"
                                viewBox="0 0 384 512"
                              >
                                <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16zm-48-244v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm0 64v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm0 64v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12z"></path>
                              </svg>
                            </div>
                            <Heading tag="h2" size="h4" className="text-gray-500">
                              You don't have any drafts yet.
                            </Heading>
                            <Button
                              withoutDestination
                              className="mt-6"
                              onClick={() => {
                                setModalIntent(`new`);
                                handleModal(true);
                              }}
                            >
                              Create New Draft
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {drafts.map((elem, index) => {
                            const { attributes } = elem;
                            const destination = `/drafts/${elem.id}`;
                            return (
                              <CardWrapper key={index} className="mb-4">
                                <div className="flex justify-between -mx-2">
                                  <div className="px-2">
                                    <div className="flex">
                                      <div className="w-44 h-28 rounded-lg bg-gray-200 mr-4 relative">
                                        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
                                          <span className="text-sm">NO COVER</span>
                                        </div>
                                        <a
                                          href={destination}
                                          className="absolute inset-0 z-10 w-[100%] h-[100%]"
                                          title={`Edit ${attributes.draftTitle}`}
                                        ></a>
                                      </div>
                                      <div className="">
                                        <a href={destination}>
                                          <Heading
                                            tag="h2"
                                            size="h4"
                                            className="hover:text-theme-primary"
                                          >
                                            {attributes.draftTitle}
                                          </Heading>
                                        </a>
                                        {attributes.draftDescription && (
                                          <p className="mb-3 mt-3">{attributes.draftDescription}</p>
                                        )}
                                        <p className="mb-0">
                                          <span className="text-gray-600">Last Updated: </span>
                                          {format(new Date(attributes.updatedAt), "MMMM d, yyyy")}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="px-2">
                                    <div className="pl-4">
                                      <div className="flex items-center">
                                        <div className="">
                                          <a
                                            href={destination}
                                            title={`Edit ${attributes.draftTitle}`}
                                          >
                                            <button
                                              type="button"
                                              className="hover:bg-gray-100 rounded-md px-3 py-2"
                                            >
                                              <span className="">Edit</span>
                                            </button>
                                          </a>
                                        </div>
                                        <div className="">
                                          <button
                                            type="button"
                                            className="hover:bg-gray-100 rounded-md px-3 py-2"
                                            aria-label="Delete"
                                            onClick={() => {
                                              setModalIntent(`delete`);
                                              setDeleteIntent({
                                                title: attributes.draftTitle,
                                                id: elem.id,
                                              });
                                              handleModal(true);
                                            }}
                                          >
                                            <svg
                                              className="w-5 h-5"
                                              fill="currentColor"
                                              viewBox="0 0 448 512"
                                            >
                                              <path d="M296 432h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zm-160 0h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8zM440 64H336l-33.6-44.8A48 48 0 00264 0h-80a48 48 0 00-38.4 19.2L112 64H8a8 8 0 00-8 8v16a8 8 0 008 8h24v368a48 48 0 0048 48h288a48 48 0 0048-48V96h24a8 8 0 008-8V72a8 8 0 00-8-8zM171.2 38.4A16.1 16.1 0 01184 32h80a16.1 16.1 0 0112.8 6.4L296 64H152zM384 464a16 16 0 01-16 16H80a16 16 0 01-16-16V96h320zm-168-32h16a8 8 0 008-8V152a8 8 0 00-8-8h-16a8 8 0 00-8 8v272a8 8 0 008 8z"></path>
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardWrapper>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="px-3 w-full lg:max-w-[23%]">
                <div className="LandingSidebar py-6 text-sm sticky top-0">
                  <TrendingArticles />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
      <Modal
        openModal={openModal}
        handleModal={handleModal}
        heading={modalIntent === `new` ? `Add a new draft` : null}
        description={
          modalIntent === `new` ? `Get creative and start drafting your next thought` : null
        }
        buttonTitle={modalIntent === `new` ? `Create New Draft` : `Delete`}
        buttonHandler={modalIntent === `new` ? handleSubmit(onSubmit) : () => onDelete()}
        buttonVariant={modalIntent === `new` ? `primary` : `danger`}
        isLoading={modalIntent === `new` ? newDraft.isLoading : deleteDraft.isLoading}
      >
        {modalIntent === `new` && (
          <Form
            removeWrapper
            schema={Schema__Form__CreateNewDraft}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            isDirty={isDirty}
            isValid={isValid}
            isLoading={newDraft.isLoading}
            errorMessage={errorMessage}
          ></Form>
        )}
        {modalIntent === `delete` && (
          <>
            Please note: This will delete <strong>{deleteIntent.title}</strong> forever. This action
            is irreversible.
          </>
        )}
      </Modal>
      <Toaster />
    </>
  );
};

export default DraftsIndex;
