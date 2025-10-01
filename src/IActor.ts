import Point from "./Point";

interface IActor {
  position: Point;
  type: string;
  update: (steps: number) => void;
  move(steps: number): void;
  didCollide(other: IActor): boolean;
}

export default IActor;
