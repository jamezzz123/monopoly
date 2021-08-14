import { onMounted } from "vue";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Player } from "@/model/player";
gsap.registerPlugin(MotionPathPlugin);

export default function pieceMovement() {
  const moveObject = (
    { image, path = { start: 0, end: 0 } }: Player,
    totalDiceRoll: number
  ) => {
    return new Promise((resolve, reject) => {
      gsap.to(`#${image}`, {
        motionPath: {
          path: "#path",
          align: "#path",
          alignOrigin: [0.5, 0.5],
          // autoRotate: true,
          start: path.end,
          end: path.end + 0.025 * totalDiceRoll,
        },
        delay: 5,
        duration: 5,
        onComplete: () => {
          // updated the state of the player in vuex
          resolve("Done");
        },
      });
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
