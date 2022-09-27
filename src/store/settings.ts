import { defineStore } from "pinia";
import { board_property } from "@/types/board";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useSettings = defineStore("settings", {
  // other options...
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      gary_board: false,
      selectedItem: [] as board_property[],
      buildTotal: 0 as number,
    };
  },
  getters: {
    getBuildTotal(state) {
      return state.selectedItem.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.house_cost,
        0
      );
    },
  },
});
