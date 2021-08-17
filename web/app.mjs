const { h, KeepAlive, Transition, resolveDynamicComponent } = Vue;
const { RouterView } = VueRouter;
// Vue组件
export default {
  render() {
    return h(
      "div", {
        class: "hhm-views",
        style: Style.views.style,
        ref: "views",
      },
      null,
      h(
        RouterView,
        null,
        {
          default: (props) => {
            return h(
              Transition,
              null,
              {
                default: () => h(
                  KeepAlive,
                  null,
                  h(
                    props.Component ? resolveDynamicComponent(props.Component) : "div",
                    {
                      class: "hhm-view",
                      style: Style.view.style,
                    }
                  )
                )
              }
            )
          }
        }
      )
    );
  },
  mounted () {
    Style.init(this.$refs.views);
  }
}
// 样式设置
let Style = {
  init(el) {
    if (document.getElementById("hhm-views")) {
      return;
    }
    let pageStyle = document.createElement("style");
    pageStyle.media = "screen";
    pageStyle.setAttribute("scoped", "");
    pageStyle.id = "hhm-views";
    pageStyle.innerHTML = css;
    el.appendChild(pageStyle);
  },
  views: {
    style: {

    }
  },
  view: {
    style: {
      
    }
  }
}

// CSS 样式
let css = `
.hhm-views {
  width: 100%;
  height: 100%;
}
.hhm-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
`
