import Food from "../src/Food";
import Point from "../src/Point";
import IActor from "../src/IActor";

describe("Food", () => {
  let food: Food;

  beforeEach(() => {
    food = new Food(10, 20);
  });

  test("should initialize with correct position and active state", () => {
    expect(food.position).toEqual(new Point(10, 20));
    expect(food.isActive).toBe(true);
  });

  test("should deactivate when eaten", () => {
    food.eat();
    expect(food.isActive).toBe(false);
  });

  test("should not change position when update is called", () => {
    const initialPosition = food.position;
    food.update();
    expect(food.position).toEqual(initialPosition);
  });

  test("should not move when move is called", () => {
    const initialPosition = food.position;
    food.move(5);
    expect(food.position).toEqual(initialPosition);
  });

  test("should detect collision with another actor at the same position", () => {
    const otherActor = { position: new Point(10, 20) } as IActor;
    expect(food.didCollide(otherActor)).toBe(true);
  });

  test("should not detect collision with another actor at a different position", () => {
    const otherActor = { position: new Point(30, 40) } as IActor;
    expect(food.didCollide(otherActor)).toBe(false);
  });

  test("should return correct type", () => {
    expect(food.type).toBe("Food");
  });
});
