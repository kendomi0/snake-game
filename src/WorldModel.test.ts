import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";
import Food from "../src/Food";
import ActorCollisionHandlers from "../src/ActorCollisionHandlers";
import IWorldView from "../src/IWorldView";

class MockView implements IWorldView {
  public displayCalled: boolean = false;

  display(worldModel: WorldModel): void {
    this.displayCalled = true;
  }

  dispose(): void {}
}

const updateNumOfSteps = (
  times: number,
  actorCollisionHandlers: ActorCollisionHandlers,
) => {
  const blueSnake = new Snake(new Point(0, 0), 3);
  const worldModelOne = new WorldModel(100, 100, actorCollisionHandlers);
  worldModelOne.addActor(blueSnake);
  let totalXCoord = 0;
  let totalYCoord = 0;
  let currentDirection = 1;

  for (let i = 0; i < times; i++) {
    const numOfSteps = Math.floor(Math.random() * 100);

    worldModelOne.updateSteps(numOfSteps);
    if (currentDirection === 1) {
      totalXCoord += numOfSteps;
    } else if (currentDirection === -1) {
      totalXCoord -= numOfSteps;
    } else if (currentDirection === 0) {
      totalYCoord -= numOfSteps;
    } else if (currentDirection === 2) {
      totalYCoord += numOfSteps;
    }

    blueSnake.turnLeft();
    currentDirection = (currentDirection + 3) % 4;

    worldModelOne.updateSteps(numOfSteps);
    if (currentDirection === 1) {
      totalXCoord += numOfSteps;
    } else if (currentDirection === -1) {
      totalXCoord -= numOfSteps;
    } else if (currentDirection === 0) {
      totalYCoord -= numOfSteps;
    } else if (currentDirection === 2) {
      totalYCoord += numOfSteps;
    }
  }

  return {
    actual: blueSnake.position.toString(),
    expected: `${totalXCoord},${totalYCoord}`,
  };
};

describe("WorldModel Tests", function () {
  let actorCollisionHandlers: ActorCollisionHandlers;

  beforeEach(() => {
    actorCollisionHandlers = new ActorCollisionHandlers();
  });

  const tests = [0, 3, 10, 4].map((num) =>
    updateNumOfSteps(num, actorCollisionHandlers),
  );

  const testDescriptions = ["correctly updates the snake's position"];

  testDescriptions.forEach((description, index) => {
    it("is a description", () =>
      expect(tests[index].actual).toBe(tests[index].expected));
  });

  it("should correctly add actors to the world model", () => {
    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake = new Snake(new Point(0, 0), 3);
    worldModel.addActor(snake);

    const actorsArray = Array.from(worldModel.actors);
    expect(actorsArray.length).toBe(1);
    expect(actorsArray[0]).toBe(snake);
  });

  it("should call display on all views when updateSteps is called", () => {
    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const mockView = new MockView();
    worldModel.addView(mockView);

    worldModel.updateSteps(1);

    expect(mockView.displayCalled).toBe(true);
  });

  it("should remove the first snake when two snakes collide not head on", () => {
    const spy = jest.spyOn(actorCollisionHandlers, "applyCollisionAction");

    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake1 = new Snake(new Point(0, 0), 3);
    const snake2 = new Snake(new Point(1, 0), 3);

    const snake1DieSpy = jest.spyOn(snake1, "die");
    const snake2DieSpy = jest.spyOn(snake2, "die");

    worldModel.addActor(snake1);
    worldModel.addActor(snake2);

    const initialActorsArray = Array.from(worldModel.actors);
    expect(initialActorsArray.length).toBe(2);

    worldModel.updateSteps(1);

    expect(actorCollisionHandlers.applyCollisionAction).toHaveBeenCalled();
    expect(snake1DieSpy).toHaveBeenCalled();

    expect(snake1DieSpy).toHaveBeenCalled();
    expect(snake2DieSpy).not.toHaveBeenCalled();
    expect(snake1.isActive).toEqual(false);
    expect(snake2.isActive).toEqual(true);

    const finalActorsArray = Array.from(worldModel.actors);
    expect(finalActorsArray).not.toContain(snake1);
    expect(finalActorsArray).toContain(snake2);

    spy.mockRestore();
  });

  it("should remove both snakes when two snakes collide head on", () => {
    const spy = jest.spyOn(actorCollisionHandlers, "applyCollisionAction");

    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake1 = new Snake(new Point(0, 0), 3);
    const snake2 = new Snake(new Point(4, 0), 3);
    snake2.direction = -1;

    const snake1DieSpy = jest.spyOn(snake1, "die");
    const snake2DieSpy = jest.spyOn(snake2, "die");

    worldModel.addActor(snake1);
    worldModel.addActor(snake2);

    const initialActorsArray = Array.from(worldModel.actors);
    expect(initialActorsArray.length).toBe(2);

    worldModel.updateSteps(2);

    expect(actorCollisionHandlers.applyCollisionAction).toHaveBeenCalled();

    expect(snake1DieSpy).toHaveBeenCalled();
    expect(snake2DieSpy).toHaveBeenCalled();
    expect(snake1.isActive).toEqual(false);
    expect(snake2.isActive).toEqual(false);

    const finalActorsArray = Array.from(worldModel.actors);
    expect(finalActorsArray).not.toContain(snake1);
    expect(finalActorsArray).not.toContain(snake2);

    spy.mockRestore();
  });

  it("should keep the snake and deactivate food when a snake collides with food", () => {
    const spy = jest.spyOn(actorCollisionHandlers, "applyCollisionAction");

    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake = new Snake(new Point(0, 0), 3);
    const food = new Food(1, 0);

    worldModel.addActor(snake);
    worldModel.addActor(food);

    const initialActorsArray = Array.from(worldModel.actors);
    expect(initialActorsArray.length).toBe(2);

    worldModel.updateSteps(1);

    expect(actorCollisionHandlers.applyCollisionAction).toHaveBeenCalled();

    expect(food.isActive).toEqual(false);
    expect(snake.size).toEqual(4);

    spy.mockRestore();
  });

  it("should reset the world model to its initial state", () => {
    const worldModel = new WorldModel(100, 100, actorCollisionHandlers);
    const snake = new Snake(new Point(0, 0), 3);
    const mockView = new MockView();

    worldModel.addActor(snake);
    worldModel.addView(mockView);

    worldModel.reset();

    const finalActorsArray = Array.from(worldModel.actors);
    expect(finalActorsArray.length).toBe(0);

    expect(mockView.displayCalled).toBe(false);
  });
});

describe("Addition", function () {
  it("sums numbers", () => {
    expect(1 + 1).toEqual(2);
  });
});

export {};
