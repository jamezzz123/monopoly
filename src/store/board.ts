import { defineStore } from "pinia";
import board_data from "@/components/board/board-data.json";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useBoard = defineStore("board", {
  // other options...
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      board: board_data,
    };
  },
});
