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
import { defineComponent, onMounted, ref, reactive } from "vue";
// import { useStore } from "vuex";
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
    let players = reactive([
      {
        image: "gorilla",
        link: require("@/assets/svg/001-gorilla.svg"),
        location: 1,
        name: "Jack",
        bankBalance: 1000,
        properties: [1, 5, 6, 6, 7, 8],
      },
      {
        image: "owl",
        link: require("@/assets/svg/001-owl.svg"),
        location: 1,
        name: "mr jack",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "panda",
        link: require("@/assets/svg/006-panda.svg"),
        location: 1,
        name: "mr jacie",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "cow",
        link: require("@/assets/svg/005-cow.svg"),
        location: 1,
        name: "mr jackii",
        bankBalance: 1000,
        properties: [],
      },
    ]) as Player[];
    let { rotateDice } = useDiceRoll();
    let { moveObject } = useMovement();
    let GameStart = ref(false);
    let playerTurn = 0;
    let diceSum = (e: number[]): number =>
      e.reduce((acc, current) => acc + current);

    let updatePlayerPosition = (imageID: string, endMove: number) => {
      let index = players.findIndex((player) => player.image === imageID);
      let path = { start: endMove, end: 0 };
      players[index].path = path;
      // console.log(players);
    };
    type moves = {
      start: number;
      end: number;
    };
    const stateGame = async () => {
      GameStart.value = true;
      while (GameStart.value) {
        let diceRollCount = diceSum(await rotateDice());
        console.log(players[playerTurn]);
        console.log(players);
        let moves = (await moveObject(
          players[playerTurn],
          diceRollCount
        )) as moves;
        updatePlayerPosition(players[playerTurn].image, moves.end);
        // console.log(moves);
        playerTurn++;
        if (playerTurn >= players.length) {
          playerTurn = 0;
        }
      }
    };

    onMounted(async () => {
      await stateGame();
    });

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
