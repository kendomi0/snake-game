import WorldModel from "./WorldModel";

/** Interface representing a view of the world model. */
interface IWorldView {
  /**
   * Displays the world model.
   * @param worldModel - The world model to display.
   */
  display(worldModel: WorldModel): void;

  /**
   * Disposes of resources or performs cleanup tasks.
   */
  dispose(): void;
}

export default IWorldView;
