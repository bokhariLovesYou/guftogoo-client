import React from "react";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Section from "@/components/layouts/Section";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import Header from "@/components/modules/Header";
import { Schema__TrendingTopics, Schema__TrendingIndustries } from "@/lib/Schema";
import TrendingArticles from "@/components/modules/TrendingArticles";
import TrendingTopics from "@/components/modules/TrendingTopics";

const Index = () => {
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
              <div className="px-3 w-full lg:max-w-[63%]">
                <div className="Timeline border-l border-r">
                  <div className="Timeline__Card bg-theme-primary text-white py-24 px-5 border-b">
                    <div className="Timeline__Card__Body mb-3">
                      <Heading className="text-white mb-5" tag="h1" size="h2">
                        A Community for employees by employees.
                      </Heading>
                      <p>
                        Guftogoo is a place where you can post your heart out. No judgements. Just
                        plain clarity for all working professionals in Pakistan.
                      </p>
                    </div>
                  </div>
                  {[...Array(8)].map((elem, index) => {
                    return (
                      <div key={index} className="Timeline__Card bg-white py-5 px-5 border-b">
                        <div className="Timeline__Card__Header mb-6">
                          <div className="flex -mx-2 items-center">
                            <div className="px-2">
                              <div className="">
                                <img
                                  className="w-12 h-12"
                                  style={{ borderRadius: "100px" }}
                                  src="https://hashnode.com/_next/image?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1655371679782%2FzFqTqZbLP.jpeg%3Fw%3D500%26h%3D500%26fit%3Dcrop%26crop%3Dfaces%26auto%3Dcompress%2Cformat%26format%3Dwebp&w=3840&q=75"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="px-2">
                              <div className="mb-1">
                                <span className="font-bold text-theme-heading">Stas Melnikov</span>
                              </div>
                              <div>
                                <span className="">melnik909.hashnode.dev · Jul 14, 2022</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="Timeline__Card__Body mb-3">
                          <Heading tag="h2" size="h4">
                            What happens after adding display: flex?
                          </Heading>
                          <p>
                            In my experience, very few developers know what happens after adding
                            display: flex. If I asked how margin behavior changes 99% of developers
                            don't answer. So I created a live cheat sheet and wrote this article to
                            fix this situation. I'm su…
                          </p>
                        </div>
                        <div className="Timeline__Card__footer mt-7">
                          <div className="flex -mx-3 justify-between items-center">
                            <div className="px-3">
                              <div className="flex -mx-2 items-center">
                                <div className="px-2">
                                  <span className="px-3 py-1 border rounded text-xs font-bold">
                                    Topic 1
                                  </span>
                                </div>
                                <div className="px-2">
                                  <span className="px-3 py-1 border rounded text-xs font-bold">
                                    Topic 2
                                  </span>
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
                                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                        />
                                      </svg>
                                    </div>
                                    <div className="px-1">
                                      <span className="text-xs">19</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="px-3">
                              <Button variant="ghost">Read More</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="px-3 w-full lg:max-w-[24%]">
                <div className="LandingSidebar py-6 text-sm sticky top-0">
                  <TrendingArticles />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default Index;
