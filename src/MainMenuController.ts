import Game from "./Game";

class MainMenuController {
  private game: Game;
  private playGameButton: HTMLButtonElement;
  private humanPlayersInput: HTMLInputElement;
  private aiPlayersInput: HTMLInputElement;

  constructor(game: Game) {
    this.game = game;

    this.playGameButton = document.createElement("button");
    this.humanPlayersInput = document.createElement("input");
    this.aiPlayersInput = document.createElement("input");

    this.humanPlayersInput.placeholder = "Enter number of human players";
    this.aiPlayersInput.placeholder = "Enter number of computer players";

    const buttonText = document.createTextNode("Start Game!");
    this.playGameButton.appendChild(buttonText);

    this.playGameButton.addEventListener("click", () => this.switchContext());
  }

  init(data: any): void {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;

    menuContainer.appendChild(this.humanPlayersInput);
    menuContainer.appendChild(this.aiPlayersInput);
    menuContainer.appendChild(this.playGameButton);
  }

  private switchContext(): void {
    const menuContainer = document.getElementById("menu-container");
    if (!menuContainer) return;

    menuContainer.removeChild(this.humanPlayersInput);
    menuContainer.removeChild(this.aiPlayersInput);
    menuContainer.removeChild(this.playGameButton);

    const gameConfig = {
      numOfHumanPlayers: parseInt(this.humanPlayersInput.value),
      numOfAIPlayers: parseInt(this.aiPlayersInput.value),
    };

    this.game.switchContext(gameConfig);
  }
}

export default MainMenuController;
