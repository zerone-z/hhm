const { h, vShow, Transition, withDirectives } = Vue;
import StarrySky from "./components/starry-sky/starry-sky.mjs";
import DrawCake from "./vender/draw-cake.mjs";
import TypingContent from "./assets/typingContent.mjs"
// Vue组件
export default {
  name: "Cake",
  render() {
    return h(
      "div", 
      {
        class: "cake",
        style: Style.cake.style,
        ref: "cake",
        onClick: ($event) => { this.clickEvent($event) }
      },
      [
        h(
          StarrySky,
        ),
        h(
        "div", {
          class: "cakeContent",
          style: Style.cakeContent.style,
        },
        [

          h(
            "div",
            {
              class: "code",
              style: Style.code.style,
              ref: "code",
            }
          ),
          h(
            "canvas",
            {
              class: "canvas",
              style: Style.canvas.style,
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
        ]
      )]
    );
  },
  data: () => ({
    codeInterval: 0,
    cake: null,
    showCanvasInfo: false,
    excludeWish: [],
    allowClick: false,
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
    Style.init(this.$refs.cake);
  },
  destroyed () {
    if (this.cake) {
      this.cake.stopDrawn();
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
    run () {
      if (this.timeInterval) {
        clearTimeout(this.timeInterval);
      }
      this.drawCake();
      // 初始化已经显示的话
      this.excludeWish = [this.$store.state.historyWish.length];
      // let typingContent = TypingContent
      let typingContent = this.$store.state.happyWords;
      this.typingContent(typingContent);
      // 时间计时器
      this.timeInterval = setInterval(() => {
        if (!this || !this.cake) {
          clearTimeout(this.timeInterval);
          return;
        }
        if (this.cake.runState == 0) {
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
    stop() {
      if (this.cake) {
        this.cake.stopDrawn();
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
    // 画蛋糕
    drawCake() {
      if (!this.cake) {
        this.cake = new DrawCake(this.$refs.canvas);
      }
      this.cake.startDrawing();
    },
    // 打字
    typingContent(typingContent, isOne) {
      // 移除前后、标签之间(><)的空格
      typingContent = typingContent.replace(/(^\s*)|(\s*$)/g, "").replace(/>\s+</g,"><");
      if (this.codeInterval) {
        clearInterval(this.codeInterval);
        this.codeInterval = 0;
      }
      let progress = 0;
			this.codeInterval = setInterval(() => {
        if (!this || !this.cake) {
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
          this.allowClick = true;
          let timeout = setTimeout(() => {
            if (!this || !this.dissipateWords) {
              clearTimeout(timeout);
              return;
            }
            clearTimeout(timeout);
            this.dissipateWords(typingContent, isOne);
          }, 1000 * 5);
				}
			},100);
    },
    // 消散文本
    dissipateWords(words, isOne) {
      let maxDelay = 3;
      if (isOne) {
        let htmlString = "";
        let wordCount = 0;
        for (let i = 0; i < words.length; i++) {
          let char = words.substr(i, 1);
          if (char == "<") {
            let tagEndIndex = words.indexOf(">", i) + 1;
            htmlString += words.substring(i, tagEndIndex);
            i = tagEndIndex - 1;
            continue;
          }
          char = words.substr(i, 1);
          if (char == " ") {
            char = "&nbsp;"
          }
          let delay = 3;
          wordCount++;
          delay = 3 + 0.1 * wordCount;
          let spanEl = `<span style="-webkit-animation-delay: ${delay}s;animation-delay: ${delay}s;">${char}</span>`
          htmlString += spanEl;
          maxDelay = Math.max(delay, maxDelay);
        }
        this.$refs.code.innerHTML = htmlString;
      } else {
        gsap.to(this.$refs.code, {
          duration: maxDelay,
          opacity: 0,
          onComplete: () => {
            this.$refs.code.innerHTML = "";
            this.$refs.code.style.opacity = 1;
          }
        });
      }
      let timeout = setTimeout(() => {
        if (!this || !this.excludeWish) {
          clearTimeout(timeout);
          return;
        }
        if (this.excludeWish.length == this.$store.state.historyWish.length ) {
          this.excludeWish = [];
        }
        let nextIndex = this.$store.state.historyWish.length;
        while (this.excludeWish.includes(nextIndex)) {
          nextIndex = Math.floor(Math.random() * (this.$store.state.historyWish.length + 1));
        }
        this.excludeWish.push(nextIndex);
        if (nextIndex >= this.$store.state.historyWish.length) {
          this.typingContent(this.$store.state.happyWords);
          clearTimeout(timeout);
          return;
        }
        let wish = this.$store.state.historyWish[nextIndex];
        let nextTypuingContent = `
        <p style="width:345px;font-size:1.2em;">${wish.greetings}</p>
        <p style="text-align:right;width:345px;font-size:1.2em;">—— ${wish.age}岁 • ${wish.gift}</p>
        `;
        this.typingContent(nextTypuingContent, true);
        clearTimeout(timeout);
      }, (maxDelay + 1) * 1000);
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
    clickEvent() {
      if (!this.allowClick) {
        return;
      }
      this.$emit("stop");
    }
  }
}
// 样式设置
let Style = {
  init(el) {
    if (document.getElementById("CakeStyle")) {
      return;
    }
    let pageStyle = document.createElement("style");
    pageStyle.media = "screen";
    pageStyle.setAttribute("scoped", "");
    pageStyle.id = "CakeStyle";
    pageStyle.innerHTML = 
    `
    .cake .code span {
      color: transparent;
      display: inline-block;
      text-shadow: 0 0 0 whitesmoke;
      -webkit-animation: smoky 1.5s 3s both;
              animation: smoky 1.5s 3s both;
      -webkit-backface-visibility: hidden;
      -moz-backface-visibility: hidden;
      -ms-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-perspective: 1000;
      -moz-perspective: 1000;
      -ms-perspective: 1000;
      perspective: 1000;
      transform-style: preserve-3d;
      -moz-transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;   
      -ms-transform-style: preserve-3d;              
      -o-transform-style: preserve-3d;
    }
    .cake .code span:nth-child(even) {
      -webkit-animation-name: smoky-mirror;
              animation-name: smoky-mirror;
    }
    @-webkit-keyframes smoky {
      60% {
        text-shadow: 0 0 12px whitesmoke;
      }
      to {
        -webkit-transform: translate3d(15px, -8px, 0) rotate(-40deg) skewX(70deg) scale(2);
                transform: translate3d(15px, -8px, 0) rotate(-40deg) skewX(70deg) scale(2);
        text-shadow: 0 0 5px whitesmoke;
        opacity: 0;
      }
    }
    
    @keyframes smoky {
      60% {
        text-shadow: 0 0 12px whitesmoke;
      }
      to {
        -webkit-transform: translate3d(26px, -11px, 0) rotate(-40deg) skewX(70deg) scale(2);
                transform: translate3d(26px, -11px, 0) rotate(-40deg) skewX(70deg) scale(2);
        text-shadow: 0 0 5px whitesmoke;
        opacity: 0;
      }
    }
    @-webkit-keyframes smoky-mirror {
      60% {
        text-shadow: 0 0 12px whitesmoke;
      }
      to {
        -webkit-transform: translate3d(26px, -11px, 0) rotate(-40deg) skewX(-70deg) scale(2);
                transform: translate3d(26px, -11px, 0) rotate(-40deg) skewX(-70deg) scale(2);
        text-shadow: 0 0 5px whitesmoke;
        opacity: 0;
      }
    }
    @keyframes smoky-mirror {
      60% {
        text-shadow: 0 0 12px whitesmoke;
      }
      to {
        -webkit-transform: translate3d(26px, -11px, 0) rotate(-40deg) skewX(-70deg) scale(2);
                transform: translate3d(26px, -11px, 0) rotate(-40deg) skewX(-70deg) scale(2);
        text-shadow: 0 0 5px whitesmoke;
        opacity: 0;
      }
    }
    `;
    el.appendChild(pageStyle);
  },
  cake: {
    style: {
      width: "100%",
      height: "100%",
      position: "relative",
    }
  },
  starrySky: {
    style: {

    }
  },
  cakeContent: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }
  },
  code: {
    style: {
      width: "100%",
      height: "60%",
      fontFamily: '"Consolas","Monaco","Bitstream Vera Sans Mono","Courier New","sans-serif"',
      color: "white",
      padding: "15px",
      boxSizing: "border-box",
      maxWidth: "787px",
      backfaceVisibility: "hidden",
      position: "relative",
      zIndex: "1",
    }
  },
  canvas: {
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
      top: "1.32rem",
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
      top: "2.1rem",
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
