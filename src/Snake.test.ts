import Snake from "../src/Snake";
import Point from "../src/Point";

describe("Snake Class Tests", () => {
  test("Snake initial position and direction", () => {
    const snake = new Snake(new Point(0, 0), 3);
    expect(snake.position.toString()).toBe("0,0");
    expect(snake.direction).toBe(1);
  });

  test("Snake turns and direction changes correctly", () => {
    const snake = new Snake(new Point(0, 0), 3);

    // Turn left from right -> should face up
    snake.turnLeft();
    expect(snake.direction).toBe(0);

    // Turn left from up -> should face left
    snake.turnLeft();
    expect(snake.direction).toBe(-1);

    // Turn left from left -> should face down
    snake.turnLeft();
    expect(snake.direction).toBe(2);

    // Turn left from down -> should face right
    snake.turnLeft();
    expect(snake.direction).toBe(1);

    // Turn right from right -> should face down
    snake.turnRight();
    expect(snake.direction).toBe(2);

    // Turn right from down -> should face left
    snake.turnRight();
    expect(snake.direction).toBe(-1);

    // Turn right from left -> should face up
    snake.turnRight();
    expect(snake.direction).toBe(0);

    // Turn right from up -> should face right
    snake.turnRight();
    expect(snake.direction).toBe(1);
  });

  test("Snake moves correctly in current direction", () => {
    const snake = new Snake(new Point(0, 0), 3);

    snake.move(2);
    expect(snake.position.toString()).toBe("2,0");

    snake.turnRight();
    snake.move(2);
    expect(snake.position.toString()).toBe("2,2");

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("4,2");

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("4,0");

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("2,0");
  });

  test("Snake turns left and right correctly and moves accordingly", () => {
    const snake = new Snake(new Point(0, 0), 3);
    let currentDirection = 1;

    const turnLeftAndMove = (numSquares: number) => {
      snake.turnLeft();
      currentDirection = (currentDirection + 3) % 4;
      snake.move(numSquares);
    };

    const turnRightAndMove = (numSquares: number) => {
      snake.turnRight();
      currentDirection = (currentDirection + 1) % 4;
      snake.move(numSquares);
    };

    turnLeftAndMove(2);
    expect(snake.position.toString()).toBe("0,-2");

    turnRightAndMove(2);
    expect(snake.position.toString()).toBe("2,-2");

    turnLeftAndMove(2);
    expect(snake.position.toString()).toBe("2,-4");

    turnLeftAndMove(2);
    expect(snake.position.toString()).toBe("0,-4");
  });

  test("Snake self-collision detection", () => {
    const startingPosition = new Point(5, 5);
    const initialSize = 5;
    const mySnake = new Snake(startingPosition, initialSize);
    // Moves right
    mySnake.move(3);

    // Turns down
    mySnake.turnRight();
    mySnake.move(3);

    // Turns left
    mySnake.turnRight();
    mySnake.move(3);

    // Turns up
    mySnake.turnRight();
    mySnake.move(3);

    mySnake.logSnakePositions(mySnake.parts); // Head should collide with fourth part of body

    expect(mySnake.didCollide(mySnake)).toBe(true);
  });

  test("Snake grows correctly", () => {
    const snake = new Snake(new Point(0, 0), 3);
    expect(snake.size).toBe(3);

    snake.grow();
    expect(snake.size).toBe(4);
    expect(snake.getCurrentParts.length).toBe(4);
  });

  test("Snake doesn't collide with itself initially", () => {
    const snake = new Snake(new Point(0, 0), 3);
    expect(snake.didCollide(snake)).toBe(false);
  });

  test("Snake moves multiple steps correctly", () => {
    const snake = new Snake(new Point(0, 0), 3);
    snake.move(3);
    expect(snake.position.toString()).toBe("3,0");

    snake.turnRight();
    snake.move(2);
    expect(snake.position.toString()).toBe("3,2");
  });

  test("Snake dies correctly", () => {
    const snake = new Snake(new Point(0, 0), 3);
    expect(snake.isActive).toBe(true);

    snake.die();
    expect(snake.isActive).toBe(false);
  });

  test("Snake turns correctly and moves accordingly", () => {
    const snake = new Snake(new Point(0, 0), 3);

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("0,-2");

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("-2,-2");

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("-2,0");

    snake.turnLeft();
    snake.move(2);
    expect(snake.position.toString()).toBe("0,0");
  });
});
