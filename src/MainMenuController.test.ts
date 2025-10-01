import MainMenuController from "./MainMenuController";
import Game from "./Game";

jest.mock("./Game");

describe("MainMenuController", () => {
  let mainMenuController: MainMenuController;
  let mockGame: jest.Mocked<Game>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockGame = new Game() as jest.Mocked<Game>;

    mainMenuController = new MainMenuController(mockGame);

    document.body.innerHTML = "";
  });

  test("constructor creates necessary elements", () => {
    expect(mainMenuController["playGameButton"]).toBeDefined();
    expect(mainMenuController["humanPlayersInput"]).toBeDefined();
    expect(mainMenuController["aiPlayersInput"]).toBeDefined();

    expect(mainMenuController["playGameButton"].textContent).toBe(
      "Start Game!",
    );
    expect(mainMenuController["humanPlayersInput"].placeholder).toBe(
      "Enter number of human players",
    );
    expect(mainMenuController["aiPlayersInput"].placeholder).toBe(
      "Enter number of computer players",
    );
  });

  test("init method appends elements to document body", () => {
    mainMenuController.init({});

    expect(document.body.children.length).toBe(3);
    expect(
      document.body.contains(mainMenuController["humanPlayersInput"]),
    ).toBeTruthy();
    expect(
      document.body.contains(mainMenuController["aiPlayersInput"]),
    ).toBeTruthy();
    expect(
      document.body.contains(mainMenuController["playGameButton"]),
    ).toBeTruthy();
  });

  test("switchContext method removes elements and calls game.switchContext", () => {
    mainMenuController.init({});
    mainMenuController["humanPlayersInput"].value = "2";
    mainMenuController["aiPlayersInput"].value = "1";

    mainMenuController["switchContext"]();

    expect(document.body.children.length).toBe(0);
    expect(mockGame.switchContext).toHaveBeenCalledWith({
      numOfHumanPlayers: 2,
      numOfAIPlayers: 1,
    });
  });

  test("playGameButton click triggers switchContext", () => {
    const switchContextSpy = jest.spyOn(
      mainMenuController as any,
      "switchContext",
    );
    mainMenuController.init({});

    mainMenuController["playGameButton"].click();

    expect(switchContextSpy).toHaveBeenCalled();
  });

  test("switchContext handles empty input values", () => {
    mainMenuController.init({});
    mainMenuController["humanPlayersInput"].value = "";
    mainMenuController["aiPlayersInput"].value = "";

    mainMenuController["switchContext"]();

    expect(mockGame.switchContext).toHaveBeenCalledWith({
      numOfHumanPlayers: NaN,
      numOfAIPlayers: NaN,
    });
  });
});
