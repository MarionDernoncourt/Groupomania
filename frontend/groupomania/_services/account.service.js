// import module nécessaire
import Axios from "./caller.service";

let login = (credentials) => {
  return Axios.post("/auth/login", credentials);
};

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

let getToken = () => {
  return localStorage.getItem("token");
};
let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let saveId = (id) => {
  localStorage.setItem("userId", id);
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token; // retourne un booléen si token or not
};

export const accountService = {
  login,
  logout,
  getToken,
  saveToken,
  isLogged,
  saveId,
};
