<template>
  <div
    data-test="property-modal"
    v-show="state.showModal"
    class="flex flex-col overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-opacity-50 bg-gray-500"
    style="z-index: 1200"
  >
    <div class="bg-white w-1/4 my-4 p-4 rounded">
      <div class="border-2 border-black">
        <div
          :style="{ backgroundColor: state.property.property_color }"
          class="bg-yellow-300 border-b-2 border-black p-3 text-center"
        >
          <h2
            class="font-large capitalize antialiased text-xl font-bold text-black mt-0 roboto-font"
          >
            {{ state.property.label }}
          </h2>
          <p class="antialiased roboto-font font-medium text-lg">
            Cost:
            <span class="font-medium oswald-font font-bold capitalize">
              {{ state.property.price }}</span
            >
          </p>
        </div>
        <div class="bg-white p-3 text-center">
          <div
            class="flex justify-between roboto-font"
            :key="index"
            v-for="(rent, index) in rentData"
          >
            <div class="flex">
              <span>Rent with</span>
              <Icon
                icon="bi:house"
                class="mx-2 text-green-500"
                style="font-size: 22px"
              />
              X {{ rent.number_of_houser }}
            </div>
            <div class="oswald-font">
              <span>${{ rent.price }}</span>
            </div>
          </div>
          <hr class="border-1 border-black" />
          <div
            class="flex justify-between roboto-font"
            v-for="(property, index) in properties"
            :key="index"
          >
            <div>
              <span>{{ property.name }}</span>
            </div>
            <div class="oswald-font">
              <span>${{ property.price }}</span>
            </div>
          </div>
          <hr class="border-1 border-black" />
          <div class="flex justify-between my-2">
            <button
              :class="[!showBtn ? 'w-full' : '']"
              ref="cancel"
              class="px-5 py-2 bg-rose-600 roboto-font rounded text-white drop-shadow-md font-medium tracking-wider hover:bg-red-700 hover:drop-shadow-lg"
            >
              Cancel
            </button>
            <button
              v-show="showBtn"
              data-test="ok-modal-button"
              ref="ok"
              class="px-5 py-2 bg-green-600 roboto-font text-white rounded drop-shadow-md font-medium tracking-wider hover:bg-green-700 hover:drop-shadow-lg"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { reactive, onMounted, ref } from "vue";
export default {
  components: {
    Icon,
  },
  setup() {
    const cancel = ref(null);
    const ok = ref(null);
    const input = ref(null);
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
      debugger;
      state.property = property;
      state.showBtn = showActionBtn;
      state.showModal = true;

      return new Promise((resolve, reject) => {
        ok.value.addEventListener("click", () => {
          resolve(true);
          state.showModal = false;
        });
        cancel.value.addEventListener("click", () => {
          resolve(false);
          state.showModal = false;
        });
      });
    }

    return {
      ok,
      cancel,
      input,
      rentData,
      properties,
      state,
      show,
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
