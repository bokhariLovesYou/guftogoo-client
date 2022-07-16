import Link from "next/link";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Section from "@/components/layouts/Section";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import Header from "@/components/modules/Header";
import { DATA__TrendingTopics } from "@/lib/data";

const Index = () => {
  return (
    <>
      <Header />
      <Main style={{ backgroundColor: "#fafbff", minHeight: "100vh" }}>
        <Section>
          <Container>
            <div className="flex -mx-3">
              <div className="px-3 w-full lg:max-w-[15%]">
                <div className="py-6 Navigation text-sm sticky top-0">
                  <div className="mb-3">
                    <div className="flex -mx-2 items-center">
                      <div className="px-2">
                        <span className="font-bold text-theme-heading">Trending Topics</span>
                      </div>
                      <div className="px-2">
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
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <nav>
                    <ul>
                      {DATA__TrendingTopics.map((elem, index) => {
                        return (
                          <li className="mb-2" key={index}>
                            <Link href={elem.url}>{elem.title}</Link>
                          </li>
                        );
                      })}
                      <li className="mt-3">
                        <div className="flex -mx-1 items-center">
                          <div className="px-1">
                            <svg className="h-4 w-4" viewBox="0 0 512 512">
                              <path
                                fill="currentColor"
                                d="M232 256c0-13.3 10.7-24 24-24s24 10.7 24 24-10.7 24-24 24-24-10.7-24-24zm116.6-133.1c25-8.3 48.8 15.5 40.5 40.5l-48.9 146.5c-4.7 14.3-16 25.6-30.3 30.3l-146.5 48.9c-25 8.3-48.8-15.5-40.5-40.5l48.9-146.5c4.7-14.3 16-25.6 30.3-30.3l146.5-48.9zm10.1 30.4-146.5 48.8c-4.7 1.6-8.5 5.4-10.1 10.1l-48.8 146.5 146.5-48.8c4.7-1.6 8.5-5.4 10.1-10.1l48.8-146.5zM0 256C0 114.6 114.6 0 256 0s256 114.6 256 256-114.6 256-256 256S0 397.4 0 256zm256 224c123.7 0 224-100.3 224-224S379.7 32 256 32 32 132.3 32 256s100.3 224 224 224z"
                              ></path>
                            </svg>
                          </div>
                          <div className="px-1">
                            <span>Explore</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="px-3 w-full lg:max-w-[60%]">
                <div className="Timeline border-l border-r">
                  <div className="Timeline__Card bg-theme-primary text-white py-14 px-5 border-b">
                    <div className="Timeline__Card__Body mb-3">
                      <Heading className="text-white mb-5" tag="h1" size="h2">
                        A Community by employees for employees.
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
              <div className="px-3 w-full lg:max-w-[25%]">
                <div className="LandingSidebar py-6 text-sm sticky top-0">
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
                              <div>
                                <span>Stas Melnikov</span>
                              </div>
                              <div className="mt-3">
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
