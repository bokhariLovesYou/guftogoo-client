import React from "react";
import Link from "next/link";
import CardWrapper from "@/components/core/CardWrapper";

const TrendingTopics = ({ topics, title }) => {
  return (
    <>
      <CardWrapper>
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
          </ul>
        </nav>
      </CardWrapper>
    </>
  );
};

export default TrendingTopics;
