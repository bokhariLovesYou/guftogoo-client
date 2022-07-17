import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppWrapper";

const ProtectedRoute = ({ redirect }) => {
  const { handlers, user } = useAppContext();
  useEffect(() => {
    handlers.checkLogin();
  }, []);
  if (!user.isLoggedIn) {
    location.replace({ redirect });
  }
  return <></>;
};

export default ProtectedRoute;
