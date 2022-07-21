import { createRouter, createWebHistory } from "vue-router";
import AddPage from "../views/AddPage.vue";
import LoginPage from "../views/LoginPage.vue";
import PostPage from "../views/PostPage.vue";
import DetailPage from "../views/DetailPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import PaymentPage from "../views/PaymentPage.vue";
import TransactionPage from "../views/TransactionPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/add",
      name: "add",
      component: AddPage,
    },
    {
      path: "/post",
      name: "post",
      component: PostPage,
    },
    {
      path: "/post/:id",
      name: "detail",
      component: DetailPage,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
    },
    {
      path: "/",
      name: "home",
      component: PostPage,
    },
    {
      path: "/payment",
      name: "payment",
      component: PaymentPage,
    },
    {
      path: "/transaction",
      name: "transaction",
      component: TransactionPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");

  if (to.name === "home") {
    next("/post");
  }

  if (to.name === "add" && !token) {
    next("/login");
  } else if ((to.name === "login" || to.name === "register") && token) {
    next("/post");
  } else {
    next();
  }
});

export default router;
