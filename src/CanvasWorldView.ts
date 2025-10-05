import IWorldView from "./IWorldView";
import WorldModel from "./WorldModel";
import Snake from "./Snake";
import Food from "./Food";

/** Class implementing the IWorldView interface to display the world model on a canvas. */
class CanvasWorldView implements IWorldView {
  private scalingFactor: number;
  private worldCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  /**
   * Constructs a new CanvasWorldView.
   * @param scalingFactor - The number of pixels squared that each model grid coordinate represents.
   */
  constructor(scalingFactor: number) {
    this.scalingFactor = scalingFactor;

    this.worldCanvas = document.getElementById(
      "worldCanvas",
    ) as HTMLCanvasElement;
    if (!this.worldCanvas) {
      this.worldCanvas = document.createElement("canvas");
      this.worldCanvas.id = "worldCanvas";
      document.body.appendChild(this.worldCanvas);
    }

    this.context = this.worldCanvas.getContext("2d")!;
  }

  /**
   * Displays the world model on the canvas.
   * @param worldModel - The world model to display.
   */
  display(worldModel: WorldModel): void {
    this.worldCanvas.width = worldModel.width * this.scalingFactor;
    this.worldCanvas.height = worldModel.height * this.scalingFactor;

    this.context.clearRect(
      0,
      0,
      this.worldCanvas.width,
      this.worldCanvas.height,
    );

    this.context.fillStyle = "black";
    this.context.fillRect(
      0,
      0,
      this.worldCanvas.width,
      this.worldCanvas.height,
    );

    const actorsArray = Array.from(worldModel.actors);
    for (const actor of actorsArray) {
      if (actor instanceof Snake) {
        this.context.fillStyle = (actor as any).color || "green";
        actor.getCurrentParts.forEach((part) => {
          this.context.fillRect(
            part.x * this.scalingFactor,
            part.y * this.scalingFactor,
            this.scalingFactor,
            this.scalingFactor,
          );
        });
      } else if (actor instanceof Food) {
        this.context.fillStyle = "red";
        this.context.fillRect(
          actor.position.x * this.scalingFactor,
          actor.position.y * this.scalingFactor,
          this.scalingFactor,
          this.scalingFactor,
        );
      }
    }
  }

  dispose(): void {
    document.body.removeChild(this.worldCanvas);
  }

  public get canvasWidth(): number {
    return this.worldCanvas.width;
  }

  public get canvasHeight(): number {
    return this.worldCanvas.height;
  }

  public get canvasContext(): CanvasRenderingContext2D {
    return this.context;
  }

  public get canvas(): HTMLCanvasElement {
    return this.worldCanvas;
  }
}

export default CanvasWorldView;
