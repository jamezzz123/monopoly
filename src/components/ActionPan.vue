<template>
  <div class="flex justify-around">
    <ClassicButton :color="'#193498'" @click="toggleSettings()">
      <div class="flex items-center">
        <Icon
          icon="bxs:building-house"
          class="mx-1 text-white"
          style="font-size: 50px"
        />
        <span>BUILDD</span>
      </div>
    </ClassicButton>
    <ClassicButton :color="'#069A8E'">
      <div class="flex items-center">
        <Icon
          icon="emojione:money-bag"
          class="mx-1 text-white"
          style="font-size: 50px"
        />
        <span>SELL</span>
      </div>
    </ClassicButton>
    <ClassicButton :color="'#A6D1E6'">
      <div class="flex items-center">
        <Icon
          icon="emojione:bank"
          class="mx-1 text-white"
          style="font-size: 50px"
        />
        <span>BANK</span>
      </div>
    </ClassicButton>
    <ClassicButton :color="'#f48225'">
      <div class="flex items-center">
        <Icon
          icon="emojione:handshake-medium-light-skin-tone"
          class="mx-1 text-white"
          style="font-size: 50px"
        />
        <span>DEAL</span>
      </div>
    </ClassicButton>
  </div>
</template>

<script>
import ClassicButton from "@/components/ClassicButton.vue";
import { Icon } from "@iconify/vue";
import { useSettings } from "@/store/settings";
export default {
  components: {
    ClassicButton,
    Icon,
  },
  setup() {
    let s = useSettings();
    function toggleSettings() {
      return (s.gary_board = !s.gary_board);
    }
    return {
      toggleSettings,
    };
  },
};
</script>

<style lang="scss" scoped></style>
