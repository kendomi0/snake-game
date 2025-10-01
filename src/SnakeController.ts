import Snake from "./Snake";
import WorldModel from "./WorldModel";
import Point from "./Point";

class SnakeController {
  private snakeWorld: WorldModel;
  private slitherer: Snake;

  constructor(sw: WorldModel, slither: Snake) {
    this.snakeWorld = sw;
    this.slitherer = slither;
  }

  turnSnakeLeft() {
    console.log("turnSnakeLeft called");
    this.slitherer.turnLeft();
    console.log(`Snake new direction: ${this.slitherer.direction}`);
  }

  turnSnakeRight() {
    console.log("turnSnakeRight called");
    this.slitherer.turnRight();
    console.log(`Snake new direction: ${this.slitherer.direction}`);
  }

  public get snakePosition(): Point {
    return this.slitherer.position;
  }

  public get snakeDirection(): number {
    return this.slitherer.direction;
  }

  public get worldWidth(): number {
    return this.snakeWorld.width;
  }

  public get worldHeight(): number {
    return this.snakeWorld.height;
  }

  public get isSnakeActive(): boolean {
    return this.slitherer.isActive;
  }
}

export default SnakeController;
