<template>
  <canvas
    id="canvas-element"
    class="dice-class"
    width="500"
    height="500"
  ></canvas>
  <!-- :title.sync="pageTitle" -->
</template>

<script lang="ts">
import DiceMovement from "./dice-roll-class";
import { defineComponent, onMounted, ref, watch } from "vue";
export default defineComponent({
  props: {
    rollDice: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    // Think of a way around this
    let diceMovement: any = ref("");
    let element: HTMLCanvasElement | null = null;

    onMounted(() => {
      element = document.getElementById("canvas-element") as HTMLCanvasElement;
      diceMovement.value = new DiceMovement(element);
    });

    const getRandomIntInclusive = (min: number, max: number): number => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    // This is a hack to get around the fact that we can't use a ref in a watch
    // https://github.com/vuejs/vue/issues/7396

    watch(
      () => props.rollDice,
      (newValue, oldValue) => {
        if (newValue === true) {
          let results = moveIt([
            getRandomIntInclusive(0, 5),
            getRandomIntInclusive(0, 5),
          ]);

          ctx.emit("diceResult", results);
          ctx.emit("doneRollingDice");
        }
      }
    );

    const moveIt = (arr: number[]) => diceMovement.value.move(arr);

    return {
      moveIt,
    };
  },
});
</script>

<style scoped>
.dice-class {
  position: absolute;
  z-index: 1000;
  top: 150px;
  right: 250px;
}
</style>
