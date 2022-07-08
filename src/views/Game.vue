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
      <div class="py-2 px-3 sticky-div">
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
      <PropertyModal ref="property" />
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
import { Player } from "@/types/player";
import { board, board_property } from "@/types/board";
import PropertyModal from "@/components/PropertyModal.vue";
import { getPlayerBoardPosition } from "@/utils/index";
import { useBilling } from "@/hooks/billing";
import ColorThief from "colorthief";

const colorThief = new ColorThief();
console.log(colorThief);
export default defineComponent({
  data() {
    return {
      test: false,
    };
  },
  setup() {
    let property = ref<null | { show: (agr: any) => null }>(null);

    const billing = useBilling();
    const Players = usePlayerStore();
    const board = useBoard();

    Players.addPlayer({
      id: "go",
      image: "gorilla",
      link: require("@/assets/svg/001-gorilla.svg"),
      location: 1,
      name: "Jack",
      bankBalance: 1000,
      properties: [1, 5, 6, 6, 7, 8],
      dominateColor: "red",
    });
    Players.addPlayer({
      id: "ow",
      image: "owl",
      link: require("@/assets/svg/001-owl.svg"),
      location: 1,
      name: "mr jack",
      bankBalance: 1000,
      properties: [],
      dominateColor: "blue",
    });

    Players.addPlayer({
      id: "pa",
      image: "panda",
      link: require("@/assets/svg/006-panda.svg"),
      location: 1,
      name: "mr jacie",
      bankBalance: 1000,
      properties: [],
      dominateColor: "green",
    });

    setTimeout(() => {
      Players.players.forEach((element) => {
        // console.log(element);
        let img = document.getElementById(element.image) as HTMLImageElement;
        console.log(img);
        if (img) {
          let color = colorThief.getColor(img);
          console.log(`rgb(${color.join(",")})`);
          element.dominateColor = `rgb(${color.join(",")})`;
        }
      });
    }, 3000);

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
    function getBoardPositionDetails(
      playerPosition: number
    ): board_property | undefined {
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
        let propertyDetails = getBoardPositionDetails(playerBoardPosition);
        // console.log(place.value);
        // alert(JSON.stringify(property.details));
        let result = await property.value?.show(propertyDetails);
        console.log(result);
        console.log(propertyDetails);
        if (result && propertyDetails) {
          billing.buyProperty(propertyDetails.id);
        }

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
    };
  },
  components: {
    Board,
    Dice,
    PiecePath,
    PlayerCard,
    PropertyModal,
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

.sticky-div {
  position: sticky;
  top: 0px;
}
</style>
