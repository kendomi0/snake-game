import Point from "../src/Point";

describe("Point", () => {
  test("should create a point with given coordinates", () => {
    const point = new Point(3, 4);
    expect(point.x).toBe(3);
    expect(point.y).toBe(4);
  });

  test("should return the correct x and y coordinates", () => {
    const point = new Point(10, 20);
    expect(point.x).toBe(10);
    expect(point.y).toBe(20);
  });

  test("should return the correct string representation", () => {
    const point = new Point(5, 6);
    expect(point.toString()).toBe("5,6");
  });

  test("should correctly check equality of two points", () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(1, 2);
    const point3 = new Point(2, 3);

    expect(point1.equals(point2)).toBe(true);
    expect(point1.equals(point3)).toBe(false);
  });
});
