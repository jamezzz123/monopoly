<template>
  <Board class="relative inline-block">
    <PiecePath
      :players="players"
      class="absolute"
      ref="piecePathComponent"
      style="top: 6%; left: 5%"
    />
    <Dice class="absolute" style="top: 30%; left: 23%" />
  </Board>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Board from "@/components/board/board.vue";
import Dice from "@/components/dice/dice.vue";
import PiecePath from "@/components/path/piecePath.vue";
import useMovement from "@/hooks/pieceMovement";
import useDiceRoll from "@/hooks/diceRoll";

export default defineComponent({
  data() {
    return {
      test: false,
    };
  },
  setup() {
    // const store = useStore();
    const store = useStore();
    const players = store.getters.getPlayers;
    let { rotateDice } = useDiceRoll();
    let { moveObject } = useMovement();
    let GameStart = ref(false);
    let playerTurn = 0;
    let diceSum = (e: number[]): number =>
      e.reduce((acc, current) => acc + current);

    setTimeout(async () => {
      GameStart.value = true;
      while (GameStart.value) {
        // console.log(players);
        let diceRollCount = diceSum(await rotateDice());
        // console.log(getPlayerByTurn(0));
        let moves = await moveObject(
          {
            image: "gorilla",
            link: require("@/assets/svg/001-gorilla.svg"),
            location: 1,
            name: "Jack",
            bankBalance: 1000,
            properties: [1, 5, 6, 6, 7, 8],
          },
          diceRollCount
        );
        console.log(moves);
        playerTurn++;
        if (playerTurn >= players.length) {
          playerTurn = 0;
        }
      }
    }, 10000);

    return {
      players,
    };
  },
  components: {
    Board,
    Dice,
    PiecePath,
  },
  methods: {},
});
</script>

<style scoped></style>
