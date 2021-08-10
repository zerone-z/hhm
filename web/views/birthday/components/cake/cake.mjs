const { h } = Vue;
import DrawCake from "./vender/draw-cake.mjs";
import TypingContent from "./assets/typingContent.mjs";
// Vue组件
export default {
  render() {
    return h(
      "div", {
        class: "cake",
        style: Style.cake,
      },
      [
        h(
          "div",
          {
            class: "code",
            style: Style.code,
            ref: "code",
          }
        ),
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
    codeInterval: 0,
    cake: null,
  }),
  mounted () {
    this.drawCake();
    this.typeingContent();
  },
  methods: {
    drawCake() {
      if (!this.cake) {
        this.cake = new DrawCake(this.$refs.canvas);
      }
      this.cake.startDrawing();
    },
    typeingContent() {
      let progress = 0;
			this.codeInterval = setInterval(() => {
				var current = TypingContent.substr(progress, 1);
				if (current == "<") {
					progress = TypingContent.indexOf(">", progress) + 1;
				} else {
					progress++;
				}
				this.$refs.code.innerHTML = TypingContent.substring(0, progress) + (progress & 1 ? '_' : '');
				if (progress >= TypingContent.length) {
					clearInterval(this.codeInterval);
          this.codeInterval = 0;
				}
			}, 75);
    }
  }
}
// 样式设置
let Style = {
  cake: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  code: {
    width: "100%",
    height: "60%",
    fontFamily: '"Consolas","Monaco","Bitstream Vera Sans Mono","Courier New","sans-serif"',
    fontSize: "12px",
  },
  canvas: {
    width: "100%",
    height: "40%",
    flex: "1",
  }
}
