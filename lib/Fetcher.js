import useSWR from "swr";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";

// Main Fetcher Function
const Fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then(sleeper(300))
    .then((res) => res.data);

// *****Get Requests (Client Side)
// export const useUserGET = (params, token, shouldFetch) => {
//   const { data, error } = useSWR(
//     shouldFetch ? [`${process.env.NEXT_PUBLIC_API_URL}/users/me${params}`, token] : null,
//     Fetcher
//   );
//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

export const useDraftsByUserIdGET = (userId, token) => {
  const { data, error } = useSWR(
    userId && token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/articles?filters[author][id][$eq]=${userId}&populate=featuredImage`,
          token,
        ]
      : undefined,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDraftByIdGET = (id, token) => {
  const { data, error } = useSWR(
    id && token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}?populate=*`, token]
      : undefined,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

// *****Get Requests (Server Side)
export const SSR__UserByUsernameGET = async (username) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users?filters[username][$eq]=${username}&populate=avatar&populate=followers&populate=following`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};
