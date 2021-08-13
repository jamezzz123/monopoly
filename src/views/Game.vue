<template>
  <Board class="relative inline-block">
    <PiecePath
      :players="players"
      class="absolute"
      ref="piecePathComponent"
      style="top: 9%; left: 5%"
    />
  </Board>
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
import PiecePath from "@/components/path/piecePath.vue";
import useMovement from "@/hooks/pieceMovement";

export default defineComponent({
  data() {
    return {
      test: false,
    };
  },
  setup() {
    // const store = useStore();
    let { moveObject, players } = useMovement();
    setTimeout(async () => {
      let moves = moveObject(
        {
          image: "gorilla",
          link: require("@/assets/svg/001-gorilla.svg"),
          location: 1,
          name: "Jack",
          bankBalance: 1000,
          properties: [1, 5, 6, 6, 7, 8],
          path: {
            start: 0,
            end: 0,
          },
        },
        30
      );
      console.log(moves);
    }, 20000);

    return {
      players,
    };
  },
  components: {
    Board,
    Dice,
    PiecePath,
  },
  methods: {
    logResult(e: number[]) {
      console.log(e);
    },
  },
});
</script>

<style scoped></style>
