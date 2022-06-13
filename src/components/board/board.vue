<template>
  <div>
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
            <template v-if="item.owner">
              <div class="inside">
                <h2>{{ item.label }}</h2>
                <div
                  class="d-flex py-2"
                  :style="{ backgroundColor: item.owner.dominateColor }"
                >
                  <!-- <h4>{{ item.owner }}</h4> -->
                  <span></span> <strong>{{ item.rent.rent }}</strong>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="inside">
                <h2>{{ item.label }}</h2>
                <!-- <h4>{{ item.owner }} 233454</h4> -->
                <span></span> <strong>{{ item.price }}</strong>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import board_data from "./board-data.json";
import { useBoard } from "@/store/board";

export default defineComponent({
  setup() {
    const board = useBoard();
    return {
      boardData: board.board.List,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./board.scss";
</style>
