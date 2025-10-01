import IActor from "./IActor";
import Point from "./Point";

class Food implements IActor {
  private currentPosition: Point;
  private isCurrentlyActive: boolean;

  constructor(x: number, y: number) {
    this.currentPosition = new Point(x, y);
    this.isCurrentlyActive = true;
  }

  eat() {
    this.isCurrentlyActive = false;
  }

  update() {}

  move(steps: number) {}

  didCollide(other: IActor): boolean {
    return this.currentPosition.equals(other.position);
  }

  public get position() {
    return this.currentPosition;
  }

  public get isActive() {
    return this.isCurrentlyActive;
  }

  public get type() {
    return "Food";
  }
}

export default Food;
