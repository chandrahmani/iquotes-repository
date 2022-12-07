import { useAuthHook } from "./useAuthHook";

export const useAPIConfig = () => {
  const { token } = useAuthHook();

  const getConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  return {
    getConfig,
  };
};
