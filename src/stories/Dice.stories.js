import Dice from "../components/dice/dice.vue";

export default {
  title: "Arena/Dice",
  component: Dice,
  argTypes: {
    // size: {
    //   control: { type: "select", options: ["small", "medium", "large"] },
    // },
    // onClick: {},
  },
};

export const dice = (args) => ({
  components: { Dice },
  setup() {
    return { args };
  },
  template: '<dice v-bind="args" />',
});
