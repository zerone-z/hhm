import Love from "./components/love/love.mjs";
import Fireworks from "./components/fireworks/fireworks.mjs";
import Cake from "./components/cake/cake.mjs";
const { h, vShow, resolveComponent, withDirectives } = Vue;
export default {
  name: "Birthday",
  components: {
    Love,
    Cake,
    Fireworks,
  },
  render() {
    return h(
      "div", {
        class: "birthday"
      },
      this.steps.map((name) => {
        return withDirectives(
          h(resolveComponent(name), 
            {
              ref: name,
              onStop: () => { this.stopEvent(name) },
            }
          ),
          [[vShow, this.currentStep == name]]
        )
      })
    );
  },
  data: () => ({
    steps: ["Love", "Fireworks", "Cake"],
    currentIndex: 0,
  }),
  computed: {
    currentStep() {
      return this.steps[this.currentIndex];
    },
    currentRef() {
      return this.$refs[this.currentStep];
    },
  },
  mounted () {
    this.currentRef.run();
  },
  methods: {
    stopEvent(name) {
      if (this.currentIndex >= this.steps.length - 1) {
        return;
      }
      this.currentIndex += 1;
      this.$nextTick(() => {
        this.currentRef.run();
      })
    }
  }
}
