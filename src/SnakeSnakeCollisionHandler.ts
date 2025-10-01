import IActor from "./IActor";
import ICollisionHandler from "./ICollisionHandler";
import Snake from "./Snake";

class SnakeSnakeCollisionHandler implements ICollisionHandler {
  applyAction(snake1: Snake, snake2: Snake) {
    if (snake1.position.equals(snake2.position)) {
      snake1.die();
      snake2.die();
    } else {
      snake1.die();
    }
  }

  toString(): string {
    return "SnakeSnakeCollisionHandler";
  }
}

export default SnakeSnakeCollisionHandler;
