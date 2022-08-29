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
      <div class="sticky bottom-2/4" style="z-index: 1200">
        <div class="absolute" style="left: 65%">
          <ClassicButton
            v-if="!rolledDice"
            :color="'#be2e25'"
            @click="RollDiceFunc()"
          >
            <div class="flex items-center">
              <Icon
                icon="ion:dice"
                class="mx-1 text-white"
                style="font-size: 50px"
              />
              <span>Roll Dice</span>
            </div>
          </ClassicButton>

          <ClassicButton v-else :color="'#01a9ea'" @click="Done()"
            >Done</ClassicButton
          >

          <ClassicButton :color="'#f48225'" @click="startAudio()"
            >Start Audio</ClassicButton
          >
        </div>
      </div>
    </Board>
    <div class="flex-1">
      <div class="py-2 px-3 sticky-div">
        <SettingsPan></SettingsPan>
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
import { defineComponent, onMounted, ref } from "vue";
import { usePlayerStore } from "@/store/player";
import { useBoard } from "@/store/board";
import Board from "@/components/board/board.vue";
import Dice from "@/components/dice/dice.vue";
import PiecePath from "@/components/path/piecePath.vue";
import PlayerCard from "@/components/PlayerCard.vue";
import SettingsPan from "@/components/SettingsPan.vue";
// import DiceRollButton from "@/components/DiceRollButton.vue";
import ClassicButton from "@/components/ClassicButton.vue";
import { Icon } from "@iconify/vue";
import useMovement from "@/hooks/pieceMovement";
import useDiceRoll from "@/hooks/diceRoll";
import { Player } from "@/types/player";
import { board, board_property } from "@/types/board";
import PropertyModal from "@/components/PropertyModal.vue";
import { getPlayerBoardPosition } from "@/utils/index";
import { useBilling } from "@/hooks/billing";
import { useProperty } from "@/hooks/property";
import { prominent } from "color.js";
import PlaySound from "@/assets/js/sound";

export default defineComponent({
  setup() {
    let property = ref<null | { show: (agr: any) => null }>(null);
    let boardProp = useProperty();
    const billing = useBilling();
    const Players = usePlayerStore();
    const board = useBoard();
    let rolledDice = ref<boolean>(false);

    Players.addPlayer({
      id: "go",
      image: "gorilla",
      link: require("@/assets/svg/001-gorilla.svg"),
      location: 1,
      name: "Jack",
      bankBalance: 1000,
      properties: [1, 5, 6, 6, 7, 8],
      dominateColor: "red",
      path: {
        start: 0,
        end: 0,
      },
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
      path: {
        start: 0,
        end: 0,
      },
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
      path: {
        start: 0,
        end: 0,
      },
    });

    // setTimeout(() => {
    //   Players.players.forEach((element) => {
    //     // console.log(element);
    //     let img = document.getElementById(element.image) as HTMLImageElement;
    //     console.log(img);
    //     if (img) {
    //       let color = colorThief.getColor(img);
    //       console.log(`rgb(${color.join(",")})`);
    //       element.dominateColor = `rgb(${color.join(",")})`;
    //     }
    //   });
    // }, 3000);

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
    // const stateGame = async () => {
    //   GameStart.value = true;
    //   while (GameStart.value) {
    //     console.log("hello");
    //   }
    // };

    async function RollDiceFunc() {
      rolledDice.value = true;
      let currentPlayer = Players.getCurrentPlayer;
      if (currentPlayer && currentPlayer.image) {
        let elem = document.getElementById(currentPlayer?.image);
        elem?.scrollIntoView();
      }
      PlaySound.diceRoll.play();
      let diceRollCount = diceSum(await rotateDice());
      PlaySound.diceRoll.stop();
      PlaySound.pieceMovement.play();
      let moves = (await moveObject(currentPlayer, diceRollCount)) as moves;
      PlaySound.pieceMovement.stop();

      if (currentPlayer && currentPlayer.image) {
        let elem = document.getElementById(currentPlayer?.image);
        elem?.scrollIntoView();
      }

      if (moves.end >= 1) {
        moves.end = moves.end - 1;
        currentPlayer.bankBalance += 1000;

        updatePlayerPosition(moves.end);
      } else {
        updatePlayerPosition(moves.end);
      }

      //   rolledDice.value = true;

      RollDiceFuncGameRules();
    }
    function Done() {
      rolledDice.value = false;
      Players.updatePlayerTurn();
    }
    async function RollDiceFuncGameRules() {
      let currentPlayer = Players.getCurrentPlayer;
      // calculate the position
      // Number.parseInt(moves.end / 0.025);
      let playerBoardPosition = getPlayerBoardPosition(
        currentPlayer.path.start
      );
      // find the the board object where that border position
      let propertyDetails = getBoardPositionDetails(playerBoardPosition);

      if (propertyDetails?.owner === null) {
        PlaySound.pop.play();
        let result = await property.value?.show(propertyDetails);

        if (result && propertyDetails) {
          billing.buyProperty(propertyDetails.id);
        }
      }
      if (
        propertyDetails?.owner !== null &&
        (propertyDetails?.property || propertyDetails?.utility)
      ) {
        let prices = boardProp.getCurrentPiecePrice(propertyDetails);
        if (prices) {
          billing.subtractFunds(currentPlayer.id, prices);
          billing.addFunds(propertyDetails.owner.id, prices);
        }
      }
    }
    function startAudio() {
      console.log(PlaySound.aot.playing());
      if (PlaySound.aot.playing()) {
        PlaySound.aot.pause();
      } else {
        PlaySound.aot.play();
      }
    }

    onMounted(() => {
      setTimeout(() => {
        let img = document.getElementById(
          Players.players[0].image
        ) as HTMLImageElement;
        console.log(img);
        if (img) {
          // rgba(75,173,58,0.50)
          prominent(img, { format: "hex", sample: 20, amount: 1 }).then(
            (color) => {
              console.log(color); // [241, 221, 63]
              Players.players[0].dominateColor = `${color}`;
            }
          );
        }

        img = document.getElementById(
          Players.players[1].image
        ) as HTMLImageElement;
        console.log(img);
        if (img) {
          // rgba(75,173,58,0.50)
          prominent(img, { format: "hex", sample: 20, amount: 1 }).then(
            (color) => {
              console.log(color); // [241, 221, 63]
              Players.players[1].dominateColor = `${color}`;
            }
          );
        }

        img = document.getElementById(
          Players.players[2].image
        ) as HTMLImageElement;
        console.log(img);
        if (img) {
          // rgba(75,173,58,0.50)
          prominent(img, { format: "hex", sample: 20, amount: 1 }).then(
            (color) => {
              console.log(color); // [241, 221, 63]
              Players.players[2].dominateColor = `${color}`;
            }
          );
        }
      }, 5000);
    });

    return {
      players: Players.players,
      turn: Players.getPlayerTurn,
      Players,
      property,
      RollDiceFunc,
      Done,
      rolledDice,
      startAudio,
    };
  },
  components: {
    Board,
    Dice,
    PiecePath,
    PlayerCard,
    PropertyModal,
    // DiceRollButton,
    ClassicButton,
    Icon,
    SettingsPan,
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
