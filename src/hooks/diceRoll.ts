import { ref, onMounted } from "vue";
import DiceMovement from "@/components/dice/dice-roll-class";
export default function diveMovement() {
  // Think of a way around this
  const diceMovement: any = ref("");
  let element: HTMLCanvasElement | null = null;

  onMounted(() => {
    element = document.getElementById("canvas-element") as HTMLCanvasElement;
    diceMovement.value = new DiceMovement(element);
  });

  const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  // This is a hack to get around the fact that we can't use a ref in a watch
  // https://github.com/vuejs/vue/issues/7396

  const rotateDice = async (
    arr: number[] = [getRandomIntInclusive(0, 5), getRandomIntInclusive(0, 5)]
  ) => await diceMovement.value.move(arr);

  return {
    rotateDice,
  };
}
