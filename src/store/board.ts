import { defineStore } from "pinia";
import board_data from "@/components/board/board-data.json";
import { board } from "@/types/board";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useBoard = defineStore("board", {
  // other options...
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      board: board_data as board,
    };
  },
  actions: {
    addHouseCount(boardId: number) {
      const index = this.board.List.findIndex(
        (item) => item.board_position === boardId
      );
      if (index > -1) {
        const currentHouseCount = this.board.List[index].house_count;
        console.log(currentHouseCount + 1);
        this.board.List[index].house_count = currentHouseCount + 1;
      }
    },
    removeHouseCount(boardId: number) {
      const index = this.board.List.findIndex(
        (item) => item.board_position === boardId
      );
      if (index > -1) {
        const currentHouseCount = this.board.List[index].house_count;
        this.board.List[index].house_count = currentHouseCount - 1;
      }
    },
  },
  getters: {
    getBoardProp: (state) => {
      return (boardId: number) =>
        state.board.List.find((prop) => prop.id === boardId);
    },
  },
});
