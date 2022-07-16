import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [globalState, setGlobalState] = useState(null);

  const handlers = {
    // Global Handlers Here
  };

  return <AppContext.Provider value={{ globalState, handlers }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
