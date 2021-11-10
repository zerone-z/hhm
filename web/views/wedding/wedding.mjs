import LoveTree from "./vender/love-tree.mjs";
const { h, vShow, resolveComponent, withDirectives, Transition } = Vue;
export default {
  name: "Love",
  components: {
  },
  render() {
    return h(
      "div", {
        class: "page-wedding",
        style: Style.pageWedding.style,
        ref: "page"
      },
      [
        h(
          "div",
          {
            class: "code",
            ref: "code",
          }
        ),
        h(
          "canvas",
          {
            class: "canvas",
            ref: "canvas",
          }
        ),
      ],
    );
  },
  data: () => ({
    
  }),
  mounted () {
    Style.init(this.$refs.page);
    this.run();
  },
  destroyed () {
    if (this.loveTreeDraw) {
      this.loveTreeDraw.stopDrawn();
    }
    if (this.timeInterval) {
      clearTimeout(this.timeInterval);
      this.timeInterval = 0;
    }
    if (this.codeInterval) {
      clearInterval(this.codeInterval);
      this.codeInterval = 0;
    }
  },
  methods: {
    run() {
      if (this.timeInterval) {
        clearTimeout(this.timeInterval);
      }
      this.drawLoveTree();
      let typingContent = this.$store.state.firstWeddingAnniversary;
      this.typingContent(typingContent);
    },
    // 画爱情树
    drawLoveTree() {
      if (!this.loveTreeDraw) {
        this.loveTreeDraw = new LoveTree(this.$refs.canvas);
      }
      this.loveTreeDraw.render();
    },
    // 打字
    typingContent(typingContent) {
      // 移除前后、标签之间(><)的空格
      typingContent = typingContent.replace(/(^\s*)|(\s*$)/g, "").replace(/>\s+</g,"><");
      if (this.codeInterval) {
        clearInterval(this.codeInterval);
        this.codeInterval = 0;
      }
      let progress = 0;
			this.codeInterval = setInterval(() => {
        if (!this || !this.loveTreeDraw) {
          clearTimeout(this.codeInterval);
          return;
        }
				let current = typingContent.substr(progress, 1);
				if (current == "<") {
					progress = typingContent.indexOf(">", progress) + 1;
				} else {
					progress++;
				}
				this.$refs.code.innerHTML = typingContent.substring(0, progress) + (progress & 1 ? '_' : '');
				if (progress >= typingContent.length) {
          this.$refs.code.innerHTML = typingContent;
					clearInterval(this.codeInterval);
          this.codeInterval = 0;
				}
			}, 100);
    },
    beforeEnterEvent(el) {
      gsap.set(el, {
        opacity: 0,
      })
    },
    enterEvent(el, done) {
      gsap.to(el, {
        repeat: -1,
        yoyo: true,
        duration: 2,
        opacity: 1,
        onComplete: done,
      })
    },
  }
}

// 样式设置
// 样式设置
let Style = {
  init(el) {
    let styleId = "page-wedding";
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
  pageWedding: {
    style: {

    }
  },
}

// CSS 样式
let css = `
.page-wedding {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.page-wedding .code {
  width: 100%;
  height: 60%;
  font-family: "Consolas","Monaco","Bitstream Vera Sans Mono","Courier New","sans-serif";
  color: #fff;
  font-size: 12px;
  padding: 15px;
  box-sizing: border-box;
  max-width: "787px";
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  position: relative;
  z-index: 1;
  margin: 0px auto;
}
.page-wedding canvas {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #000;
	cursor: pointer;
}
`
