import GameController from "../src/GameController";
import Game from "../src/Game";
import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import HumanPlayer from "../src/HumanPlayer";
import AvoidWallsPlayer from "../src/AvoidWallsPlayer";
import CanvasWorldView from "../src/CanvasWorldView";
import Player from "../src/Player";

jest.useFakeTimers();

describe("GameController", () => {
  let game: Game;
  let gameController: GameController;
  let worldModel: WorldModel;

  beforeEach(() => {
    game = new Game();
    gameController = new GameController(game);

    worldModel = (gameController as any).world;

    global.requestAnimationFrame = jest
      .fn()
      .mockImplementation((cb) => setTimeout(cb, 16));

    jest.mock("../src/CanvasWorldView", () => {
      return jest.fn().mockImplementation(() => ({
        dispose: jest.fn(),
      }));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize game with correct number of players", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    const players = (gameController as any).players as Player[];
    expect(players.length).toBe(2);
    expect(players[0]).toBeInstanceOf(HumanPlayer);
    expect(players[1]).toBeInstanceOf(AvoidWallsPlayer);
  });

  test("should add correct number of snakes to the world", () => {
    gameController.init({ numOfHumanPlayers: 2, numOfAIPlayers: 1 });

    const actors = Array.from(worldModel.actors);
    const snakes = actors.filter(
      (actor): actor is Snake => actor instanceof Snake,
    );
    expect(snakes.length).toBe(3);
  });

  test("should create CanvasWorldView", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    const worldView = (gameController as any).worldView;
    expect(worldView).toBeInstanceOf(CanvasWorldView);
  });

  test("should call makeTurn on all players", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    const players = (gameController as any).players as Player[];
    players.forEach((player: Player) => {
      player.makeTurn = jest.fn();
    });

    (gameController as any).run();

    jest.advanceTimersByTime(300);

    players.forEach((player: Player) => {
      expect(player.makeTurn).toHaveBeenCalled();
    });
  });

  test("should call updateSteps on world model after 250 ms", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    worldModel.updateSteps = jest.fn();

    (gameController as any).run();

    jest.advanceTimersByTime(300);

    expect(worldModel.updateSteps).toHaveBeenCalledWith(1);
  });

  test("should not call updateSteps if less than 250 ms have passed", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    worldModel.updateSteps = jest.fn();

    (gameController as any).run();

    jest.advanceTimersByTime(200);

    expect(worldModel.updateSteps).not.toHaveBeenCalled();
  });

  test("should end game when only one player is active", () => {
    gameController.init({ numOfHumanPlayers: 2, numOfAIPlayers: 0 });

    const players = (gameController as any).players as Player[];
    players[0].isActive = jest.fn().mockReturnValue(true);
    players[1].isActive = jest.fn().mockReturnValue(false);

    (gameController as any).endGame = jest.fn();

    (gameController as any).run();

    jest.advanceTimersByTime(300);

    expect((gameController as any).endGame).toHaveBeenCalled();
  });

  test("should call game.switchContext when ending the game", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    game.switchContext = jest.fn();

    (gameController as any).endGame();

    expect(game.switchContext).toHaveBeenCalledWith({});
  });

  test("should dispose worldView when ending the game", () => {
    gameController.init({ numOfHumanPlayers: 1, numOfAIPlayers: 1 });

    const worldView = (gameController as any).worldView;

    worldView.dispose = jest.fn();

    (gameController as any).endGame();

    expect(worldView.dispose).toHaveBeenCalled();
  });
});
