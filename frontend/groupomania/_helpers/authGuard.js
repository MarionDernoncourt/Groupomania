import router from "@/router";


export function authGuard(to) {
  let token = localStorage.getItem("token");

  if (token) {
    return true; // si token présent ok
  }
  router.push("/"); // sinon renvoie sur page de connexion
}

export function adminGuard(to) {
  let userId = localStorage.getItem("userId"); 
  if(userId === "7") { //si user admin (7) ok
    return true;
  }
  router.push("/home") // sinon renvoie page d'accueil
}