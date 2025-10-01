import SnakeController from "../src/SnakeController";
import Snake from "../src/Snake";
import WorldModel from "../src/WorldModel";
import Point from "../src/Point";

describe("SnakeController", () => {
  let snakeWorld: WorldModel;
  let slitherer: Snake;
  let snakeController: SnakeController;

  beforeEach(() => {
    slitherer = {
      turnLeft: jest.fn(),
      turnRight: jest.fn(),
      position: new Point(5, 5),
      direction: 1,
    } as unknown as Snake;

    snakeWorld = {
      width: 100,
      height: 100,
    } as unknown as WorldModel;

    snakeController = new SnakeController(snakeWorld, slitherer);
  });

  it("should turn the snake left", () => {
    snakeController.turnSnakeLeft();
    expect(slitherer.turnLeft).toHaveBeenCalled();
    console.log(
      "Snake controller direction after turning left from right is: " +
        snakeController.snakeDirection,
    );
  });

  it("should turn the snake right", () => {
    snakeController.turnSnakeRight();
    expect(slitherer.turnRight).toHaveBeenCalled();
  });

  it("should get the snake position", () => {
    const position = snakeController.snakePosition;
    expect(position).toEqual(new Point(5, 5));
  });

  it("should get the snake direction", () => {
    const direction = snakeController.snakeDirection;
    expect(direction).toBe(1);
  });

  it("should get the world width", () => {
    const width = snakeController.worldWidth;
    expect(width).toBe(100);
  });

  it("should get the world height", () => {
    const height = snakeController.worldHeight;
    expect(height).toBe(100);
  });
});
