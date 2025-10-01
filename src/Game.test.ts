import Game from "./Game";
import MainMenuController from "./MainMenuController";
import GameController from "./GameController";

jest.mock("./MainMenuController");
jest.mock("./GameController");

describe("Game", () => {
  let game: Game;

  beforeEach(() => {
    jest.clearAllMocks();

    game = new Game();
  });

  test("constructor initializes game correctly", () => {
    expect(game["contextSwitches"].size).toBe(2);
    expect(game["contextSwitches"].get("START")).toBe("GAME");
    expect(game["contextSwitches"].get("GAME")).toBe("START");

    expect(game["controllers"].size).toBe(2);
    expect(game["controllers"].get("START")).toBeInstanceOf(MainMenuController);
    expect(game["controllers"].get("GAME")).toBeInstanceOf(GameController);

    expect(game["currentContext"]).toBe("START");
  });

  test("switchContext changes context from START to GAME", () => {
    const mockGameController = game["controllers"].get(
      "GAME",
    ) as jest.Mocked<GameController>;
    game.switchContext({ someData: "test" });

    expect(game["currentContext"]).toBe("GAME");
    expect(mockGameController.init).toHaveBeenCalledWith({ someData: "test" });
  });

  test("switchContext changes context from GAME to START", () => {
    game.switchContext({});

    const mockMainMenuController = game["controllers"].get(
      "START",
    ) as jest.Mocked<MainMenuController>;
    game.switchContext({ otherData: "test" });

    expect(game["currentContext"]).toBe("START");
    expect(mockMainMenuController.init).toHaveBeenCalledWith({
      otherData: "test",
    });
  });

  test("switchContext handles unknown context", () => {
    (game as any)["currentContext"] = "UNKNOWN";

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    game.switchContext({});

    expect(consoleSpy).toHaveBeenCalledWith(
      "No controller found for context: undefined",
    );

    consoleSpy.mockRestore();
  });

  test("switchContext passes data to controller.init", () => {
    const testData = { players: 2, difficulty: "hard" };
    const mockGameController = game["controllers"].get(
      "GAME",
    ) as jest.Mocked<GameController>;

    game.switchContext(testData);

    expect(mockGameController.init).toHaveBeenCalledWith(testData);
  });
});
