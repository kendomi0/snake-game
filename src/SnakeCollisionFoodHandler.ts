import IActor from "./IActor";
import ICollisionHandler from "./ICollisionHandler";
import Snake from "./Snake";
import Food from "./Food";

class SnakeCollisionFoodHandler implements ICollisionHandler {
  applyAction(snake: Snake, food: Food) {
    food.eat();
    snake.grow();
  }
}

export default SnakeCollisionFoodHandler;
