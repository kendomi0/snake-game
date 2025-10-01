import Snake from "../src/Snake";
import Food from "../src/Food";
import Point from "../src/Point";
import SnakeCollisionFoodHandler from "../src/SnakeCollisionFoodHandler";
import ICollisionHandler from "../src/ICollisionHandler";

describe("SnakeCollisionFoodHandler", () => {
  let snake: Snake;
  let food: Food;
  let collisionHandler: ICollisionHandler;

  beforeEach(() => {
    snake = new Snake(new Point(0, 0), 3);
    food = new Food(0, 0);
    collisionHandler = new SnakeCollisionFoodHandler();
  });

  test("should call eat method on food when snake collides with food", () => {
    jest.spyOn(food, "eat");
    jest.spyOn(snake, "grow");

    collisionHandler.applyAction(snake, food);

    expect(food.eat).toHaveBeenCalled();
    expect(snake.grow).toHaveBeenCalled();
  });

  test("should grow the snake when snake collides with food", () => {
    const initialSize = snake.size;
    collisionHandler.applyAction(snake, food);

    expect(snake.size).toBe(initialSize + 1);
  });

  test("should deactivate the food when snake collides with food", () => {
    collisionHandler.applyAction(snake, food);

    expect(food.isActive).toBe(false);
  });
});
