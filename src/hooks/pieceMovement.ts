import { onMounted } from "vue";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Player } from "@/model/player";
gsap.registerPlugin(MotionPathPlugin);

export default function pieceMovement() {
  type moves = {
    start: number;
    end: number;
  };

  const moveObject = (
    { image, path = { start: 0, end: 0 } }: Player,
    totalDiceRoll: number
  ) => {
    console.log(path.end);
    return new Promise((resolve, reject) => {
      const tween = gsap.to(`#${image}`, {
        motionPath: {
          path: "#path",
          align: "#path",
          alignOrigin: [0.5, 0.5],
          // autoRotate: true,
          start: path.start,
          end: path.start + 0.025 * totalDiceRoll,
        },
        delay: 0,
        duration: 2,
        // onComplete: () => {
        //   // updated the state of the player in vuex
        //   resolve("Done");
        // },
      });

      tween.vars.onComplete = () => {
        resolve(tween.vars.motionPath as moves);
      };
    });
  };

  onMounted(() => {
    console.log("mounted");
    gsap.to(".pieces", {
      motionPath: {
        path: "#path",
        align: "#path",
        alignOrigin: [0.5, 0.5],

        // autoRotate: true,
      },
      stagger: 0.3,
      delay: 0.5,
      // repeat: -1,
      paused: false,
      transformOrigin: "50% 50%",
      duration: 10,
      ease: "power1.inOut",
      onComplete: () => {
        console.log("log");
        // console.log(gsap.getById("pig"));
      },
    });
  });
  return {
    moveObject,
    // players,
  };
}
