import { createStore } from "vuex";

export default createStore({
  state: {
    players: [
      {
        id: "gorilla",
        link: require("@/assets/svg/001-gorilla.svg"),
        location: 1,
        name: "Jack",
        bankBalance: 1000,
        properties: [1, 5, 6, 6, 7, 8],
      },
      {
        id: "owl",
        link: require("@/assets/svg/001-owl.svg"),
        location: 1,
      },
      {
        id: "panda",
        link: require("@/assets/svg/006-panda.svg"),
        location: 1,
      },
      {
        id: "cow",
        link: require("@/assets/svg/005-cow.svg"),
        location: 1,
      },
      {
        id: "bull",
        link: require("@/assets/svg/008-bull.svg"),
        location: 1,
      },
      {
        id: "rhinoceros",
        link: require("@/assets/svg/007-rhinoceros.svg"),
        location: 1,
      },
      {
        id: "pig",
        link: require("@/assets/svg/008-pig.svg"),
        location: 1,
      },
      {
        id: "crocodile",
        link: require("@/assets/svg/010-crocodile.svg"),
        location: 1,
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
