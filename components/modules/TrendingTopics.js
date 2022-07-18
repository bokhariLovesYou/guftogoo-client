import React from "react";
import Link from "next/link";

const TrendingTopics = ({ topics, title }) => {
  return (
    <>
      <div className="mb-3">
        <div className="flex -mx-2 items-center">
          <div className="px-2">
            <span className="font-bold text-theme-heading">{title}</span>
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
          {topics?.map((elem, index) => {
            return (
              <li className="mb-2" key={index}>
                <Link href={elem.destination}>{elem.title}</Link>
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
    </>
  );
};

export default TrendingTopics;
