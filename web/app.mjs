const { h, KeepAlive, Transition, resolveDynamicComponent } = Vue;
const { RouterView } = VueRouter;
// Vue组件
export default {
  render() {
    return h(
      "div", {
        class: "hhm-views",
        style: Style.views,
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
                      style: Style.view,
                    }
                  )
                )
              }
            )
          }
        }
      )
    );
  }
}
// 样式设置
let Style = {
  views: {
    width: "100%",
    height: "100%",
  },
  view: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  }
}
