<template>
  <div>
    <div
      data-test="property-modal"
      v-show="state.showModal"
      class="flex flex-col overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-opacity-50 bg-gray-500"
      style="z-index: 1200"
    >
      <div class="bg-white w-1/4 my-4 p-4 rounded">
        <div class="border-2 border-black">
          <div class="bg-yellow-300 border-b-2 border-black p-3 text-center">
            <h2
              class="font-large capitalize antialiased text-xl font-bold text-black mt-0 roboto-font"
            >
              Select the player you want to make a deal with
            </h2>
            <!-- <p class="antialiased roboto-font font-medium text-lg">
            Cost:
            <span class="font-medium oswald-font font-bold capitalize">
              {{ state.property.price }}</span
            >
          </p> -->
          </div>
          <div class="p-3 text-left">
            <template :key="index" v-for="(player, index) in Players.players">
              <PlayerCard
                :name="player.name"
                :id="player.id"
                :amount="player.bankBalance"
                :image="player.link"
                :active="index === Players.getPlayerTurn"
                v-if="index !== Players.getPlayerTurn"
                @click="selectPlayer(player)"
              ></PlayerCard>
            </template>
          </div>
          <div class="bg-white p-3 text-center">
            <!-- <hr class="border-1 border-black" /> -->
            <div class="flex justify-between my-2">
              <button
                @click="state.showModal = false"
                data-test="cancel-modal-button"
                ref="cancel"
                class="px-5 py-2 w-full bg-rose-600 roboto-font rounded text-white drop-shadow-md font-medium tracking-wider hover:bg-red-700 hover:drop-shadow-lg"
              >
                Cancel
              </button>
              <!-- <button
              v-show="state.showBtn"
              data-test="ok-modal-button"
              ref="ok"
              class="px-5 py-2 bg-green-600 roboto-font text-white rounded drop-shadow-md font-medium tracking-wider hover:bg-green-700 hover:drop-shadow-lg"
            >
              Buy
            </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="modal">
      <MakeADeal ref="MakeADeal" />
    </transition>
  </div>
</template>

<script>
// import { Icon } from "@iconify/vue";
import { reactive, onMounted, ref } from "vue";
import PlayerCard from "@/components/PlayerCard.vue";
import { usePlayerStore } from "@/store/player";
import MakeADeal from "@/components/deals/MakeADealModal.vue";

export default {
  components: {
    // Icon,
    PlayerCard,
    MakeADeal,
  },
  setup() {
    const Players = usePlayerStore();
    // const cancel = ref(null);
    // const ok = ref(null);
    const input = ref(null);
    const MakeADeal = ref(null);
    const state = reactive({
      showModal: false,
      property: {
        label: "The label",
      },
      showBtn: true,
    });
    const rentData = [
      {
        number_of_houser: 1,
        price: 200,
      },
      {
        number_of_houser: 2,
        price: 400,
      },
      {
        number_of_houser: 3,
        price: 600,
      },
      {
        number_of_houser: 4,
        price: 800,
      },
    ];
    const properties = [
      {
        name: "House Cost",
        price: 300,
      },
      {
        name: "Hotel Cost",
        price: 600,
      },
    ];

    async function show(property, showActionBtn = true) {
      //   debugger;
      //   state.property = property;
      //   state.showBtn = showActionBtn;
      state.showModal = true;

      //   return new Promise((resolve, reject) => {
      //     ok.value.addEventListener("click", () => {
      //       resolve(true);
      //       state.showModal = false;
      //     });
      //     cancel.value.addEventListener("click", () => {
      //       resolve(false);
      //       state.showModal = false;
      //     });
      //   });
    }

    function selectPlayer(player) {
      // console.log(player);

      MakeADeal.value.show(true, player);
      state.showModal = false;
    }

    return {
      //   ok,
      //   cancel,
      input,
      rentData,
      properties,
      state,
      show,
      Players,
      selectPlayer,
      MakeADeal,
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
