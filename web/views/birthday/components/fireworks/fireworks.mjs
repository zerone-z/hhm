const { h } = Vue;
import DrawFireworks from "./vender/draw-fireworks.mjs";
// Vue组件
export default {
  render() {
    return h(
      "div", 
      {
        class: "fireworks",
        style: Style.fireworks.style
      },
      h(
        "div", {
          class: "fireworksContent",
          style: Style.fireworksContent.style,
          onClick: ($event) => { this.clickEvent($event) }
        },
        [
          h(
            "canvas",
            {
              class: "canvas",
              style: Style.canvas.style,
              ref: "canvas",
            },
          )
        ]
      )
    );
  },
  data: () => ({
    allowClick: false, // 允许点击
  }),
  mounted () {
  },
  destroyed () {
    if (this.fireworks) {
      this.fireworks.stopFrames();
    }
  },
  methods: {
    run() {
      this.drawFireworks();
      this.allowClick = false;
      this.timeTimeout = setTimeout(() => {
        this.allowClick = true;
        clearInterval(this.timeTimeout);
        this.timeTimeout = 0;
      }, 5000);
    },
    stop() {
      if (this.fireworks) {
        this.fireworks.stopFrames();
      }
    },
    drawFireworks() {
      if (!this.fireworks) {
        this.fireworks = new DrawFireworks(this.$refs.canvas);
      }
      this.fireworks.startFrames();
    },
    clickEvent() {
      if (!this.allowClick) {
        return;
      }
      this.$emit("stop");
    },
  }
}
// 样式设置
let Style = {
  fireworks: {
    style: {
      width: "100%",
      height: "100%",
    }
  },
  fireworksContent: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#000",
    }
  },
  canvas: {
    style: {
      width: "100%",
      height: "100%",
      flex: "1",
    }
  }
}
