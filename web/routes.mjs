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
      let home = { path: "/%E7%94%9F%E6%97%A5" }
      if (Stroes.state.birthdayDate.includes(year + month + day)) {
        home = { path: "/%E7%94%9F%E6%97%A5" }
      } else if (Stroes.state.weddingDate.includes(year + month + day)) {
        home = { path: "/%E7%BB%93%E5%A9%9A" };
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
    path: "/%E7%94%9F%E6%97%A5", //  生日 对应URL编码，可以通过中文路径显示
    name: "%E7%94%9F%E6%97%A5",
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
  },
  {
    path: "/%E7%BB%93%E5%A9%9A",  // 结婚 对应URL编码，可以通过中文路径显示
    name: "%E7%BB%93%E5%A9%9A",
    component: Wedding
  }
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})
