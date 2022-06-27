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
import { defineComponent } from "vue";
// import board_data from "./board-data.json";
import { useBoard } from "@/store/board";
import { board_property } from "@/types/board";

export default defineComponent({
  setup() {
    const board = useBoard();

    function getCurrentPiecePrice(boardProp: board_property) {
      debugger;
      if (boardProp.owner !== null) {
        if (boardProp.property) {
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
    return {
      boardData: board.board.List,
      getCurrentPiecePrice,
    };
  },
});
</script>

<style scoped lang="scss">
@import "./board.scss";
</style>
