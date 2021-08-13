import { createStore } from "vuex";
import { Player } from "@/model/player";

export interface State {
  players: Player[];
}

export default createStore<State>({
  state: {
    players: [
      {
        image: "gorilla",
        link: require("@/assets/svg/001-gorilla.svg"),
        location: 1,
        name: "Jack",
        bankBalance: 1000,
        properties: [1, 5, 6, 6, 7, 8],
      },
      {
        image: "owl",
        link: require("@/assets/svg/001-owl.svg"),
        location: 1,
        name: "mr jack",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "panda",
        link: require("@/assets/svg/006-panda.svg"),
        location: 1,
        name: "mr jacie",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "cow",
        link: require("@/assets/svg/005-cow.svg"),
        location: 1,
        name: "mr jackii",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "bull",
        link: require("@/assets/svg/008-bull.svg"),
        location: 1,
        name: "mr jackff",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "rhinoceros",
        link: require("@/assets/svg/007-rhinoceros.svg"),
        location: 1,
        name: "mr jackly",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "pig",
        link: require("@/assets/svg/008-pig.svg"),
        location: 1,
        name: "mr jackff",
        bankBalance: 1000,
        properties: [],
      },
      {
        image: "crocodile",
        link: require("@/assets/svg/010-crocodile.svg"),
        location: 1,
        name: "mr jack",
        bankBalance: 1000,
        properties: [],
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    getPlayers: (state) => state.players.splice(0, 3),
  },
  modules: {},
});
