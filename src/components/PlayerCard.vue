<template>
  <div
    class="bg-white border-4 flex font-extralight rounded-md shadow my-2"
    :class="[active ? 'border-green-300' : 'border-white']"
  >
    <img class="px-1" style="width: 50px" :src="image" alt="" />
    <div class="flex flex-col font-normal w-full relative">
      <h6>Name: {{ name }}</h6>
      <h6 class="font-medium roboto-font">
        Amount:
        <span ref="amount" class="oswald-font text-green-500 font-bold">{{
          amount
        }}</span>
      </h6>
      <span
        ref="outlineShow"
        v-once
        class="text-rose-600 oswald-font font-medium revealing"
      >
        - 200</span
      >
    </div>
  </div>
</template>

<script>
import anime from "animejs";
import PlaySound from "@/assets/js/sound";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      animation: "",
    };
  },

  watch: {
    amount(newVal, oldVal) {
      let colorArry =
        newVal - oldVal > 0 ? ["#eab676", "#10b981"] : ["#eab676", "#A03232"];
      PlaySound.money.play();
      anime({
        targets: this.$refs.amount,
        innerHTML: [oldVal, newVal],
        color: colorArry,
        easing: "easeInOutQuad",
        duration: 1000,
        endDelay: 1000,
        round: 1,
        complete: () => {
          PlaySound.money.pause();
          this.$refs.amount.style.color = "#10b981";
        },
      });
      let colorType = newVal - oldVal > 0 ? "#10b981" : "#A03232";
      anime({
        targets: this.$refs.outlineShow,
        translateX: 20,
        translateY: -15,
        scale: [0, 1.5],
        duration: 500,
        easing: "linear",
        endDelay: 1200,
        color: colorType,
        opacity: [0, 1],
        complete: () => {
          this.$refs.outlineShow.style.opacity = 0;
        },
        update: () => {
          this.$refs.outlineShow.innerHTML = (newVal - oldVal).toString();
        },
        // complete: (anime) => {
        //   console.log(anime);
        //   anime.set({
        //     opacity: 0,
        //   });
        // },
        // display: "block",
      });
    },
  },
};
</script>

<style scoped>
.revealing {
  position: absolute;
  right: 30px;
  top: 23px;
  opacity: 0;
}
</style>
