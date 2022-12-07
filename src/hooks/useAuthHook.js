import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthHook = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const noAuth = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const auth = () => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  };

  return {
    token,
    isAuth: !!token,
    noAuth,
    auth,
  };
};
