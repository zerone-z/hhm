import App from "./app.mjs";
import Routes from "./routes.mjs";
import Stores from "./stores.mjs";
export default () => {
  // 设置Rem的font-size
  setRootFontSize(window, 375, 768);
  // Vue挂载点创建
  let appEL = "hhm-app";
  if (!document.getElementById(appEL)) {
    let divEl = document.createElement("div");
    divEl.id = appEL;
    document.body.appendChild(divEl);
  }

  // Vue App创建
  Vue.createApp(App)
    .use(Routes)
    .use(Stores)
    .mount("#" + appEL);
};

/**
 * 设置Rem 的font-size
 *
 * @param {*} win         window
 * @param {*} designWidth 设计宽度
 * @param {*} maxWidth    最大宽度
 */
function setRootFontSize(win, designWidth, maxWidth) {
  let ratio,
    scaleValue,
    renderTime,
    htmlEle = document.documentElement,
    vpMeta = document.querySelector('meta[name="viewport"]');

  if (vpMeta) {
    let tempArr = vpMeta
      .getAttribute("content")
      .match(/initial\-scale=(["']?)([\d\.]+)\1?/);
    if (tempArr) {
      scaleValue = parseFloat(tempArr[2]);
      ratio = parseInt(1 / scaleValue);
    }
  } else {
    vpMeta = document.createElement("meta");
    vpMeta.setAttribute("name", "viewport");
    vpMeta.setAttribute(
      "content",
      "width=device-width, initial-scale=0.5, user-scalable=no, minimal-ui"
    );
    htmlEle.firstElementChild.appendChild(vpMeta);
    ratio = 2;
  }

  win.addEventListener(
    "resize",
    function () {
      clearTimeout(renderTime);
      renderTime = setTimeout(() => {
        initPage(designWidth, maxWidth);
      }, 300);
    },
    false
  );

  win.addEventListener(
    "pageshow",
    function (e) {
      if (e.persisted) {
        clearTimeout(renderTime);
        renderTime = setTimeout(initPage, 300);
      }
    },
    false
  );

  if ("complete" === document.readyState) {
    document.body.style.fontSize = 12 * ratio + "px";
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        document.body.style.fontSize = 12 * ratio + "px";
      },
      false
    );
  }

  initPage(designWidth, maxWidth);

  function initPage(designWidth, maxWidth) {
    var htmlWidth = htmlEle.getBoundingClientRect().width;
    htmlWidth / ratio > maxWidth && (htmlWidth = maxWidth * ratio);
    win.rem = 100 * (htmlWidth / designWidth);
    htmlEle.style.fontSize = win.rem + "px";
  }
}
