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
