import WorldLoader from "./WorldLoader";
import WorldModel from "./WorldModel";
import Food from "./Food";
import ActorCollisionHandlers from "./ActorCollisionHandlers";

jest.mock("./WorldModel");
jest.mock("./Food");
jest.mock("./ActorCollisionHandlers");

describe("WorldLoader", () => {
  let worldLoader: WorldLoader;
  let mockWorld: jest.Mocked<WorldModel>;
  let mockActorCollisionHandlers: jest.Mocked<ActorCollisionHandlers>;

  beforeEach(() => {
    worldLoader = new WorldLoader();
    mockActorCollisionHandlers =
      new ActorCollisionHandlers() as jest.Mocked<ActorCollisionHandlers>;
    mockWorld = new WorldModel(
      10,
      10,
      mockActorCollisionHandlers,
    ) as jest.Mocked<WorldModel>;
    (Food as jest.Mock).mockClear();
  });

  test("should create no food when given an empty world", () => {
    const emptyWorld: string[] = [];
    worldLoader.readData(emptyWorld, mockWorld);
    expect(mockWorld.addActor).not.toHaveBeenCalled();
  });

  test("should create food at correct positions", () => {
    const world = [" f ", "f f", " f "];
    worldLoader.readData(world, mockWorld);
    expect(Food).toHaveBeenCalledTimes(4);
    expect(Food).toHaveBeenCalledWith(1, 0);
    expect(Food).toHaveBeenCalledWith(0, 1);
    expect(Food).toHaveBeenCalledWith(2, 1);
    expect(Food).toHaveBeenCalledWith(1, 2);
    expect(mockWorld.addActor).toHaveBeenCalledTimes(4);
  });

  test("should handle world with no food", () => {
    const noFoodWorld = ["   ", "   ", "   "];
    worldLoader.readData(noFoodWorld, mockWorld);
    expect(Food).not.toHaveBeenCalled();
    expect(mockWorld.addActor).not.toHaveBeenCalled();
  });

  test("should handle world with all food", () => {
    const allFoodWorld = ["fff", "fff", "fff"];
    worldLoader.readData(allFoodWorld, mockWorld);
    expect(Food).toHaveBeenCalledTimes(9);
    expect(mockWorld.addActor).toHaveBeenCalledTimes(9);
  });

  test("should handle world with varying row lengths", () => {
    const irregularWorld = ["f", "ff ", " f  "];
    worldLoader.readData(irregularWorld, mockWorld);
    expect(Food).toHaveBeenCalledTimes(4);
    expect(Food).toHaveBeenCalledWith(0, 0);
    expect(Food).toHaveBeenCalledWith(0, 1);
    expect(Food).toHaveBeenCalledWith(1, 1);
    expect(Food).toHaveBeenCalledWith(1, 2);
    expect(mockWorld.addActor).toHaveBeenCalledTimes(4);
  });
});
