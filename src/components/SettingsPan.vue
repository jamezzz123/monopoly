<template>
  <div
    class="bg-white border-4 flex font-extralight rounded-md shadow my-2 border-blue-300"
  >
    <Icon
      v-if="!muted"
      @click="toggleSound()"
      icon="octicon:unmute-16"
      class="mx-2 text-blue-500"
      style="font-size: 40px"
    />
    <Icon
      v-else
      @click="toggleSound()"
      icon="bx:volume-mute"
      class="mx-2 text-blue-500"
      style="font-size: 40px"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Icon } from "@iconify/vue";
import { Howler } from "howler";

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    let muted = ref(false);
    function toggleSound() {
      muted.value = !muted.value;
      if (muted.value) {
        Howler.mute(true);
      } else {
        Howler.mute(false);
      }
    }
    return {
      muted,
      toggleSound,
    };
  },
});
</script>

<style lang="scss" scoped></style>
