import Love from "./components/love/love.mjs";
import Cake from "./components/cake/cake.mjs";
import Fireworks from "./components/fireworks/fireworks.mjs";
const { h, vShow, resolveDirective, withDirectives } = Vue;
export default {
  render() {
    return h(
      "div", {
        class: "birthday"
      },
      [
        withDirectives(h(Love), [[vShow, this.currentIndex == 0]]),
        withDirectives(h(Cake), [[vShow, this.currentIndex == 1]]),
        withDirectives(h(Fireworks), [[vShow, this.currentIndex == 2]])
      ]
    );
  },
  data: () => ({
    currentIndex: 0,
  }),
}
