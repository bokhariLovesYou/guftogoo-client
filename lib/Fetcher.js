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
