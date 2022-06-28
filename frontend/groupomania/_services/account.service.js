// import module nécessaire
import Axios from "./caller.service";

let login = (credentials) => {
  return Axios.post("/auth/login", credentials);
};

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("refreshToken")
};

let getToken = () => {
  return localStorage.getItem("token");
};
let getRefreshToken = (refreshToken) => {
  return Axios.post("/auth/refreshToken", refreshToken)
}

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

let saveRefreshToken = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken)
}
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
  getRefreshToken,
  saveToken,
  saveRefreshToken,
  isLogged,
  saveId,
};
