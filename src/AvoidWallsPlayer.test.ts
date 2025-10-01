import AvoidWallsPlayer from "../src/AvoidWallsPlayer";
import SnakeController from "../src/SnakeController";
import Snake from "../src/Snake";
import WorldModel from "../src/WorldModel";
import ActorCollisionHandlers from "../src/ActorCollisionHandlers";
import Point from "../src/Point";

describe("AvoidWallsPlayer", () => {
  let sc: SnakeController;
  let player: AvoidWallsPlayer;
  let mockSnake: Snake;
  let mockWorld: WorldModel;

  beforeEach(() => {
    mockSnake = new Snake(new Point(50, 50), 3);
    const mockCollisionHandlers = new ActorCollisionHandlers();
    mockWorld = new WorldModel(100, 100, mockCollisionHandlers);
    mockWorld.addActor(mockSnake);
    sc = new SnakeController(mockWorld, mockSnake);
    player = new AvoidWallsPlayer(sc);

    jest.spyOn(sc, "worldWidth", "get").mockReturnValue(100);
    jest.spyOn(sc, "worldHeight", "get").mockReturnValue(100);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(50, 50));

    jest.spyOn(sc, "turnSnakeLeft").mockImplementation(() => {});
    jest.spyOn(sc, "turnSnakeRight").mockImplementation(() => {});
  });

  it("should turn left when snake is moving left and hits the left wall (top half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 25));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving down and hits the bottom wall (left half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(25, 100));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving up and hits the top wall (right half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(0);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(75, 0));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving right and hits the right wall (bottom half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 75));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn right when snake is moving up and hits the top wall (left half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(0);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(25, 0));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving right and hits the right wall (top half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 0));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving down and hits the bottom wall (right half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(75, 100));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving left and hits the left wall (bottom half)", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 75));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving right and hits the top-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 0));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn right when snake is moving down and hits the bottom-right corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(100, 100));
    player.makeTurn();
    expect(sc.turnSnakeRight).toHaveBeenCalled();
  });

  it("should turn left when snake is moving left and hits the top-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(-1);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 0));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });

  it("should turn left when snake is moving down and hits the bottom-left corner", () => {
    jest.spyOn(sc, "snakeDirection", "get").mockReturnValue(2);
    jest.spyOn(sc, "snakePosition", "get").mockReturnValue(new Point(0, 100));
    player.makeTurn();
    expect(sc.turnSnakeLeft).toHaveBeenCalled();
  });
});
