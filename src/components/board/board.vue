<template>
  <div class="table stop">
    <div class="frame">
      <div class="corner tl" style="--order: 1">
        <div>free <span>🅿️</span> parking</div>
      </div>
      <div class="corner tr" style="--order: 11">
        <div>go to <span>👮</span> jail</div>
      </div>
      <div class="corner bl" style="--order: 31">
        <div>in <span>🗝</span> jail</div>
      </div>
      <div class="corner br" style="--order: 41">
        <div>
          <em
            >collect <br />
            £200 salary as you pass</em
          >
          go <span>↖️</span>
        </div>
      </div>
      <div class="center" style="--order: 13">
        <div class="logo">monopoly</div>
        <div class="cards community">community chest</div>
        <div class="cards chance">chance</div>
      </div>
      <template v-if="boardData.length > 0">
        <div
          v-for="(item, index) in boardData"
          :key="index"
          :class="[item.pos, item.color]"
          :style="['--order:' + item.order]"
        >
          <div class="inside">
            <h2>{{ item.label }}</h2>
            <span></span> <strong>{{ item.price }}</strong>
          </div>
        </div>
      </template>
    </div>
  </div>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import board_data from "./board-data.json";

export default defineComponent({
  setup() {
    return {
      boardData: board_data.List,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./board.scss";
</style>
