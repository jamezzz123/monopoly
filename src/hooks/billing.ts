import { ref, onMounted, onUnmounted } from "vue";
import { usePlayerStore } from "@/store/player";
import { useBoard } from "@/store/board";

// by convention, composable function names start with "use"
export function useBilling() {
  const player = usePlayerStore();
  const board = useBoard();

  function buyProperty(board_id: number) {
    const currentPlayer = player.getCurrentPlayer;
    const currentBoardProperty = board.getBoardProp(board_id);

    // console.log(currentPlayer, "board.board");
    // const board = useBoard.getBoard();
    // const property = board.properties[player.path.end];
    if (currentBoardProperty && currentBoardProperty.id) {
      if (currentPlayer.bankBalance >= currentBoardProperty.price) {
        currentPlayer.bankBalance -= Number(currentBoardProperty.price);
        currentPlayer.properties.push(currentBoardProperty.id);
        currentBoardProperty.owner = {
          id: currentPlayer.id,
          name: currentPlayer.name,
          dominateColor: currentPlayer.dominateColor,
        };
      }
    }
  }
  return {
    buyProperty,
  };
}
