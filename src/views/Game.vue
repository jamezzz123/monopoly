<template>
  <Board />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Board from "@/components/board/board.vue";
export default defineComponent({
  components: {
    Board,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
