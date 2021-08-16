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
    timeLeft: 5, // 秒
  }),
  mounted () {
  },
  methods: {
    run() {
      this.drawFireworks();
      this.timeLeft = 5;
      this.interval = setInterval(() => {
        this.timeLeft -= 1;
        if (this.timeLeft <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    },
    drawFireworks() {
      if (!this.fireworks) {
        this.fireworks = new DrawFireworks(this.$refs.canvas);
      }
      this.fireworks.frame();
    },
    clickEvent() {
      if (this.timeLeft <= 0) {
        this.$emit("stop");
      }
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
