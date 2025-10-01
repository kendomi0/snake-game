import SnakeController from "./SnakeController";

abstract class Player {
  /**
    Creates a new player.
    @param sc: The given snake controller.
     */
  constructor(public sc: SnakeController) {}

  /**    
    Turns the snake in order to avoid a wall. Void method in this class.
     */
  abstract makeTurn(): void;

  isActive() {
    return this.sc.isSnakeActive;
  }
}

export default Player;
