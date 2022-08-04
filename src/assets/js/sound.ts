import { Howl } from "howler";
import sneaky_snitch from "@/assets/audio/sneaky_snitch.mp3";
import attack_on_titan from "@/assets/audio/attack_on_titan.mp3";
import diceRoll from "@/assets/audio/dice_roll.mp3";
import pieceMovement from "@/assets/audio/piece-move-sound-effect.mp3";
import moneyAccount from "@/assets/audio/account.mp3";
import pop from "@/assets/audio/pop-7.mp3";
export default {
  sneaky: new Howl({
    src: [sneaky_snitch],
  }),
  aot: new Howl({
    src: [attack_on_titan],
  }),
  diceRoll: new Howl({
    src: [diceRoll],
    volume: 1.0,
  }),
  pieceMovement: new Howl({
    src: [pieceMovement],
    rate: 0.75,
    volume: 0.4,
  }),
  money: new Howl({
    src: [moneyAccount],
    volume: 0.5,
  }),
  pop: new Howl({
    src: [pop],
    volume: 0.5,
  }),
};
