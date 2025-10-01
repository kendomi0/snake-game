import ActorCollisionHandlers from "../src/ActorCollisionHandlers";
import SnakeCollisionFoodHandler from "../src/SnakeCollisionFoodHandler";
import SnakeSnakeCollisionHandler from "../src/SnakeSnakeCollisionHandler";
import IActor from "../src/IActor";
import ICollisionHandler from "../src/ICollisionHandler";
import Snake from "../src/Snake";
import Food from "../src/Food";
import Point from "../src/Point";

describe("ActorCollisionHandlers", () => {
  let collisionHandlers: ActorCollisionHandlers;

  beforeEach(() => {
    collisionHandlers = new ActorCollisionHandlers();
    collisionHandlers.addCollisionAction(
      "Snake",
      "Food",
      new SnakeCollisionFoodHandler(),
    );
    collisionHandlers.addCollisionAction(
      "Snake",
      "Snake",
      new SnakeSnakeCollisionHandler(),
    );
  });

  test("should initialize with default collision handlers", () => {
    expect(collisionHandlers.hasCollisionAction("Snake", "Food")).toBe(true);
    expect(collisionHandlers.hasCollisionAction("Snake", "Snake")).toBe(true);
  });

  test("should add a new collision action", () => {
    const mockHandler: ICollisionHandler = {
      applyAction: jest.fn(),
    };
    collisionHandlers.addCollisionAction("Snake", "Wall", mockHandler);
    expect(collisionHandlers.hasCollisionAction("Snake", "Wall")).toBe(true);
  });

  test("should apply correct collision action", () => {
    const mockHandler: ICollisionHandler = {
      applyAction: jest.fn(),
    };
    collisionHandlers.addCollisionAction("Snake", "Wall", mockHandler);

    const collider = { type: "Snake" } as IActor;
    const collided = { type: "Wall" } as IActor;

    collisionHandlers.applyCollisionAction(collider, collided);

    expect(mockHandler.applyAction).toHaveBeenCalledWith(collider, collided);
  });

  test("should not apply action if no handler is found", () => {
    const mockHandler: ICollisionHandler = {
      applyAction: jest.fn(),
    };
    collisionHandlers.addCollisionAction("Snake", "Wall", mockHandler);

    const collider = { type: "Snake" } as IActor;
    const collided = { type: "Water" } as IActor;

    collisionHandlers.applyCollisionAction(collider, collided);

    expect(mockHandler.applyAction).not.toHaveBeenCalled();
  });

  test("should apply collision action using existing handlers", () => {
    const snake = new Snake(new Point(0, 0), 3);
    const food = new Food(1, 0);
    const snakeCollisionFoodHandler = new SnakeCollisionFoodHandler();

    const mockApplyAction = jest.fn();
    snakeCollisionFoodHandler.applyAction = mockApplyAction;

    collisionHandlers.addCollisionAction(
      "Snake",
      "Food",
      snakeCollisionFoodHandler,
    );
    collisionHandlers.applyCollisionAction(snake, food);

    console.log("mock.instances:", mockApplyAction.mock.instances);

    expect(mockApplyAction).toHaveBeenCalled();
    expect(mockApplyAction).toHaveBeenCalledWith(snake, food);
  });

  test("should apply collision action using SnakeSnakeCollisionHandler", () => {
    const snake1 = new Snake(new Point(0, 0), 3);
    const snake2 = new Snake(new Point(1, 1), 3);
    const snakeSnakeCollisionHandler = new SnakeSnakeCollisionHandler();

    const mockApplyAction = jest.fn();
    snakeSnakeCollisionHandler.applyAction = mockApplyAction;

    collisionHandlers.addCollisionAction(
      "Snake",
      "Snake",
      snakeSnakeCollisionHandler,
    );

    collisionHandlers.applyCollisionAction(snake1, snake2);

    console.log("mock.instances:", mockApplyAction.mock.instances);

    expect(mockApplyAction).toHaveBeenCalled();
    expect(mockApplyAction).toHaveBeenCalledWith(snake1, snake2);
  });

  test("should convert types to keys correctly", () => {
    expect(collisionHandlers.toKey("Snake", "Food")).toBe("Snake,Food");
    expect(collisionHandlers.toKey("Snake", "Snake")).toBe("Snake,Snake");
  });
});
