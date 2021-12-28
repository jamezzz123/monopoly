import { defineStore } from "pinia";
import { Player } from "@/model/player";

export type RootState = {
  players: Player[];
  playerTurn: 0;
};

export type path = {
  start: number;
  end: number;
};

export const usePlayerStore = defineStore("player", {
  state: () =>
    ({
      players: [] as Player[],
      playerTurn: 0 as number,
    } as RootState),

  actions: {
    addPlayer(player: Player) {
      this.players.push(player);
    },
    updatePlayerTurn() {
      this.playerTurn++;
      if (this.playerTurn >= this.players.length) {
        this.playerTurn = 0;
      }
    },
    updateCurrentPlayer(path: path) {
      // const player = this.players[this.playerTurn];
      this.players[this.playerTurn].path = path;
    },
  },
  getters: {
    getCurrentPlayer: (state) => {
      return state.players[state.playerTurn];
    },
    getPlayerTurn: (state) => {
      return state.playerTurn;
    },
  },
});
