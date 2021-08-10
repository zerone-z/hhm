const { h } = Vue;
// Vue组件
export default {
  name: "love",
  render() {
    return h(
      "div", {
        class: "love",
        style: Style.love.style,
      },
      [
        h(
          "div",
          {
            class: "beating-heart",
            style: Style.beatingHeart.style,
          },
          [
            h(
              "div",
              {
                class: "heart",
                style: Style.heart.style,
              }
            ),
            h(
              "div",
              {
                class: "happy-word",
                style: Style.happyWord.style,
              },
              "HAPPY".split("").map((char, index) => {
                return h(
                  "span", 
                  {
                    class: "char" + (index + 1),
                    style: Style.happyWord["char" + (index + 1)].style
                  },
                  char
                )
              })
            ),
            h(
              "div",
              {
                class: "birth-word",
                style: Style.birthWord.style,
              },
              "BIRTH",
            ),
            h(
              "div",
              {
                class: "day-word",
                style: Style.dayWord.style,
              },
              "DAY".split("").map((char, index) => {
                return h(
                  "span", 
                  {
                    class: "char" + (index + 1),
                    style: Style.dayWord["char" + (index + 1)].style
                  },
                  char
                )
              })
            ),
          ]
        )
      ]
    );
  },
  data: () => ({
  }),
  created() {
    Style.init();
  },
  mounted () {
  },
  methods: {
  }
}
// 样式设置
let Style = {
  init() {
    // 查找keyframes 是否已经存在，存在则不需要再创建 HEARTBEAT
    let styleSheets = Array.from(document.styleSheets).filter((styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin));
    for (let i = 0; i < styleSheets.length; ++i) {
      for (let j = 0; j < styleSheets[i].cssRules.length; ++j) {
        if (styleSheets[i].cssRules[j].type === window.CSSRule.KEYFRAMES_RULE && styleSheets[i].cssRules[j].name === rule) {
          return;
        }
      }
    }
    // 插入keyframes
    styleSheets[0].insertRule(`
      @keyframes HEARTBEAT {
        0% {
          transform: scale(1);
        }
        5% {
          transform: scale(1.3);
        }
        10% {
          transform: scale(1.1);
        }
        15% {
          transform: scale(1.5);
        }
        50% {
          transform: scale(1);
        }
        100% {
          transform: scale(1);
        }
      }
    `);
    styleSheets[0].insertRule(`
      @keyframes BOUNCEUP {
        0% {
          top: 110px;
        }
        10% {
          top: 80px;
        }
        15% {
          top: 85px;
        }
        20% {
          top: 70px;
        }
        75% {
          top: 110px;
        }
        100% {
          top: 110px;
        }
      }
    `);
    styleSheets[0].insertRule(`
      @keyframes BOUNCEDOWN {
        0% {
          bottom: 70px;
        }
        10% {
          bottom: 60px;
        }
        15% {
          top: 35px;
        }
        20% {
          bottom: 70px;
        }
        75% {
          bottom: 60px;
        }
        100% {
          bottom: 70px;
        }
      }
    `);
  },
  love: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "radial-gradient(ellipse at center, #d84a4a 0%, #ba1919 100%)",
      position: "relative",
    }
  },
  beatingHeart: {
    style: {
      position: "relative",
      top: "50%",
      left: "50%",
      width: "100%",
      height: "512px",
      transform: "translate(-50%, -50%)",
      color: "#ffffff",
      fontSize: "2.0em",
      fontWeight: "bold",
    }
  },
  heart: {
    style: {
      zIndex: 1,
      width: "150px",
      height: "150px",
      position: "absolute",
      top: "50%",
      marginTop: "-75px",
      left: "50%",
      marginLeft: "-75px",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjE3M3B4IiBoZWlnaHQ9IjE1OHB4IiB2aWV3Qm94PSIwIDAgMTczIDE1OCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTczIDE1OCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBmaWxsPSIjRUY0NjU3IiBkPSJNMTU3LjMzMSwxNS41MDRjLTE5LjU1OS0xOS41NTktNTEuMjcxLTE5LjU1OS03MC44MzEsMGMtMTkuNTU5LTE5LjU1OS01MS4yNzEtMTkuNTU5LTcwLjgzMSwwDQoJYy0xOS41NTksMTkuNTU5LTE5LjU1OSw1MS4yNzEsMCw3MC44MzFsNzAuODMxLDcwLjgzbDcwLjgzMS03MC44M0MxNzYuODksNjYuNzc1LDE3Ni44OSwzNS4wNjQsMTU3LjMzMSwxNS41MDR6Ii8+DQo8L3N2Zz4=")',
      animation: "HEARTBEAT 2.5s infinite",
    }
  },
  happyWord: {
    style: {
      width: "200px",
      margin: "auto",
      position: "relative",
    },
    char1: {
      style: {
        height: "350px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "110px",
        transform: "rotate(-36deg)",
        animation: "BOUNCEUP 2.5s infinite",
      }
    },
    char2: {
      style: {
        height: "350px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "110px",
        transform: "rotate(-18deg)",
        animation: "BOUNCEUP 2.5s infinite",
      }
    },
    char3: {
      style: {
        height: "350px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "110px",
        transform: "rotate(0deg)",
        animation: "BOUNCEUP 2.5s infinite",
      }
    },
    char4: {
      style: {
        height: "350px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "110px",
        transform: "rotate(18deg)",
        animation: "BOUNCEUP 2.5s infinite",
      }
    },
    char5: {
      style: {
        height: "350px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "110px",
        transform: "rotate(36deg)",
        animation: "BOUNCEUP 2.5s infinite",
      }
    },
  },
  birthWord: {
    style: {
      fontSize: "2.0em",
      zIndex: "100",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }
  },
  dayWord: {
    style: {

    },
    char1: {
      style: {
        height: "350px",
        lineHeight: "700px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "10px",
        transform: "rotate(18deg)",
        animation: "BOUNCEDOWN 2.5s infinite",
      }
    },
    char2: {
      style: {
        height: "350px",
        lineHeight: "700px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "10px",
        transform: "rotate(0deg)",
        animation: "BOUNCEDOWN 2.5s infinite",
      }
    },
    char3: {
      style: {
        height: "350px",
        lineHeight: "700px",
        position: "absolute",
        width: "20px",
        left: "50%",
        marginLeft: "-10px",
        top: "10px",
        transform: "rotate(-18deg)",
        animation: "BOUNCEDOWN 2.5s infinite",
      }
    }
  }
}
