import Birthday from "./views/birthday/birthday.mjs"

const routes = [
  {
    path: "/",
    name: "Birthday",
    component: Birthday
  },
]
export default VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
})
