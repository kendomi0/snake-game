import CanvasWorldView from "../src/CanvasWorldView";
import WorldModel from "../src/WorldModel";
import Snake from "../src/Snake";
import Point from "../src/Point";
import Food from "./Food";
import ActorCollisionHandlers from "../src/ActorCollisionHandlers";

describe("CanvasWorldView", () => {
  let canvasWorldView: CanvasWorldView;
  let worldModel: WorldModel;
  let snake: Snake;
  let scalingFactor = 10;

  beforeEach(() => {
    snake = new Snake(new Point(0, 0), 3);
    const mockCollisionHandlers = new ActorCollisionHandlers();
    worldModel = new WorldModel(100, 100, mockCollisionHandlers);
    worldModel.addActor(snake);
    canvasWorldView = new CanvasWorldView(scalingFactor);
    worldModel.addView(canvasWorldView);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    jest.spyOn(document, "getElementById").mockReturnValue(canvas);
    jest.spyOn(canvas, "getContext").mockReturnValue(context);
  });

  it("should correctly set canvas dimensions based on world model dimensions and scaling factor", () => {
    const expectedWidth = worldModel.width * scalingFactor;
    const expectedHeight = worldModel.height * scalingFactor;
    canvasWorldView.display(worldModel);
    expect(canvasWorldView.canvasWidth).toBe(expectedWidth);
    expect(canvasWorldView.canvasHeight).toBe(expectedHeight);
  });

  it("should clear the canvas before redrawing", () => {
    const clearRectSpy = jest.spyOn(canvasWorldView.canvasContext, "clearRect");
    canvasWorldView.display(worldModel);
    expect(clearRectSpy).toHaveBeenCalledWith(
      0,
      0,
      worldModel.width * scalingFactor,
      worldModel.height * scalingFactor,
    );
  });

  it("should remove the canvas element from the body on dispose", () => {
    const removeChildSpy = jest.spyOn(document.body, "removeChild");
    canvasWorldView.dispose();
    expect(removeChildSpy).toHaveBeenCalledWith(canvasWorldView.canvas);
  });

  it("should draw food at the correct position with the correct color", () => {
    const food = new Food(5, 7);
    worldModel.addActor(food);

    const fillRectSpy = jest.spyOn(canvasWorldView.canvasContext, "fillRect");

    canvasWorldView.display(worldModel);

    expect(fillRectSpy).toHaveBeenCalledWith(
      5 * scalingFactor,
      7 * scalingFactor,
      scalingFactor,
      scalingFactor,
    );

    const fillStyle = canvasWorldView.canvasContext.fillStyle;
    expect(fillStyle).toBe("#ff0000");

    fillRectSpy.mockRestore();
  });

  it("should draw each part of the snake at the correct positions", () => {
    snake.move(5);
    const fillRectSpy = jest.spyOn(canvasWorldView.canvasContext, "fillRect");
    canvasWorldView.display(worldModel);

    snake.getCurrentParts.forEach((part) => {
      const expectedX = part.x * scalingFactor;
      const expectedY = part.y * scalingFactor;
      expect(fillRectSpy).toHaveBeenCalledWith(
        expectedX,
        expectedY,
        scalingFactor,
        scalingFactor,
      );
    });

    fillRectSpy.mockRestore();
  });
});
