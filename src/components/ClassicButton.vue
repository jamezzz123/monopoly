<template>
  <button class="button-82-pushable" role="button">
    <span class="button-82-shadow"></span>
    <span
      class="button-82-edge"
      :style="{
        background: backendColor,
      }"
    ></span>
    <span
      class="button-82-front text"
      :style="{
        background: frontendColor,
      }"
    >
      <slot></slot
    ></span>
  </button>
</template>

<script>
import hexToHsl from "hex-to-hsl";
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    color: {
      type: String,
      required: true,
      default: "#0a95ff",
    },
  },
  setup(props) {
    // props.message // <-- type: string
    const frontendColor = computed(() => {
      let b = hexToHsl(props.color);
      return `hsl(${b[0]}deg ${b[1]}% ${b[2]}%)`;
    });

    const backendColor = computed(() => {
      let b = hexToHsl(props.color);
      return `linear-gradient(
                to left,
                hsl(${b[0]}deg ${b[1]}% 16%) 0%,
                hsl(${b[0]}deg ${b[1]}% 32%) 8%,
                hsl(${b[0]}deg ${b[1]}% 32%) 92%,
                hsl(${b[0]}deg ${b[1]}% 16%) 100%
                )`;
    });

    return {
      frontendColor,
      backendColor,
    };
  },
});
</script>

<style lang="scss" scoped></style>

<style scoped>
.button-82-pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-82-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.button-82-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}

.button-82-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: hsl(345deg 100% 47%);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-82-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.button-82-pushable:hover .button-82-front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.button-82-pushable:active .button-82-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-82-pushable:hover .button-82-shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.button-82-pushable:active .button-82-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-82-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>
