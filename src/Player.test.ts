import Player from "../src/Player";
import SnakeController from "../src/SnakeController";

class MockPlayer extends Player {
  makeTurn(): void {
    console.log("Mock makeTurn called");
  }
}

describe("Player", () => {
  let sc: SnakeController;
  let player: Player;

  beforeEach(() => {
    sc = {} as unknown as SnakeController;
    player = new MockPlayer(sc);
  });

  it("should create a new player with a snake controller", () => {
    expect(player).toBeDefined();
    expect(player.sc).toBe(sc);
  });

  it("should call makeTurn method", () => {
    const spy = jest.spyOn(MockPlayer.prototype, "makeTurn");
    player.makeTurn();
    expect(spy).toHaveBeenCalled();
  });
});
