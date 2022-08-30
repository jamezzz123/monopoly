<template>
  <div>
    <div class="table stop transition-filter">
      <div class="frame">
        <div
          class="corner tl"
          :class="[toggleGrayScale ? 'grayout' : '']"
          style="--order: 1"
          data-test="board-item"
        >
          <div>free <span>🅿️</span> parking</div>
        </div>
        <div
          class="corner tr"
          :class="[toggleGrayScale ? 'grayout' : '']"
          style="--order: 11"
          data-test="board-item"
        >
          <div>go to <span>👮</span> jail</div>
        </div>
        <div
          class="corner bl"
          :class="[toggleGrayScale ? 'grayout' : '']"
          style="--order: 31"
          data-test="board-item"
        >
          <div>in <span>🗝</span> jail</div>
        </div>
        <div
          class="corner br"
          :class="[toggleGrayScale ? 'grayout' : '']"
          style="--order: 41"
          data-test="board-item"
        >
          <div>
            <em
              >collect <br />
              £200 salary as you pass</em
            >
            go <span>↖️</span>
          </div>
        </div>
        <div
          class="center"
          :class="[toggleGrayScale ? 'grayout' : '']"
          style="--order: 13"
        >
          <div class="logo">monopoly</div>
          <div class="cards community">community chest</div>
          <div class="cards chance">chance</div>
        </div>
        <template v-if="boardData.length > 0">
          <div
            v-for="(item, index) in boardData"
            :key="index"
            :class="[
              item.pos,
              item.color,
              toggleGrayScale ? 'grayout' : '',
              includesInArray([14, 11, 3], item.id) ? 'no-grayout' : '',
            ]"
            :style="['--order:' + item.order]"
            data-test="board-item"
          >
            <template v-if="item.owner">
              <div class="inside">
                <h2>{{ item.label }}</h2>
                <div
                  class="d-flex py-2"
                  :style="{ backgroundColor: item.owner.dominateColor }"
                >
                  <span></span>
                  <strong>{{ getCurrentPiecePrice(item) }}</strong>
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
import { defineComponent, computed } from "vue";
// import board_data from "./board-data.json";
import { useBoard } from "@/store/board";
import { useSettings } from "@/store/settings";

import { board_property } from "@/types/board";
import { includes } from "lodash";

export default defineComponent({
  setup() {
    const board = useBoard();
    const settings = useSettings();

    function getCurrentPiecePrice(boardProp: board_property) {
      if (boardProp.owner !== null) {
        if (boardProp.property) {
          if (typeof boardProp.rent === "object") {
            if (boardProp.hotel_count === 1) {
              return boardProp.hotel_cost;
            }
            if (boardProp.house_count === 4) {
              return boardProp.rent.rentH4;
            }
            if (boardProp.house_count === 3) {
              return boardProp.rent.rentH3;
            }
            if (boardProp.house_count === 2) {
              return boardProp.rent.rentH2;
            }
            if (boardProp.house_count === 1) {
              return boardProp.rent.rentH1;
            }
            if (checkPropertyGroupHasSameOwner(boardProp)) {
              return boardProp.rent.rentWC;
            }

            return boardProp.rent.rent;
          }
        }
        if (boardProp.utility) {
          return boardProp.rent;
        }
      }
    }
    function checkPropertyGroupHasSameOwner(boardProp: board_property) {
      if (boardProp.owner !== null) {
        let currentBoardGroup = boardProp.property_group;
        let ownerIds = currentBoardGroup.map((elem) => {
          let owner = board.getBoardProp(elem)?.owner;
          if (owner) {
            return owner.id;
          }
          return owner;
        });

        return allAreEqual(ownerIds);
      }
    }
    function allAreEqual(array: any) {
      if (array.length > 1) {
        const result = new Set(array).size === 1;

        return result;
      } else {
        return false;
      }
    }

    let toggleGrayScale = computed(() => {
      return settings.gary_board;
    });

    function includesInArray(arrItem: number[], item: number) {
      return includes(arrItem, item);
    }

    return {
      boardData: board.board.List,
      getCurrentPiecePrice,
      toggleGrayScale,
      includesInArray,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./board.scss";

.grayout {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  filter: grayscale(100%);
  transition: all 1s ease;
}

.no-grayout {
  -webkit-filter: grayscale(0%);
  -moz-filter: grayscale(0%);
  filter: grayscale(0%);
  transition: all 1s ease;
}
</style>
