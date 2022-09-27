<template>
  <div
    v-if="state.showModal"
    class="flex flex-col overflow-y-auto overflow-x-hidden fixed justify-center items-center h-modal m-8 h-4/5 w-3/6 md:inset-0 bg-opacity-50 md:right-6"
    style="z-index: 1200; left: 230px; top: 100px"
  >
    <div class="bg-white w-full my-3 rounded">
      <div class="bg-blue-600 p-4 text-center">
        <h1 class="text-white uppercase text-xl font-bold roboto-font">
          Build Levels
        </h1>
      </div>
      <div class="flex justify-around text-lg my-10">
        <span class="uppercase roboto-font"> Total cost </span>
        <span class="oswald-font"> {{ settings.getBuildTotal }} </span>
      </div>

      <div class="flex justify-around text-lg my-10">
        <span class="uppercase"><i>Select monopoly property</i> </span>
      </div>

      <div class="p-4 text-center">
        <div class="flex justify-around oswald-font">
          <ClassicButton :color="'#193498'" @click="build()"
            >Build</ClassicButton
          >
          <ClassicButton :color="'#be2e25'" @click="close()"
            >Cancel</ClassicButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import ClassicButton from "@/components/ClassicButton.vue";
import { useSettings } from "@/store/settings";
import { useBilling } from "@/hooks/billing";
import { usePlayerStore } from "@/store/player";
import { useBoard } from "@/store/board";

export default {
  components: {
    // Icon,
    ClassicButton,
  },
  setup() {
    // const cancel = ref(null);
    // const ok = ref(null);
    // const input = ref(null);
    const billing = useBilling();
    const settings = useSettings();
    const Players = usePlayerStore();
    const Board = useBoard();
    const state = reactive({
      showModal: false,
    });

    function show() {
      state.showModal = true;
    }
    function close() {
      settings.gary_board = false;
      state.showModal = false;
      settings.selectedItem.forEach((item) => {
        Board.removeHouseCount(item.board_position);
      });
      settings.selectedItem = [];
    }

    function build() {
      let currentPlayer = Players.getCurrentPlayer;
      if (currentPlayer.bankBalance < settings.getBuildTotal) {
        console.log("sorry you does not have enough");
        return;
      }
      billing.subtractFunds(currentPlayer.id, settings.getBuildTotal);
      settings.selectedItem = [];
      close();
    }

    return {
      state,
      show,
      close,
      // getTotal: settings,
      settings,
      build,
    };
  },
};
</script>

<style lang="scss" scoped>
.oswald-font {
  font-family: "Oswald", sans-serif;
}

.roboto-font {
  font-family: "Roboto", sans-serif;
}
</style>
