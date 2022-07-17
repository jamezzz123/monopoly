<template>
  <div class="">
    <svg
      width="1052"
      height="1052"
      viewBox="0 0 1052 1052"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="path"
        d="M1051 1051H1V1H1051V1051Z"
        stroke="transparent"
        stroke-width="2"
      />
    </svg>

    <template v-for="item in players" :key="item.id">
      <img
        :id="item.image"
        class="pieces z-20"
        style="width: 50px"
        :src="item.link"
        alt=""
        srcset=""
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, ref } from "vue";
import { Player } from "@/types/player";
// import useMovement from "@/hooks/pieceMovement";

export default defineComponent({
  props: {
    players: {
      type: Object as PropType<Player[]>,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped></style>
