import { createContext, useContext, useState } from "react";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [globalState, setGlobalState] = useState(null);
  const [recentlyUploadedImages, setRecentlyUploadedImages] = useState({
    avatar: null,
  });
  const [user, setUser] = useState({
    isLoading: true,
    isLoggedIn: false,
  });

  const handlers = {
    // Global Handlers Here
    checkLogin: async () => {
      let token;
      const cookies = parseCookies();
      const params = `?populate=avatar&populate=followers&populate=following`;
      if (!cookies.token || user.isLoggedIn) {
        setUser((prevState) => ({ ...prevState, isLoading: false }));
        return null;
      }
      setUser((prevState) => ({ ...prevState, isLoading: true }));
      token = cookies.token;
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users/me${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser((prevState) => ({
            ...prevState,
            ...res.data,
            token: token,
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
    mutateUser: (obj) => {
      setUser((prevState) => ({
        ...prevState,
        ...obj,
      }));
    },
    handleLogout: () => {
      const cookies = parseCookies();
      if (!cookies.token || !user.isLoggedIn) {
        return null;
      }
      destroyCookie(null, "token", {
        path: "/",
      });
      destroyCookie(null, "id", {
        path: "/",
      });
      location.replace("/login");
    },
    handleSetRecentlyUploadedImages: (key, value) => {
      setRecentlyUploadedImages((prevState) => ({ ...prevState, [key]: value }));
    },
    handleFollow: (userId, intent) => {
      if (!user.isLoggedIn) return false;
      let following = user.following.map((elem) => elem.id);
      if (intent === `unfollow`) {
        following = following.filter((elem) => elem !== userId);
      } else {
        following.push(userId);
      }
      const payload = {
        following,
      };
      const postPayload = async () => {
        await axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, payload, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            if (intent === `unfollow`) {
              setUser((prevState) => ({
                ...prevState,
                following: prevState.following.filter((elem) => elem.id !== userId),
              }));
            } else {
              setUser((prevState) => ({
                ...prevState,
                following: [...prevState.following, { id: userId }],
              }));
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.response) {
              console.log(err.response.data.error.message);
            }
          });
      };
      postPayload();
    },
  };

  console.log(`global user object: `, user);

  return (
    <AppContext.Provider value={{ user, globalState, recentlyUploadedImages, handlers }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
