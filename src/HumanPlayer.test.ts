import SnakeController from "../src/SnakeController";
import IInputHandler from "../src/IInputHandler";
import HumanPlayer from "../src/HumanPlayer";

describe("HumanPlayer", () => {
  let snakeController: SnakeController;
  let iinputHandler: IInputHandler;
  let humanPlayer: HumanPlayer;

  beforeEach(() => {
    snakeController = {
      turnSnakeLeft: jest.fn(),
      turnSnakeRight: jest.fn(),
    } as unknown as SnakeController;

    iinputHandler = {
      madeLeftMove: jest.fn(),
      resetLeftMove: jest.fn(),
      madeRightMove: jest.fn(),
      resetRightMove: jest.fn(),
    } as unknown as IInputHandler;

    humanPlayer = new HumanPlayer(snakeController, iinputHandler);
  });

  test("should turn snake left when left move is made", () => {
    (iinputHandler.madeLeftMove as jest.Mock).mockReturnValue(true);
    (iinputHandler.madeRightMove as jest.Mock).mockReturnValue(false);

    humanPlayer.makeTurn();

    expect(snakeController.turnSnakeLeft).toHaveBeenCalled();
    expect(iinputHandler.resetLeftMove).toHaveBeenCalled();
  });

  test("should turn snake right when right move is made", () => {
    (iinputHandler.madeLeftMove as jest.Mock).mockReturnValue(false);
    (iinputHandler.madeRightMove as jest.Mock).mockReturnValue(true);

    humanPlayer.makeTurn();

    expect(snakeController.turnSnakeRight).toHaveBeenCalled();
    expect(iinputHandler.resetRightMove).toHaveBeenCalled();
  });

  test("should not turn snake if no move is made", () => {
    (iinputHandler.madeLeftMove as jest.Mock).mockReturnValue(false);
    (iinputHandler.madeRightMove as jest.Mock).mockReturnValue(false);

    humanPlayer.makeTurn();

    expect(snakeController.turnSnakeLeft).not.toHaveBeenCalled();
    expect(snakeController.turnSnakeRight).not.toHaveBeenCalled();
    expect(iinputHandler.resetLeftMove).not.toHaveBeenCalled();
    expect(iinputHandler.resetRightMove).not.toHaveBeenCalled();
  });
});
