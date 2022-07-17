import { mount, VueWrapper } from "@vue/test-utils";
import Board from "@/components/board/board.vue";
import { createTestingPinia } from "@pinia/testing";

describe("Board.vue", () => {
  let wrapper: VueWrapper<any>;
  beforeEach(() => {
    wrapper = mount(Board, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  it("mounted currently", () => {
    expect(wrapper.isVisible).toBeTruthy();
  });

  it("Check if board data exists currently", () => {
    expect(wrapper.vm.boardData).toBeTruthy();
  });

  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("checks game items exists on the game (40)", () => {
    const gameItems = wrapper.findAll('[data-test="board-item"]');
    expect(gameItems.length).toBe(40);
  });
  //   it("renders props.msg when passed", () => {
  //     const div = wrapper.find("div");
  //     expect(div.exists()).toBe(true);
  //   });
});
