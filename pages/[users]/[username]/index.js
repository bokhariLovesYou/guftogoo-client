import React, { useState } from "react";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Section from "@/components/layouts/Section";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import Header from "@/components/modules/Header";
import { Schema__TrendingTopics, Schema__TrendingIndustries } from "@/lib/Schema";
import TrendingTopics from "@/components/modules/TrendingTopics";
import Avatar from "@/components/core/Avatar";
import CardWrapper from "@/components/core/CardWrapper";
import { useAppContext } from "@/context/AppWrapper";
import { SSR__UserByUsernameGET } from "@/lib/Fetcher";
import { format } from "date-fns";

const UserIndex = ({ data }) => {
  const { user, handlers } = useAppContext();
  data = data[0];
  const {
    id,
    firstName,
    lastName,
    createdAt,
    profileBio,
    profileTagline,
    avatar,
    followers,
    following,
  } = data;
  const [followersCount, setFollowersCount] = useState(followers.length);
  let avatarImage;
  let followingIds;
  let currentlyFollowing = false;
  let myProfile = false;
  if (avatar) {
    avatarImage = {
      src: `${process.env.NEXT_PUBLIC_MEDIA_URL}${avatar.url}`,
      alt: `Profile Picture for ${firstName} ${lastName} at Guftogoo`,
    };
  }
  if (user && user.isLoggedIn) {
    followingIds = user.following.map((elem) => elem.id);
    currentlyFollowing = followingIds.includes(id);
    myProfile = id === user.id;
  }
  console.log(user);
  return (
    <>
      <Header />
      <Main style={{ backgroundColor: "#fafbff", minHeight: "100vh" }}>
        <Section>
          <Container>
            <div className="flex -mx-3">
              <div className="px-3 w-full lg:max-w-[13%]">
                <div className="py-6 Navigation text-sm sticky top-0">
                  <TrendingTopics title="Trending Topics" topics={Schema__TrendingTopics} />
                  <div className="mt-10">
                    <TrendingTopics title="Industries" topics={Schema__TrendingIndustries} />
                  </div>
                </div>
              </div>
              <div className="px-3 w-full lg:max-w-[87%]">
                <div className="border-l min-h-screen">
                  <div className="mx-auto w-[80%]">
                    <div className="px-16 py-12">
                      <div className="mb-12">
                        <div className="flex -mx-4 justify-between items-center">
                          <div className="px-4">
                            <div className="flex -mx-4 items-center">
                              <div className="px-4">
                                <div className="">
                                  <Avatar image={avatarImage} size="extraLarge" />
                                </div>
                              </div>
                              <div className="px-4">
                                {firstName && lastName && (
                                  <div className="mb-1">
                                    <Heading tag="h1" size="h3" className="mb-3">
                                      {firstName} {lastName}
                                    </Heading>
                                  </div>
                                )}
                                {profileTagline && (
                                  <div className="mb-3">
                                    <p className="text-md mb-0">{profileTagline}</p>
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center -mx-2 text-sm">
                                    <div className="px-2">
                                      <p className="mb-0">
                                        <strong>{followersCount}</strong> Followers
                                      </p>
                                    </div>
                                    <div className="px-2">
                                      <p className=" mb-0">
                                        <strong>{following.length}</strong> Following
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4">
                            <>
                              {!myProfile && (
                                <>
                                  {!user.isLoading && (
                                    <>
                                      {currentlyFollowing ? (
                                        <Button
                                          onClick={() => {
                                            handlers.handleFollow(id, `unfollow`);
                                            setFollowersCount(followersCount - 1);
                                          }}
                                          withoutDestination
                                        >
                                          Following
                                        </Button>
                                      ) : (
                                        <Button
                                          onClick={() => {
                                            handlers.handleFollow(id);
                                            setFollowersCount(followersCount + 1);
                                          }}
                                          withoutDestination
                                        >
                                          Follow
                                        </Button>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                      <CardWrapper className="mb-8">
                        <div className="flex -mx-3 items-center">
                          <div className="px-3 w-full max-w-[33.336%]">
                            <div className="flex -mx-2 items-center">
                              <div className="px-2">
                                <a href="#" target="_blank">
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 448 512"
                                  >
                                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                                  </svg>
                                </a>
                              </div>
                              <div className="px-2">
                                <a href="#" target="_blank">
                                  <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 512 512"
                                  >
                                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                                  </svg>
                                </a>
                              </div>
                              <div className="px-2">
                                <a href="#" target="_blank">
                                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41c2.93 1.18 5 4.05 5 7.41 0 2.08-.8 3.97-2.1 5.39M11 19.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"></path>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="px-3 w-full max-w-[33.336%]">
                            <div className="flex -mx-1 items-center">
                              <div className="px-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 384 512">
                                  <path d="M192 96c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm0-256C85.961 0 0 85.961 0 192c0 77.413 26.97 99.031 172.268 309.67 9.534 13.772 29.929 13.774 39.465 0C357.03 291.031 384 269.413 384 192 384 85.961 298.039 0 192 0zm0 473.931C52.705 272.488 32 256.494 32 192c0-42.738 16.643-82.917 46.863-113.137S149.262 32 192 32s82.917 16.643 113.137 46.863S352 149.262 352 192c0 64.49-20.692 80.47-160 281.931z"></path>
                                </svg>
                              </div>
                              <div className="px-1">
                                <span className="">Nairobi, Kenya</span>
                              </div>
                            </div>
                          </div>
                          <div className="px-3 w-full max-w-[33.336%]">
                            <div className="flex -mx-1 items-center">
                              <div className="px-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                                  <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"></path>
                                </svg>
                              </div>
                              {createdAt && (
                                <div className="px-1">
                                  <span className="">
                                    Member since {format(new Date(createdAt), "MMMM, yyyy")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardWrapper>
                      {profileBio && (
                        <CardWrapper className="mb-8">
                          <div className="">
                            <Heading tag="h2" size="h4" className="mb-4">
                              About Me
                            </Heading>
                            <div className="prose max-w-[100%]">
                              <p className="whitespace-pre-line">{profileBio}</p>
                            </div>
                          </div>
                        </CardWrapper>
                      )}

                      <CardWrapper className="mb-8">
                        <div className="">
                          <Heading tag="h2" size="h4" className="mb-4">
                            I am available for
                          </Heading>
                          <div className="prose max-w-[100%]">
                            <p>
                              I am available for mentoring, training, community building and
                              learnerships!
                            </p>
                          </div>
                        </div>
                      </CardWrapper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default UserIndex;

export async function getServerSideProps(context) {
  console.log(context.params);
  const username = context.params.username;
  return SSR__UserByUsernameGET(username);
}
