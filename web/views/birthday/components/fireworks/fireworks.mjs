const { h } = Vue;
import DrawFireworks from "./vender/draw-fireworks.mjs";
// Vue组件
export default {
  render() {
    return h(
      "div", {
        class: "fireworks",
        style: Style.fireworks,
      },
      [
        h(
          "canvas",
          {
            class: "canvas",
            style: Style.canvas,
            ref: "canvas",
          },
        )
      ]
    );
  },
  data: () => ({
    canvaInterval: 0,
    // fireworks: null,
  }),
  mounted () {
    this.drawFireworks();
  },
  methods: {
    drawFireworks() {
      if (!this.fireworks) {
        this.fireworks = new DrawFireworks(this.$refs.canvas);
      }
      this.fireworks.frame();
    },
  }
}
// 样式设置
let Style = {
  fireworks: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000"
  },
  canvas: {
    width: "100%",
    height: "100%",
    flex: "1",
  }
}
