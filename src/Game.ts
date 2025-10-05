import MainMenuController from "./MainMenuController";
import GameController from "./GameController";

class Game {
  private contextSwitches: Map<string, string>;
  private controllers: Map<string, MainMenuController | GameController>;
  private currentContext: string;
  public onGameOver?: () => void;

  constructor() {
    this.contextSwitches = new Map();
    this.controllers = new Map();

    this.contextSwitches.set("START", "GAME");
    this.contextSwitches.set("GAME", "START");

    this.controllers.set("START", new MainMenuController(this));
    this.controllers.set("GAME", new GameController(this));

    this.currentContext = "START";
  }

  switchContext(data: any): void {
    this.currentContext = this.contextSwitches.get(this.currentContext)!;

    const controller = this.controllers.get(this.currentContext);
    if (controller) {
      controller.init(data);
    } else {
      console.error(`No controller found for context: ${this.currentContext}`);
    }
  }
}

export default Game;
