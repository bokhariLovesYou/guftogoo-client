import React from "react";
import Heading from "@/components/core/Heading";

const TrendingArticles = () => {
  return (
    <>
      <div className="mb-2">
        <Heading tag="h2" size="h5">
          Trending Articles
        </Heading>
      </div>
      <div className="mt-5">
        {[...Array(4)].map((elem, index) => {
          return (
            <div key={index} className="px-5 py-5 bg-white border rounded mb-4">
              <div className="flex -mx-2">
                <div className="px-2 w-[25%]">
                  <div className="">
                    <img
                      className="w-12 h-12"
                      style={{ borderRadius: "100px" }}
                      src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1655371679782%2FzFqTqZbLP.jpeg%3Fw%3D500%26h%3D500%26fit%3Dcrop%26crop%3Dfaces%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=3840&q=75"
                      alt=""
                    />
                  </div>
                </div>
                <div className="px-2 w-[75%]">
                  <div>
                    <Heading tag="h3" size="p">
                      What happens after adding display: flex?
                    </Heading>
                  </div>
                  <div className="mt-2">
                    <span>Stas Melnikov</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex -mx-2">
                      <div className="px-2">
                        <div className="flex -mx-1 items-center">
                          <div className="px-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                          </div>
                          <div className="px-1">
                            <span className="text-xs">19</span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2">
                        <div className="flex -mx-1 items-center">
                          <div className="px-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                              />
                            </svg>
                          </div>
                          <div className="px-1">
                            <span className="text-xs">4</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrendingArticles;
