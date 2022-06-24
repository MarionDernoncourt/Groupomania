import { createRouter, createWebHistory } from "vue-router";

import * as Public from "@/views/public/index";

import notFound from "@/views/public/notFound";

import login from "@/views/auth/login";
import signUp from "@/views/auth/signUp";
import { authGuard, adminGuard } from "/_helpers/authGuard";

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/signUp",
    name: "addUser",
    component: signUp,
  },
  {
    path: "/",
    name: "utilisateur",
    component: Public.layout,
    children: [
      { path: "home", name: "home", component: Public.home },
      {
        path: "user/accountUser",
        name: "userAccount",
        component: Public.accountUser,
      },
      {
        path: "user/edit/:id(\\d+)",
        name: "editAccount",
        component: Public.editUser,
        props: true,
      },
      {
        path: "user/userList",
        name: "userList",
        component: Public.listUser,
        beforeEnter: adminGuard, // vérifie si user connecté est bien l'admin
      },

      {
        path: "article/myArticles",
        name: "myArticles",
        component: Public.myArticles,
      },

      {
        path: "article/createArticle",
        name: "createArticle",
        component: Public.addArticle,
      },
      {
        path: "article/edit/:id(\\d+)",
        name: "editArticle",
        component: Public.editArticle,
        props: true,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: notFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Vérouillage route utilisateur - vérification si token bien présent
router.beforeEach((to, from, next) => {
  if (to.matched[0].name == "utilisateur") {
    authGuard();
  }
  next();
});

export default router;
