import DrawAvatar from "./vender/draw-avatar.mjs";
import WifeAvatar from "./assets/wife.mjs";
const { h, Transition, resolveDynamicComponent } = Vue;
// Vue组件
export default {
  render() {
    return h(
      "div", {
        class: "page",
        ref: "pageNotFound"
      },
      null,
      h(
        "canvas",
        {
          class: "canvas",
          ref: "canvas",
        }
      )
    );
  },
  mounted () {
    Style.init(this.$refs.pageNotFound);
    this.drawAvatar();
  },
  destroyed () {
    if (this.avatarDraw) {
      this.avatarDraw.stopDrawn();
    }
  },
  methods: {
    drawAvatar() {
      if (!this.avatarDraw) {
        let img = new Image();
        img.src = WifeAvatar;
        let options = {
          dotSize: 1/200,
          initVelocity: 0.05,
          oscAmplitude: 0,
          friction: 0.05,
          // channels: [ 'lum' ]
        };
        this.avatarDraw = new DrawAvatar(this.$refs.canvas, img, options);
      }
    },
  }
}
// 样式设置
let Style = {
  init(el) {
    let styleId = "page-not-found";
    if (document.getElementById(styleId)) {
      return;
    }
    let pageStyle = document.createElement("style");
    pageStyle.media = "screen";
    pageStyle.setAttribute("scoped", "");
    pageStyle.id = styleId;
    pageStyle.innerHTML = css;
    el.appendChild(pageStyle);
  },
}

// CSS 样式
let css = `
.page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.page canvas {
  width: 3rem;
  height: 3rem;
  max-width: 670px;
  max-height: 625px;
  min-width: 350px;
  min-height: 350px;
}
`
