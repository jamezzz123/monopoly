<template>
  <div
    data-test="property-modal"
    v-show="state.showModal"
    class="flex flex-col overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-opacity-50 bg-gray-500"
    style="z-index: 1200"
  >
    <div class="bg-white w-1/3 my-4 p-4 rounded">
      <div class="border-2 border-black">
        <div class="bg-yellow-300 border-b-2 border-black p-3 text-center">
          <h2
            class="font-large capitalize antialiased text-xl font-bold text-black mt-0 roboto-font"
          >
            OFFER A DEAL
          </h2>
        </div>
        <div class="p-3 text-black" v-if="state.player">
          <!-- <pre>   {{ state.player.name }} </pre> -->
          <div class="flex flex-col">
            <div class="flex justify-between space-x-5">
              <div class="w-full">
                <PlayerCard
                  :name="Players.getCurrentPlayer.name"
                  :id="Players.getCurrentPlayer.id"
                  :amount="Players.getCurrentPlayer.bankBalance"
                  :image="Players.getCurrentPlayer.link"
                ></PlayerCard>
              </div>
              <div class="w-full">
                <PlayerCard
                  :name="state.player.name"
                  :id="state.player.id"
                  :amount="state.player.bankBalance"
                  :image="state.player.link"
                ></PlayerCard>
              </div>
            </div>
            <div class="my-1">
              <div class="w-full capitalize">
                <div
                  class="flex justify-between"
                  :class="[state.value > 0 ? 'flex-row-reverse' : 'flex-row']"
                >
                  <div
                    v-if="state.value > 0"
                    class="flex justify-between w-1/4"
                  >
                    <div>
                      <Icon
                        class="text-green-500"
                        style="font-size: 40px"
                        icon="ph:arrow-fat-left-fill"
                      ></Icon>
                    </div>
                    <div>
                      <p>money</p>
                      <p class="text-green-600">{{ state.value }}</p>
                    </div>
                  </div>
                  <div
                    v-if="state.value < 0"
                    class="flex justify-between w-1/4"
                  >
                    <div>
                      <p>money</p>
                      <p class="text-red-600">{{ state.value }}</p>
                    </div>
                    <div>
                      <Icon
                        class="text-red-500"
                        style="font-size: 40px"
                        icon="ph:arrow-fat-right-fill"
                      ></Icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-4">
              <!-- <label for="step" class="font-bold text-gray-600"
                >Step range</label
              > -->
              <input
                v-model="state.value"
                type="range"
                :min="Number(-Players.getCurrentPlayer.bankBalance)"
                step="100"
                :max="Players.getCurrentPlayer.bankBalance"
                class="w-full h-3 bg-blue-500 appearance-none rounded"
              />
            </div>
          </div>
        </div>
        <div class="bg-white p-3 text-center">
          <div class="flex justify-between my-2">
            <button
              @click="state.showModal = false"
              data-test="cancel-modal-button"
              ref="cancel"
              class="px-5 py-2 bg-rose-600 roboto-font rounded text-white drop-shadow-md font-medium tracking-wider hover:bg-red-700 hover:drop-shadow-lg"
            >
              Cancel
            </button>
            <button
              data-test="ok-modal-button"
              ref="ok"
              class="px-5 py-2 bg-green-600 roboto-font text-white rounded drop-shadow-md font-medium tracking-wider hover:bg-green-700 hover:drop-shadow-lg"
            >
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import PlayerCard from "@/components/PlayerCard.vue";
import { usePlayerStore } from "@/store/player";
import { Icon } from "@iconify/vue";
import { Player } from "@/types/player";

type stateObj = {
  showModal: boolean;
  player: Player | null;
  value: number;
};

export default defineComponent({
  components: {
    Icon,
    PlayerCard,
  },
  setup() {
    const Players = usePlayerStore();
    const state = reactive<stateObj>({
      showModal: false,
      player: null,
      value: 0,
    });

    function show(status = true, player: Player) {
      state.showModal = status;
      console.log(player);
      state.player = player;
    }

    return {
      state,
      show,
      Players,
    };
  },
});
</script>

<style lang="scss" scoped>
.oswald-font {
  font-family: "Oswald", sans-serif;
}

.roboto-font {
  font-family: "Roboto", sans-serif;
}
</style>
