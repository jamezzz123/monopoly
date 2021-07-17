import Zdog, { Anchor as anchor, Illustration as illustrate } from "zdog";
import anime from "animejs";

const randomInt = (max = 5) => Math.floor(Math.random() * max);

const { Illustration, Group, Anchor, Rect, TAU, Ellipse } = Zdog;

export default class DiceMovement {
  element: HTMLCanvasElement | SVGSVGElement;
  rotation: { x: number; y: number; z: number };
  rotate: (
    | { x?: undefined; y?: undefined }
    | { x: number; y?: undefined }
    | { y: number; x?: undefined }
  )[];
  illustration: illustrate;
  dice: anchor;
  dice2: anchor;
  constructor(canvasElement: HTMLCanvasElement) {
    this.element = canvasElement;

    this.illustration = new Illustration({
      element: this.element,
      zoom: 1.2,
    });

    // anchor point used for the rotation
    this.dice = new Anchor({
      addTo: this.illustration,
    });

    // group describing the faces through rounded rectangles
    const faces = new Group({
      addTo: this.dice,
    });
    // due to the considerable stroke, it is possible to fake the dice using four faces only
    const face = new Rect({
      addTo: faces,
      stroke: 50,
      width: 50,
      height: 50,
      color: "white",
      translate: {
        z: -25,
      },
    });

    // rotate the faces around the center
    face.copy({
      rotate: {
        x: TAU / 4,
      },
      translate: {
        y: 25,
      },
    });

    face.copy({
      rotate: {
        x: TAU / 4,
      },
      translate: {
        y: -25,
      },
    });

    face.copy({
      translate: {
        z: 25,
      },
    });

    // include the dots repeating as many shapes/groups as possible
    // ! when copying an element be sure to reset the rotation/translation of the copied shape
    const one = new Ellipse({
      addTo: this.dice,
      diameter: 15,
      stroke: false,
      fill: true,
      color: "black",
      translate: {
        z: 50,
      },
    });

    const two = new Group({
      addTo: this.dice,
      rotate: {
        x: TAU / 4,
      },
      translate: {
        y: 50,
      },
    });

    one.copy({
      addTo: two,
      translate: {
        y: 20,
      },
    });

    one.copy({
      addTo: two,
      translate: {
        y: -20,
      },
    });

    const three = new Group({
      addTo: this.dice,
      rotate: {
        y: TAU / 4,
      },
      translate: {
        x: 50,
      },
    });

    one.copy({
      addTo: three,
      translate: {
        z: 0,
      },
    });

    one.copy({
      addTo: three,
      translate: {
        x: 20,
        y: -20,
        z: 0,
      },
    });

    one.copy({
      addTo: three,
      translate: {
        x: -20,
        y: 20,
        z: 0,
      },
    });

    const four = new Group({
      addTo: this.dice,
      rotate: {
        y: TAU / 4,
      },
      translate: {
        x: -50,
      },
    });

    two.copyGraph({
      addTo: four,
      rotate: {
        x: 0,
      },
      translate: {
        x: 20,
        y: 0,
      },
    });

    two.copyGraph({
      addTo: four,
      rotate: {
        x: 0,
      },
      translate: {
        x: -20,
        y: 0,
      },
    });

    const five = new Group({
      addTo: this.dice,
      rotate: {
        x: TAU / 4,
      },
      translate: {
        y: -50,
      },
    });

    four.copyGraph({
      addTo: five,
      rotate: {
        y: 0,
      },
      translate: {
        x: 0,
      },
    });

    one.copy({
      addTo: five,
      translate: {
        z: 0,
      },
    });

    const six = new Group({
      addTo: this.dice,
      translate: {
        z: -50,
      },
    });

    two.copyGraph({
      addTo: six,
      rotate: {
        x: 0,
        z: TAU / 4,
      },
      translate: {
        x: 0,
        y: 0,
      },
    });

    four.copyGraph({
      addTo: six,
      rotate: {
        y: 0,
      },
      translate: {
        x: 0,
      },
    });

    // object animated through anime.js
    this.rotation = {
      x: 0,
      y: 0,
      z: 0,
    };

    // array describing the rotation necessary to highlight the difference faces
    this.rotate = [
      {},
      {
        x: TAU / 4,
      },
      {
        y: TAU / 4,
      },
      {
        y: (TAU * 3) / 4,
      },
      {
        x: (TAU * 3) / 4,
      },
      {
        x: TAU / 2,
      },
    ];

    this.dice2 = this.dice.copyGraph({
      translate: {
        x: 140,
      },
    });

    // show the static illustration
    this.illustration.updateRenderGraph();
  }

  randomItem(index: number) {
    return {
      diceFaceNumber: index + 1,
      rotationPath: this.rotate[index],
    };
  }

  rollDice({ x = TAU, y = TAU }, dice: anchor): void {
    // animate the object toward the input values;
    anime({
      targets: this.rotation,
      // ! increment the input rotation with a random number of additional rotations
      x: x + TAU * randomInt(),
      y: y + TAU * randomInt(),
      z: TAU * randomInt(),
      duration: 1700,
      // while the object is being updated update the rotation of the this.dice
      // ! remember to update the graphic with the updateRenderGraph() method
      update: () => {
        dice.rotate.x = this.rotation.x;
        dice.rotate.y = this.rotation.y;
        dice.rotate.z = this.rotation.z;
        this.illustration.updateRenderGraph();
      },
    });
  }
  move(randomDiceRoll: number[] = []): number[] {
    console.log(this.dice.rotate);
    const { diceFaceNumber, rotationPath } = this.randomItem(randomDiceRoll[0]);
    const { diceFaceNumber: diceFaceNumber2, rotationPath: rotationPath2 } =
      this.randomItem(randomDiceRoll[1]);
    this.rollDice(rotationPath, this.dice);
    this.rollDice(rotationPath2, this.dice2);
    return [diceFaceNumber, diceFaceNumber2];
  }
}
