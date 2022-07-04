import { setActivePinia, createPinia } from "pinia";
import { useBoard } from "@/store/board";

describe("Board Store", () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it("Board data Should exist in  store and board has 36 items squares ", () => {
    const board = useBoard();
    expect(board.board).toBeTruthy();
    // i am testing for 36 because my current implementation exclude about 4 squares
    // for UI integration reasons and i seem to have gone far to go back now
    expect(board.board.List.length).toBe(36);
  });
});
