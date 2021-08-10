import App from "./app.mjs";
import Routes from "./routes.mjs";
export default () => {
  // Vue挂载点创建
  let appEL = "hhm-app";
  if (!document.getElementById(appEL)) {
    let divEl = document.createElement("div");
    divEl.id = appEL;
    document.body.appendChild(divEl);
  }

  // Vue App创建
  Vue.createApp(App).use(Routes).mount("#" + appEL);
}
