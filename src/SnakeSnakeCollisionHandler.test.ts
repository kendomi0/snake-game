import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";
import Snake from "./Snake";
import Point from "./Point";

jest.mock("./Snake");

describe("SnakeSnakeCollisionHandler", () => {
  let handler: SnakeSnakeCollisionHandler;
  let snake1: Snake;
  let snake2: Snake;

  beforeEach(() => {
    handler = new SnakeSnakeCollisionHandler();
    snake1 = new Snake(new Point(0, 0), 3);
    snake2 = new Snake(new Point(1, 0), 3);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call die method on both snakes if head-on collision occurs", () => {
    const dieSpy1 = jest.spyOn(snake1, "die");
    const dieSpy2 = jest.spyOn(snake2, "die");

    snake1.position = new Point(1, 0);
    snake2.position = new Point(1, 0);

    handler.applyAction(snake1, snake2);

    expect(dieSpy1).toHaveBeenCalled();
    expect(dieSpy2).toHaveBeenCalled();
  });

  test("should call die method only on the first snake if non-head-on collision occurs", () => {
    const dieSpy1 = jest.spyOn(snake1, "die");
    const dieSpy2 = jest.spyOn(snake2, "die");

    snake1.position = new Point(0, 0);
    snake2.position = new Point(1, 0);

    handler.applyAction(snake1, snake2);

    expect(dieSpy1).toHaveBeenCalled();
    expect(dieSpy2).not.toHaveBeenCalled();
  });
});
