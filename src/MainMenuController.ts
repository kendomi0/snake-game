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
    document.body.appendChild(this.humanPlayersInput);
    document.body.appendChild(this.aiPlayersInput);
    document.body.appendChild(this.playGameButton);
  }

  private switchContext(): void {
    document.body.removeChild(this.humanPlayersInput);
    document.body.removeChild(this.aiPlayersInput);
    document.body.removeChild(this.playGameButton);

    const gameConfig = {
      numOfHumanPlayers: parseInt(this.humanPlayersInput.value),
      numOfAIPlayers: parseInt(this.aiPlayersInput.value),
    };

    this.game.switchContext(gameConfig);
  }
}

export default MainMenuController;
