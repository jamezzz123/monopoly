import { useBoard } from "@/store/board";
import { board_property } from "@/types/board";

export function useProperty() {
  const board = useBoard();

  function getCurrentPiecePrice(boardProp: board_property): number | undefined {
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
        if (typeof boardProp.rent === "number") return boardProp.rent;
      }
    }
  }
  function checkPropertyGroupHasSameOwner(boardProp: board_property) {
    if (boardProp.owner !== null) {
      const currentBoardGroup = boardProp.property_group;
      const ownerIds = currentBoardGroup.map((elem) => {
        const owner = board.getBoardProp(elem)?.owner;
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
    getCurrentPiecePrice,
  };
}
