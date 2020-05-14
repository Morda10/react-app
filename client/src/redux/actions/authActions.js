import { SET_USER } from "../types";
import jwt_decode from "jwt-decode";

export const setUser = (token) => {
  localStorage.setItem("jwt", token);
  return {
    type: SET_USER,
    payload: jwt_decode(token),
  };
};

export const logout = () => {
  localStorage.removeItem("jwt");
  return {
    type: SET_USER,
    payload: null,
  };
};
