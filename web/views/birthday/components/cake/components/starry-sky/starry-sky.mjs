const { h } = Vue;
// Vue组件
export default {
  name: "StarrySky",
  render() {
    return h(
      "div", 
      {
        class: "starrySky",
        style: Style.starrySky.style,
        ref: "starrySky",
      },
      h(
        "div", {
          class: "starrySkyContent",
          style: Style.starrySkyContent.style,
          ref: "starrySkyContent"
        },
      )
    );
  },
  data: () => ({
    
  }),
  mounted () {
    Style.init(this.$refs.starrySky);
    this.generateStars(150);
  },
  methods: {
    generateStars(starCount) {
      // 流星
      this.$refs.starrySkyContent.innerHTML = '<div class="star comet"></div>';
      // 星星
      for (var i = 0; i < starCount; i++) {
        var div = document.createElement('div');
        div.className = i % 20 == 0 ? 'star star--big' : i % 9 == 0 ? 'star star--medium' : 'star';
        let attributes = {
          top: Math.round(Math.random() * 100) + "%",
          left: Math.round(Math.random() * 100) + "%",
          animationDuration: (Math.round(Math.random() * 3000) + 3000) + "ms",
          animationDelay: Math.round(Math.random() * 3000) + "ms",
        }
        let attributeString = "";
        for (let key of Object.keys(attributes)) {
          let attr = key.replace(/([A-Z])/g,"-$1").toLowerCase();
          let value = attributes[key];
          attributeString += attr + ":" + value + ";";
        }
        div.setAttribute("style", attributeString);
        this.$refs.starrySkyContent.appendChild(div);
      }
      setTimeout(() => {
        this.runComet();
      }, 5000);
    },
    runComet() {
      let fromRandomX = Math.floor(Math.round(Math.random() * 10));
      let fromRandomY = Math.floor(Math.round(Math.random() * 10));
      let toRandomX = Math.floor(Math.round(Math.random() * 50));
      let toRandomY = Math.floor(Math.round(Math.random() * 50));
      let fromX = "-" + fromRandomX + "vw";
      let fromY = fromRandomY + "vh";
      let middleX = "-" + (fromRandomX + (50 + toRandomX - fromRandomX) / 2) + "vw";
      let middleY = (fromRandomY + (50 + toRandomY - fromRandomY) / 2) + "vh";
      let toX = "-" + (50 + toRandomX) + "vw";
      let toY = (50 + toRandomY) + "vh";
      let rotation = Math.atan((50 + toRandomY - fromRandomY) / (50 + toRandomX - fromRandomX)) * 180 / Math.PI;
      let gt = gsap.timeline({
        onComplete: () => {
          this.runComet();
        }
      });
      gt.set(".comet", {
        opacity: 0.3,
        x: fromX,
        y: fromY,
        rotation: -rotation,
      }).to(".comet", {
        keyframes: [
          {
            duration: 0.6,
            opacity: 1,
            rotation: -rotation,
            x: middleX,
            y: middleY,
          },
          {
            duration: 0.6,
            opacity: 0,
            x: toX,
            y: toY,
            rotation: -rotation,
          },
          {
            duration: 5,
            opacity: 0,
            x: toX,
            y: toY,
            rotation: -rotation,
          }
        ]
      });
    },
  }
}
// 样式设置
let Style = {
  init(el) {
    if (el.getElementsByTagName("style").length > 0) {
      return;
    }
    let pageStyle = document.createElement("style");
    pageStyle.media = "screen";
    pageStyle.scoped = true;
    pageStyle.id = "StarrySkyStyle";
    pageStyle.innerHTML = 
    `
    .starrySky .star {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      position: absolute;
      background-color: rgba(237, 205, 163, 0.8);
      box-shadow: 0 0 40px 0 rgba(237, 205, 163, 0.8), 0 0 20px 0 #FFFFFF;
      animation: glow 5s infinite;
    }
    .starrySky .star--medium {
      width: 6px;
      height: 6px;
    }
    .starrySky .star--big {
      width: 9px;
      height: 9px;
      box-shadow: 0 0 40px 0 #EDCDA3, 0 0 20px 0 #FFFFFF, inset 0 0 4px #FFFFFF;
    }
    .starrySky .comet {
      width: 6px;
      height: 6px;
      background-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 0 40px 0 #EDCDA3, 0 0 20px 0 #FFFFFF, inset 0 0 8px rgba(255, 255, 255, 0.6);
      top: 0;
      left: 100%;
      opacity: 0.3;
      transform: rotate(-45deg) translate(0, -50px);
      animation: comet 6s infinite;
    }
    .starrySky .comet:after {
      content: '';
      width: 20vw;
      height: 6px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 20px rgba(237, 205, 163, 0.4);
      position: absolute;
      top: 0;
      left: 0;
    }
    
    @keyframes glow {
      0% {
        opacity: 0.9;
      }
      50% {
        opacity: 0.2;
      }
      100% {
        opacity: 0.9;
      }
    }
    @keyframes comet1 {
      0% {
        transform: rotate(-45deg) translateX(0);
        opacity: 0.3;
      }
      10% {
        opacity: 1;
      }
      20% {
        transform: rotate(-45deg) translateX(-100vw);
        opacity: 0;
      }
      100% {
        transform: rotate(-45deg) translateX(-100vw);
        opacity: 0;
      }
    }
    `;
    el.appendChild(pageStyle);
  },
  starrySky: {
    style: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "-1",
      overflow: "hidden",
    }
  },
  starrySkyContent: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#03061A",
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
