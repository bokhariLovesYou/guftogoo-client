import { createContext, useContext, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
const AppContext = createContext();

export function AppWrapper({ children }) {
  const [globalState, setGlobalState] = useState(null);
  const [user, setUser] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  const handlers = {
    // Global Handlers Here
    checkLogin: async () => {
      let token;
      const cookies = parseCookies();
      if (!cookies.token || user.isLoggedIn) {
        setUser((prevState) => ({ ...prevState, isLoading: false }));
        return null;
      }
      setUser((prevState) => ({ ...prevState, isLoading: true }));
      token = cookies.token;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser((prevState) => ({
            ...prevState,
            ...res.data,
            isLoggedIn: true,
            isLoading: false,
          }));
          return res;
        })
        .catch((err) => {
          console.log(err);
          setUser((prevState) => ({ ...prevState, isLoggedIn: false, isLoading: false }));
          return err.response;
        });
    },
  };

  return (
    <AppContext.Provider value={{ user, globalState, handlers }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
