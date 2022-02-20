<template>
  <div class="flex">
    <Board class="relative inline-block">
      <PiecePath
        :players="players"
        class="absolute"
        ref="piecePathComponent"
        style="top: 6%; left: 5%"
      />
      <Dice class="absolute" style="top: 30%; left: 23%" />
    </Board>
    <div class="flex-1">
      <div class="py-2 px-3">
        <PlayerCard
          v-for="(player, index) in players"
          :key="index"
          :name="player.name"
          :amount="player.bankBalance"
          :image="player.link"
          :active="index === Players.getPlayerTurn"
        ></PlayerCard>
      </div>
    </div>
    <transition name="modal">
      <my-modal ref="place" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, nextTick } from "vue";
import { usePlayerStore } from "@/store/player";
import { useBoard } from "@/store/board";
import Board from "@/components/board/board.vue";
import Dice from "@/components/dice/dice.vue";
import PiecePath from "@/components/path/piecePath.vue";
import PlayerCard from "@/components/PlayerCard.vue";
import useMovement from "@/hooks/pieceMovement";
import useDiceRoll from "@/hooks/diceRoll";
import { Player } from "@/model/player";
import MyModal from "@/components/MyModal.vue";
import { getPlayerBoardPosition } from "@/utils/index";

type board = {
  label: string;
  price: string;
  icon: string;
  color: string;
  order: string;
  pos: string;
  board_position: number;
};

export default defineComponent({
  data() {
    return {
      test: false,
    };
  },
  setup() {
    let place = ref<null | { show: (agr: any) => null }>(null);
    let property = reactive({ details: {} as board });

    const Players = usePlayerStore();
    const board = useBoard();

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
    function getBoardPositionDetails(playerPosition: number) {
      return board.board.List.find(
        (item) => item.board_position === playerPosition
      );
    }
    const stateGame = async () => {
      GameStart.value = true;
      while (GameStart.value) {
        let diceRollCount = diceSum(await rotateDice());
        let moves = (await moveObject(
          Players.getCurrentPlayer,
          diceRollCount
        )) as moves;
        // calculate the position
        // Number.parseInt(moves.end / 0.025);
        let playerBoardPosition = getPlayerBoardPosition(moves.end);
        // find the the board object where that border position
        property.details = getBoardPositionDetails(
          playerBoardPosition
        ) as board;
        // console.log(place.value);
        // alert(JSON.stringify(property.details));
        let result = await place.value?.show(property.details);
        // alert(result);
        // showModal.value = true;
        // find the the board object where that border position
        // equals Answer
        // get the board detail pass to the modal then show modal

        updatePlayerPosition(moves.end);
        Players.updatePlayerTurn();
      }
    };

    onMounted(async () => {
      nextTick().then(() => {
        setTimeout(async () => {
          await stateGame();
        }, 4000);
      });
    });

    return {
      players: Players.players,
      turn: Players.getPlayerTurn,
      Players,
      property,
      place,
    };
  },
  components: {
    Board,
    Dice,
    PiecePath,
    PlayerCard,
    MyModal,
  },
});
</script>

<style scoped>
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
