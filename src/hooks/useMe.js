import axios from "axios";
import { useAPIConfig } from "./useAPIConfig";
import { useAuthHook } from "./useAuthHook";

export const useMe = () => {
  const { getConfig } = useAPIConfig();
  const { noAuth, auth } = useAuthHook();

  const getMe = async () => {
    try {
      const { data } = await axios.get(
        "https://iquotes-app-22.herokuapp.com/me",
        getConfig()
      );

      return data;
    } catch (error) {
      console.log("err", error.response);

      if (!error.response.status === 403) {
        noAuth();
      } else {
        localStorage.removeItem("token");
      }
    }
  };

  return {
    getMe,
  };
};
