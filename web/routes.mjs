import Stroes from "./stores.mjs"
import PageNotFound from "./views/404/404.mjs"
import Birthday from "./views/birthday/birthday.mjs"
import Love from "./views/love/love.mjs"
import Wedding from "./views/wedding/wedding.mjs"

const routes = [
  {
    path: "/",
    redirect: (to) => {
      let date = new Date();
      let year = ("00" + date.getFullYear()).slice(-4);
      let month = ("00" + (date.getMonth() + 1)).slice(-2);
      let day = ("00" + date.getDate()).slice(-2);
      let home = { path: "/birthday" }
      if (Stroes.state.birthdayDate.includes(year + month + day)) {
        home = { path: "/birthday" }
      } else if (Stroes.state.weddingDate.includes(year + month + day)) {
        home = { path: "/wedding" };
      }
      return home
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound
  },
  {
    path: "/birthday",
    name: "birthday",
    component: Birthday
  },
  {
    path: "/love",
    name: "love",
    component: Love
  },
  {
    path: "/wedding",
    name: "wedding",
    component: Wedding
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})
