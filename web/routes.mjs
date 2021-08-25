import Stroes from "./stores.mjs"
import PageNotFound from "./views/404/404.mjs"
import Birthday from "./views/birthday/birthday.mjs"
import Love from "./views/love/love.mjs"

const routes = [
  {
    path: "/",
    redirect: (to) => {
      // let date = new Date();
      // let year = ("00" + date.getFullYear()).slice(-4);
      // let month = ("00" + (date.getMonth() + 1)).slice(-2);
      // let day = ("00" + date.getDate()).slice(-2);
      // let home = { path: "/love" }
      // if (Stroes.state.birthdayDate.includes(year + month + day)) {
      //   home = { path: "/birthday" }
      // }
      return { path: "/birthday" };
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
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})
