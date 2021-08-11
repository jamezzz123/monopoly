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

    <template v-for="item in items" :key="item.id">
      <img
        :id="item.id"
        class="pieces"
        style="width: 50px"
        :src="item.link"
        alt=""
        srcset=""
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

export default defineComponent({
  data() {
    return {
      items: [
        {
          id: "gorilla",
          link: require("@/assets/svg/001-gorilla.svg"),
        },
        {
          id: "owl",
          link: require("@/assets/svg/001-owl.svg"),
        },
        {
          id: "panda",
          link: require("@/assets/svg/006-panda.svg"),
        },
        {
          id: "cow",
          link: require("@/assets/svg/005-cow.svg"),
        },
        {
          id: "bull",
          link: require("@/assets/svg/008-bull.svg"),
        },
        {
          id: "rhinoceros",
          link: require("@/assets/svg/007-rhinoceros.svg"),
        },
        {
          id: "pig",
          link: require("@/assets/svg/008-pig.svg"),
        },
        {
          id: "crocodile",
          link: require("@/assets/svg/010-crocodile.svg"),
        },
      ],
    };
  },
  setup() {
    return {};
  },
  mounted() {
    gsap.to(".pieces", {
      motionPath: {
        path: "#path",
        align: "#path",
        alignOrigin: [0.5, 0.5],

        // autoRotate: true,
      },
      stagger: 0.3,
      delay: 0.5,
      // repeat: -1,
      paused: false,
      transformOrigin: "50% 50%",
      duration: 10,
      ease: "power1.inOut",
    });
  },
});
</script>

<style scoped></style>
