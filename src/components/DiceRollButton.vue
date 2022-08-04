<template>
  <div class="rounded-md">
    <button
      @click="$emit('button:click')"
      href="#"
      class="shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10 border-white border-12"
    >
      <Icon icon="ion:dice" class="mx-2 text-white" style="font-size: 50px" />
      Roll Dice
    </button>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped></style>
