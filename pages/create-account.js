import React from "react";
import Link from "next/link";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import Header from "@/components/modules/Header";
import Section from "@/components/layouts/Section";

const Signup = () => {
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
                <form
                  className="mt-8 py-10 px-6 rounded-md bg-white border"
                  action="#"
                  method="POST"
                >
                  <input type="hidden" name="remember" value="true" />
                  <div className="mb-6">
                    <div className="mb-4">
                      <div className="flex -mx-2">
                        <div className="px-2">
                          <label htmlFor="firstName">
                            <span className="text-sm mb-2 block">First Name</span>
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="firstName"
                            autoComplete="firstName"
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-theme-primary focus:border-theme-primary focus:z-10 sm:text-sm"
                            placeholder=""
                          />
                        </div>
                        <div className="px-2">
                          <label htmlFor="lastName">
                            <span className="text-sm mb-2 block">Last Name</span>
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="lastName"
                            autoComplete="lastName"
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-theme-primary focus:border-theme-primary focus:z-10 sm:text-sm"
                            placeholder=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email">
                        <span className="text-sm mb-2 block">Email address</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-theme-primary focus:border-theme-primary focus:z-10 sm:text-sm"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label htmlFor="password">
                        <span className="text-sm mb-2 block">Password</span>
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-theme-primary focus:border-theme-primary focus:z-10 sm:text-sm"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div>
                    <Button variant="primary" className="w-full">
                      Create Account
                    </Button>
                  </div>
                  <div className="mt-5 text-sm text-center">
                    <Link href="/create-account">
                      <span className="font-medium text-indigo-600 hover:text-theme-primary cursor-pointer">
                        Already have an account? Sign in
                      </span>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </Section>
        </Container>
      </Main>
    </>
  );
};

export default Signup;
