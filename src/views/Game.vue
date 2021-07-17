<template>
  <Board />
  <Dice
    :rollDice="test"
    @diceResult="logResult($event)"
    @doneRollingDice="test = false"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/board/board.vue";
import Dice from "@/components/dice/dice.vue";
export default defineComponent({
  data() {
    return {
      test: false,
    };
  },
  components: {
    Board,
    Dice,
  },
  methods: {
    logResult(e: number[]) {
      console.log(e);
    },
  },
  mounted() {
    setTimeout(() => {
      this.test = true;
    }, 3000);
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
