import React from "react";
import Head from "next/head";
import Main from "@/components/layouts/Main";
import Container from "@/components/layouts/Container";
import Heading from "@/components/core/Heading";
import Button from "@/components/core/Button";
import Header from "@/components/modules/Header";
import Section from "@/components/layouts/Section";

const login = () => {
  return (
    <>
      <Header />
      <Main>
        <Section>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <Heading tag="h1" className="mt-6 text-center text-3xl font-extrabold">
                  Sign in to your account
                </Heading>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      {" "}
                      Forgot your password?{" "}
                    </a>
                  </div>
                </div>

                <div>
                  <Button variant="primary" className="w-full">
                    Sign in
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Section>
      </Main>
    </>
  );
};

export default login;
