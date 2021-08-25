import DrawLove from "./vender/draw-love.mjs";
import TypingContent from "./assets/typingContent.mjs"
const { h, vShow, resolveComponent, withDirectives, Transition } = Vue;
export default {
  name: "Love",
  components: {
  },
  render() {
    return h(
      "div", {
        class: "page-love",
        style: Style.pageLove.style,
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
        h(
          Transition,
          {
            onBeforeEnter: (el) => { this.beforeEnterEvent(el) },
            onEnter: (el, done) => { this.enterEvent(el, done) },
          },
          {
            default:() => {
              return withDirectives(
                h(
                  "div",
                  {
                    class: "canvas-info",
                    style: Style.canvasInfo.style,
                  },
                  [
                    h(
                      "div",
                      {
                        class: "each-other-meet",
                        style: Style.eachOtherMeet.style,
                      },
                      [
                        h(
                          "span",
                          {
                            class: "meet-desc",
                            style: Style.eachOtherMeet.desc.style,
                          },
                          "我们已经认识了:",
                        ),
                        h(
                          "span",
                          {
                            class: "meet-desc",
                            style: Style.eachOtherMeet.time.style,
                          },
                          [
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.meet.day,
                            ),
                            "天",
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.meet.hour,
                            ),
                            "小时",
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.meet.minute,
                            ),
                            "分",
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.meet.second,
                            ),
                            "秒",
                          ]
                        )
                      ]
                    ),
                    h(
                      "div",
                      {
                        class: "each-other-love",
                        style: Style.eachOtherLove.style
                      },
                      [
                        h(
                          "span",
                          {
                            class: "love-desc",
                            style: Style.eachOtherLove.desc.style,
                          },
                          "我们已经相爱了:",
                        ),
                        h(
                          "span",
                          {
                            class: "love-time",
                            style: Style.eachOtherLove.time.style,
                          },
                          [
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.love.day,
                            ),
                            "天",
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.love.hour,
                            ),
                            "小时",
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.love.minute,
                            ),
                            "分",
                            h(
                              "span", {
                                class: "time",
                                style: Style.time.style,
                              },
                              this.love.second,
                            ),
                            "秒",
                          ]
                        )
                      ]
                    )
                  ]
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
    meet: {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    },
    love: {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    }
  }),
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
      this.typingContent(TypingContent);
      // 时间计时器
      this.timeInterval = setInterval(() => {
        if (!this || !this.loveDraw) {
          clearTimeout(this.timeInterval);
          return;
        }
        if (this.loveDraw.runState == 0) {
          this.showCanvasInfo = true;
        }
        let currentDate = new Date().getTime();
        // 相遇时间
        let diffMeet = parseInt((currentDate - this.$store.state.meetDate) / 1000);
        this.meet.day = parseInt(diffMeet / (24 * 60 * 60));
        diffMeet -= this.meet.day * 24 * 60 * 60;
        this.meet.hour = parseInt(diffMeet / (60 * 60));
        diffMeet -= this.meet.hour * 60 * 60;
        this.meet.minute = parseInt(diffMeet / 60);
        diffMeet -= this.meet.minute * 60;
        this.meet.second = diffMeet % 60;
        // 相爱时间
        let diffLove = parseInt((currentDate - this.$store.state.loveDate) / 1000);
        this.love.day = parseInt(diffLove / (24 * 60 * 60));
        diffLove -= this.love.day * 24 * 60 * 60;
        this.love.hour = parseInt(diffLove / (60 * 60));
        diffLove -= this.love.hour * 60 * 60;
        this.love.minute = parseInt(diffLove / 60);
        diffLove -= this.love.minute * 60;
        this.love.second = diffLove % 60;
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
    typingContent(typingContent) {
      // 移除前后、标签之间(><)的空格
      typingContent = typingContent.replace(/(^\s*)|(\s*$)/g, "").replace(/>\s+</g,"><");
      if (this.codeInterval) {
        clearInterval(this.codeInterval);
        this.codeInterval = 0;
      }
      let progress = 0;
			this.codeInterval = setInterval(() => {
        if (!this || !this.loveDraw) {
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
    let styleId = "page-love";
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
  pageLove: {
    style: {

    }
  },
  canvasInfo: {
    style: {
      position: "absolute",
      bottom: "20px",
      right: "0px",
      width: "3rem",
      height: "3rem",
      maxWidth: "670px",
      maxheight: "625px",
      minWidth: "300px",
      minHeight: "300px",
      color: "#fc6285",
    },
  },
  eachOtherMeet: {
    style: {
      position: "absolute",
      top: "0.85rem",
      left: "0.6rem",
      right: "0.6rem",
      display: "flex",
      flexDirection: "column",
      fontSize: "0.10rem"
    },
    desc: {
      style: {

      }
    },
    time: {
      style: {
        textAlign: "right",
      }
    }
  },
  eachOtherLove: {
    style: {
      position: "absolute",
      top: "1.35rem",
      left: "0.6rem",
      right: "0.6rem",
      display: "flex",
      flexDirection: "column",
      fontSize: "0.10rem"
    },
    desc: {
      style: {

      }
    },
    time: {
      style: {
        textAlign: "right",
      }
    }
  },
  time: {
    style: {
      fontSize: "0.17rem",
      display: "inline-block",
      minWidth: "0.25rem",
      textAlign: "center",
    }
  }
}

// CSS 样式
let css = `
.page-love {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.page-love .code {
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
.page-love canvas {
  position: absolute;
  bottom: 20px;
  right: 0px;
  width: 3rem;
  height: 3rem;
  max-width: 670px;
  max-height: 625px;
  min-width: 300px;
  min-height: 300px;
}
`
