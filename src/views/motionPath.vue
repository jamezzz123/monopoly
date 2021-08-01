<template>
  <div class="h-screen bg-gray-500">
    <!-- <div class="p-4 m-5 bg-blue-300"></div> -->
    <!-- <img
      id="item"
      style="width: 50%"
      src="../assets/svg/001-gorilla.svg"
      alt=""
      srcset=""
    /> -->
    <img
      id="item"
      style="width: 80px"
      src="../assets/svg/001-gorilla.svg"
      alt=""
      srcset=""
    />

    <!-- <svg width="100%" height="100%" id="svg"> -->
    <!-- <circle cx="100" cy="100" r="3" />
      <circle cx="300" cy="20" r="3" /> -->
    <!-- <path id="path" d="M 60 470 L 50 20 L 960 20 L 960 460 Z" /> -->
    <!-- <g id="rect">
        <rect width="85" height="30" fill="dodgerblue" />
        <text x="10" y="19" font-size="14">SVG &lt;rect&gt;</text>
      </g> -->
    <!-- </svg> -->
    <!-- <img src="../assets/logo.png" /> -->
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
    // gsap.set("#item", {
    //   xPercent: -50,
    //   yPercent: -50,
    //   transformOrigin: "50% 50%",
    // });
    gsap.to("#item", {
      duration: 5,
      repeat: 12,
      motionPath: {
        path: "M 1196 1196 L 1196 195 L 28 189 L 26 1196 Z",

        // M 350 370 L 350 160 L 10 150 L 30 380 Z
        // start: 0,
        // end: 0.0227,
        // align: "#path",
        autoRotate: true,
      },
    });

    // gsap.to("#rect", {
    //   duration: 5,
    //   repeat: 12,
    //   repeatDelay: 3,
    //   yoyo: true,
    //   ease: "power1.inOut",
    //   motionPath: {
    //     path: "#path",
    //     align: "#path",
    //     autoRotate: true,
    //     alignOrigin: [0.5, 0.5],
    //   },
    // });
    // motionPath: {
    //   path: "M 60 470 L 50 20 L 960 20 L 960 460 Z";
    // }
  },
});
</script>

<style scoped></style>
