import LRKeyInputHandler from "../src/LRKeyInputHandler";

describe("LRKeyInputHandler", () => {
  let inputHandler: LRKeyInputHandler;

  beforeEach(() => {
    inputHandler = new LRKeyInputHandler();
  });

  test("should initialize with no keys pressed", () => {
    expect(inputHandler.madeLeftMove()).toBe(false);
    expect(inputHandler.madeRightMove()).toBe(false);
  });

  test("should set left arrow flag on keydown", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    // @ts-ignore: Accessing private method for testing
    inputHandler.handleKeydown(event);
    expect(inputHandler.madeLeftMove()).toBe(true);
  });

  test("should set right arrow flag on keydown", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    // @ts-ignore: Accessing private method for testing
    inputHandler.handleKeydown(event);
    expect(inputHandler.madeRightMove()).toBe(true);
  });

  test("should reset left arrow flag", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    // @ts-ignore: Accessing private method for testing
    inputHandler.handleKeydown(event);
    expect(inputHandler.madeLeftMove()).toBe(true);
    inputHandler.resetLeftMove();
    expect(inputHandler.madeLeftMove()).toBe(false);
  });

  test("should reset right arrow flag", () => {
    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    // @ts-ignore: Accessing private method for testing
    inputHandler.handleKeydown(event);
    expect(inputHandler.madeRightMove()).toBe(true);
    inputHandler.resetRightMove();
    expect(inputHandler.madeRightMove()).toBe(false);
  });
});
