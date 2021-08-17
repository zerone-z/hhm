import Love from "./components/love/love.mjs";
import Fireworks from "./components/fireworks/fireworks.mjs";
import Cake from "./components/cake/cake.mjs";
const { h, vShow, resolveComponent, withDirectives, Transition } = Vue;
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
        class: "birthday",
        style: Style.birthday.style
      },
      this.steps.map((name) => {
        return h(
          Transition,
          {
            css: false,
            onBeforeEnter: (el) => { this.beforeEnterEvent(el) },
            onEnter: (el, done) => { this.enterEvent(el, done) },
            onAfterEnter: (el) => { this.afterEnterEvent(el) },
            onEnterCancelled: (el) => { this.enterCancelledEvent(el) },
            onBeforeLeave: (el) => { this.beforeLeaveEvent(el) },
            onLeave: (el, done) => { this.leaveEvent(el, done) },
            onLeaveCancelled: (el) => { this.leaveCancelledEvent(el) },
          },
          {
            default: () => {
              return withDirectives(
                h(resolveComponent(name), 
                  {
                    ref: name,
                    key: name,
                    style: Style.step.style,
                    onStop: () => { this.stopEvent(name) },
                  }
                ),
                [[vShow, this.currentStep == name]]
              )
            }
          }
        )
      }),
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
      this.currentRef.stop();
      this.currentIndex += 1;
      this.$nextTick(() => {
        this.currentRef.run();
      })
    },
    beforeEnterEvent(el) {
      gsap.set(el, {
        opacity: 1,
        transformOrigin: "150% 50%",
      })
    },
    enterEvent(el, done) {
      gsap.from(el, {
        delay: 0.2,
        duration: 0.5,
        ease: "power0.out",
        z: -500,
        rotationY: -90,
        opacity: 0,
        onComplete: done,
      })
    },
    afterEnterEvent(el) {
      console.log("afterEnterEvent");
    },
    enterCancelledEvent(el) {
      console.log("enterCancelledEvent");
    },
    beforeLeaveEvent(el) {
      console.log("beforeLeaveEvent");
      gsap.set(el, {
        opacity: 1,
        transformOrigin: "-50% 50%",
      })
    },
    leaveEvent(el, done) {
      gsap.to(el, {
        duration: 0.5,
        ease: "power0.in",
        z: -500,
        rotationY: 90,
        opacity: 0,
        onComplete: done,
      });
    },
    leaveCancelledEvent() {
      console.log("leaveCancelledEvent");
    },
  }
}

// 样式设置
let Style = {
  birthday: {
    style: {
      position: "relative",
      overflow: "hidden",
      transformStyle: "preserve-3d",
      perspective: "1200px",
    }
  },
  step: {
    style: {
      position: "absolute",
      top: "0px",
      left: "0px",
    }
  }
}
