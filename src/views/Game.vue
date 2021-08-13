<template>
  <Board class="relative inline-block">
    <PiecePath
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

export default defineComponent({
  data() {
    return {
      test: false,
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
  mounted() {
    setTimeout(() => {
      this.test = true;
    }, 3000);

    setTimeout(() => {
      let Object = {
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
      };
      (
        this.$refs.piecePathComponent as InstanceType<typeof PiecePath>
      ).moveObject(Object, 12);
    }, 6000);
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
