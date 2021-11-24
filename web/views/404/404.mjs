import DrawLove from "./vender/draw-love.mjs";
// import TypingContent from "./assets/typingContent.mjs"
const { h, vShow, resolveComponent, withDirectives, Transition } = Vue;
export default {
  name: "Forever",
  components: {
  },
  render() {
    return h(
      "div", {
        class: "page-forever",
        style: Style.pageForever.style,
        ref: "page"
      },
      [
        // h(
        //   "div",
        //   {
        //     class: "code",
        //     ref: "code",
        //   }
        // ),
        h("div", 
          { class: "title" },
          "相知相识相爱"
        ),
        h("canvas",
          {
            class: "canvas",
            ref: "canvas",
          }
        ),
        h(
          Transition,
          {
            onBeforeEnter: (el) => { this.beforeEnterEvent(el) },
            onEnter: (el, done) => { this.enterEvent(el, done) },
          },
          {
            default:() => {
              return withDirectives(
                h("div",
                  {
                    class: "canvas-info",
                    style: Style.canvasInfo.style,
                  },
                  h("div", { class: "canvas-info-scroll" },
                    this.milestones.map((milestone, index) => {
                      return h("div", {
                          class: "row " + ["first", "second", "third"][index % 3]
                          },
                          h(
                            "div", { class: "row-content" },
                            [
                              h("div", { class: "label" },
                                milestone.label,
                              ),
                              h("div", { class: "value" },
                                [
                                  h("div", { class: "date" },
                                    milestone.datetime,
                                  ),
                                  h("div", { class: "day-count" },
                                    `已经过了${milestone.dayCount}天`,
                                  ),
                                ]
                              ),
                            ]
                          )
                      )
                    })
                  )
                ),
                [[vShow, this.showCanvasInfo]]
              );
            }
          }
        )
      ],
    );
  },
  data: () => ({
    showCanvasInfo: false,
  }),
  computed: {
    milestones() {
      let list = [];
      for (const _ of Array.from({length: 2})) {
        for (const item of this.$store.getters.milestones) {
          list.push({...item})
        }
      }
      return list;
    }
  },
  mounted () {
    Style.init(this.$refs.page);
    this.run();
  },
  destroyed () {
    if (this.loveDraw) {
      this.loveDraw.stopDrawn();
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
      this.drawLove();
      // this.typingContent(TypingContent);
      // 时间计时器
      this.timeInterval = setInterval(() => {
        if (!this || !this.loveDraw) {
          clearTimeout(this.timeInterval);
          return;
        }
        if (this.loveDraw.runState == 0) {
          this.showCanvasInfo = true;
        }
      }, 60);
    },
    // 画爱心
    drawLove() {
      if (!this.loveDraw) {
        this.loveDraw = new DrawLove(this.$refs.canvas);
      }
      this.loveDraw.startDrawing();
    },
    // 打字
    // typingContent(typingContent) {
    //   // 移除前后、标签之间(><)的空格
    //   typingContent = typingContent.replace(/(^\s*)|(\s*$)/g, "").replace(/>\s+</g,"><");
    //   if (this.codeInterval) {
    //     clearInterval(this.codeInterval);
    //     this.codeInterval = 0;
    //   }
    //   let progress = 0;
		// 	this.codeInterval = setInterval(() => {
    //     if (!this || !this.loveDraw) {
    //       clearTimeout(this.codeInterval);
    //       return;
    //     }
		// 		let current = typingContent.substr(progress, 1);
		// 		if (current == "<") {
		// 			progress = typingContent.indexOf(">", progress) + 1;
		// 		} else {
		// 			progress++;
		// 		}
		// 		this.$refs.code.innerHTML = typingContent.substring(0, progress) + (progress & 1 ? '_' : '');
		// 		if (progress >= typingContent.length) {
    //       this.$refs.code.innerHTML = typingContent;
		// 			clearInterval(this.codeInterval);
    //       this.codeInterval = 0;
		// 		}
		// 	}, 100);
    // },
    beforeEnterEvent(el) {
      gsap.set(el, {
        opacity: 0,
      })
    },
    enterEvent(el, done) {
      gsap.to(el, {
        // repeat: -1,
        // yoyo: true,
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
    let styleId = "page-forever";
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
  pageForever: {
    style: {

    }
  },
  canvasInfo: {
    style: {
      
    },
  },
}

// CSS 样式
let css = `
.page-forever {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.page-forever .code {
  width: 100%;
  height: 60%;
  font-family: "Consolas","Monaco","Bitstream Vera Sans Mono","Courier New","sans-serif";
  color: #333;
  font-size: 12px;
  padding: 15px;
  box-sizing: border-box;
  max-width: "787px";
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  position: relative;
  z-index: 1;
}
.page-forever .title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  letter-spacing: 1px;
  color: #fc6285;
}
.page-forever canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 3rem;
  height: 3rem;
  max-width: 670px;
  max-height: 625px;
  min-width: 300px;
  min-height: 300px;
}
.page-forever .canvas-info {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.3rem;
  transform: translateX(-50%) translateY(-50%);
  width: 2rem;
  height: 0.7rem;
  max-width: 570px;
  max-height: 300px;
  min-width: 200px;
  color: #fc6285;
  letter-spacing: 2px;
  overflow: hidden;
}
.page-forever .canvas-info .canvas-info-scroll {
  width: 100%;
  height: max-content;
  word-break: keep-all;
  white-space: nowrap;
  animation: 20s rowscroll linear infinite normal;
}
@keyframes rowscroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translateY(-50%);
  }
}
.page-forever .canvas-info .row {
  padding-bottom: 5px;
}
.page-forever .canvas-info .row-content {
  display: flex;
  align-items: center;
  font-size: 0.10rem;
  word-break: keep-all;
  white-space: nowrap;
  border-radius: 5px;
  background-color: #fde4eb;
  padding: 5px;
}
.page-forever .canvas-info .row.first .row-content {
  background-color: #fde4eb;
}
.page-forever .canvas-info .row.second .row-content {
  background-color: #c8e5fc;
}
.page-forever .canvas-info .row.third .row-content {
  background-color: #ffe9d9;
}
.page-forever .canvas-info .row .label {
  font-size: 0.12rem;
}
.page-forever .canvas-info .row .value {
  flex: 1;
  text-align: right;
}
`
