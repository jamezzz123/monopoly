<template>
  <Board class="relative inline-block">
    <PiecePath
      :players="players"
      class="absolute"
      ref="piecePathComponent"
      style="top: 6%; left: 5%"
    />
    <Dice class="absolute" style="top: 30%; left: 23%" />
    <h1>
      <pre>{{ playerss }}</pre>
    </h1>
  </Board>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive } from "vue";
// import { useStore } from "vuex";
import { usePlayerStore } from "@/store/player";
import Board from "@/components/board/board.vue";
import Dice from "@/components/dice/dice.vue";
import PiecePath from "@/components/path/piecePath.vue";
import useMovement from "@/hooks/pieceMovement";
import useDiceRoll from "@/hooks/diceRoll";
import { Player } from "@/model/player";

export default defineComponent({
  data() {
    return {
      test: false,
    };
  },
  setup() {
    const Players = usePlayerStore();
    Players.addPlayer({
      image: "gorilla",
      link: require("@/assets/svg/001-gorilla.svg"),
      location: 1,
      name: "Jack",
      bankBalance: 1000,
      properties: [1, 5, 6, 6, 7, 8],
    });
    Players.addPlayer({
      image: "owl",
      link: require("@/assets/svg/001-owl.svg"),
      location: 1,
      name: "mr jack",
      bankBalance: 1000,
      properties: [],
    });

    Players.addPlayer({
      image: "panda",
      link: require("@/assets/svg/006-panda.svg"),
      location: 1,
      name: "mr jacie",
      bankBalance: 1000,
      properties: [],
    });

    let { rotateDice } = useDiceRoll();
    let { moveObject } = useMovement();
    let GameStart = ref(false);
    let diceSum = (e: number[]): number =>
      e.reduce((acc, current) => acc + current);

    let updatePlayerPosition = (endMove: number) => {
      let path = { start: endMove, end: 0 };
      Players.updateCurrentPlayer(path);
    };
    type moves = {
      start: number;
      end: number;
    };
    const stateGame = async () => {
      GameStart.value = true;
      while (GameStart.value) {
        let diceRollCount = diceSum(await rotateDice());
        let moves = (await moveObject(
          Players.getCurrentPlayer,
          diceRollCount
        )) as moves;
        updatePlayerPosition(moves.end);
        Players.updatePlayerTurn();
      }
    };

    onMounted(async () => {
      await stateGame();
    });

    return {
      players: Players.players,
    };
  },
  components: {
    Board,
    Dice,
    PiecePath,
  },
});
</script>

<style scoped></style>
