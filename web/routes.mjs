import Stores from "./stores.mjs"
import PageNotFound from "./views/404/404.mjs"
import Birthday from "./views/birthday/birthday.mjs"
import OnlyYou from "./views/only-you/only-you.mjs"
import Wedding from "./views/wedding/wedding.mjs"

const routes = [
  {
    path: "/",
    redirect: (to) => {
      let date = new Date();
      let year = ("00" + date.getFullYear()).slice(-4);
      let month = ("00" + (date.getMonth() + 1)).slice(-2);
      let day = ("00" + date.getDate()).slice(-2);
      
      let home = { path: "/%E6%B0%B8%E8%BF%9C"};  // 默认404页面（永远）
      if (Stores.state.birthdayDate.includes(year + month + day)) {
        home = { path: "/%E7%94%9F%E6%97%A5" };   // 生日
      } else if (Stores.state.weddingDate.includes(year + month + day)) {
        home = { path: "/%E7%BB%93%E5%A9%9A" };   // 结婚
      } else {
        let hour = ("00" + date.getHours()).slice(-2);
        let minute = ("00" + date.getMinutes()).slice(-2);
        let currentDate = `${month}-${day}`;
        let currentTime = `${hour}:${minute}`;
        let easterEggDate = ["06-20"];
        let easterEggTime = ["23:36", "11:30", "17:30", "20:00", "13:14", "05:20"]
        if (["01", "59"].includes(minute) || easterEggDate.includes(currentDate) || easterEggTime.includes(currentTime)) {
          home = { path: "/%E5%8F%AA%E6%9C%89%E4%BD%A0"};  // 只有你
        }
      }
      return home
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound,
    meta: {
      title: "韩会敏•我爱你•永远"
    }
  },
  {
    path: "/birthday",
    name: "birthday",
    component: Birthday,
    meta: {
      title: "韩会敏•我爱你•🎂"
    }
  },
  {
    path: "/%E7%94%9F%E6%97%A5", //  birthday 对应中文 生日 URL编码，可以通过中文路径显示
    name: "%E7%94%9F%E6%97%A5",
    component: Birthday,
    meta: {
      title: "韩会敏•我爱你•🎂"
    }
  },
  {
    path: "/only-you",
    name: "only-you",
    component: OnlyYou,
    meta: {
      title: "韩会敏•我爱你•只有你"
    }
  },
  {
    path: "/%E5%8F%AA%E6%9C%89%E4%BD%A0",         // only-you 对应中文 只有你 URL编码，可以通过中文路径显示
    name: "%E5%8F%AA%E6%9C%89%E4%BD%A0",
    component: OnlyYou,
    meta: {
      title: "韩会敏•我爱你•只有你"
    }
  },
  {
    path: "/wedding",
    name: "wedding",
    component: Wedding,
    meta: {
      title: "韩会敏•我爱你•💒"
    }
  },
  {
    path: "/%E7%BB%93%E5%A9%9A",  // wedding 对应中文 结婚 URL编码，可以通过中文路径显示
    name: "%E7%BB%93%E5%A9%9A",
    component: Wedding,
    meta: {
      title: "韩会敏•我爱你•💒"
    }
  }
];
let Router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes, // `routes: routes` 的缩写
});
Router.afterEach((to, from) => {
  document.title = to.meta.title;
})
export default Router;
