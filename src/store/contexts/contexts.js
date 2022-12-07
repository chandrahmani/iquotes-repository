import { createContext, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
  const props = useContext(AppContext);

  return props;
};
