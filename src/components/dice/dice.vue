<template>
  <!-- <div> -->
  <!-- <h1>Hello</h1> -->
  <Button @click="moveIt([5, 0])">Roll</Button>
  <canvas
    id="canvas-element"
    class="dice-class"
    width="400"
    height="400"
  ></canvas>
  <!-- </div> -->
</template>

<script lang="ts">
import DiceMovement from "./dice-roll-class";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup(prop, context) {
    // Think of a way around this
    let diceMovement: any = ref("");
    let element: HTMLCanvasElement | null = null;

    onMounted(() => {
      element = document.getElementById("canvas-element") as HTMLCanvasElement;
      diceMovement.value = new DiceMovement(element);
    });

    const moveIt = (arr: number[]) => {
      diceMovement.value.move(arr);
    };
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
