import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppWrapper";

const ProtectedRoute = ({ redirect }) => {
  const { handlers, user } = useAppContext();
  useEffect(() => {
    handlers.checkLogin();
  }, []);
  if (!user.isLoggedIn && !user.isLoading) {
    if (typeof window !== "undefined") {
      location.replace(redirect);
    }
  }
  return null;
};

export default ProtectedRoute;

ProtectedRoute.defaultProps = {
  redirect: `/login`,
};
