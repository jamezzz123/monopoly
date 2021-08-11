<template>
  <div class="">
    <svg
      width="1052"
      height="1052"
      viewBox="0 0 1052 1052"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="path"
        d="M1051 1051H1V1H1051V1051Z"
        stroke="transparent"
        stroke-width="2"
      />
    </svg>

    <img
      id="item"
      style="width: 50px"
      src="@/assets/svg/001-gorilla.svg"
      alt=""
      srcset=""
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default defineComponent({
  setup() {
    return {};
  },
  mounted() {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.to("#item", {
      motionPath: {
        path: "#path",
        align: "#path",
        alignOrigin: [0.5, 0.5],
        // autoRotate: true,
      },
      transformOrigin: "50% 50%",
      duration: 5,
      ease: "power1.inOut",
    });
  },
});
</script>

<style scoped></style>
