<template>
  <Board />
  <Dice />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/board/board.vue";
import Dice from "@/components/dice/dice.vue";
export default defineComponent({
  components: {
    Board,
    Dice,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
