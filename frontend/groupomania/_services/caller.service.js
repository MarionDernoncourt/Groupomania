/***** import module nécessaire */
import axios from "axios";
import { accountService } from "./account.service";

// Parametrage url de base
const Axios = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Intercepteur pour injection du token dans la requete
Axios.interceptors.request.use((request) => {
  if (accountService.isLogged()) {
    request.headers.Authorization = "Bearer " + accountService.getToken();
  }
  return request;
});

// Intercepteur des réponses de l'api
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      accountService.logout();
      router.push("/");
    }
  }
);

export default Axios;
