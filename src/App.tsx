import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./Game";
import GameController from "./GameController";
import MainMenuController from "./MainMenuController";
import ActorCollisionHandlers from "./ActorCollisionHandlers";
import SnakeCollisionFoodHandler from "./SnakeCollisionFoodHandler";
import SnakeSnakeCollisionHandler from "./SnakeSnakeCollisionHandler";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [game] = useState(() => new Game());

  useEffect(() => {
    if (!gameStarted) {
      const menuContainer = document.getElementById("menu-container");
      if (menuContainer) {
        menuContainer.innerHTML = ""; 
      }

      const mainMenuController = new MainMenuController(game);
      mainMenuController.init({});

      const startGameHandler = (config: {
        numOfHumanPlayers: number;
        numOfAIPlayers: number;
      }) => {
        setGameStarted(true);
        initializeGame(config);
      };

      game.switchContext = startGameHandler;
    }
  }, [game, gameStarted]);

  const initializeGame = (config: {
    numOfHumanPlayers: number;
    numOfAIPlayers: number;
  }) => {
    const gameController = new GameController(game);

    const collisionHandlers = new ActorCollisionHandlers();
    collisionHandlers.addCollisionAction(
      "snake",
      "food",
      new SnakeCollisionFoodHandler(),
    );
    collisionHandlers.addCollisionAction(
      "snake",
      "snake",
      new SnakeSnakeCollisionHandler(),
    );

    gameController.init(config);
  };

  return (
    <div className="App">
      {!gameStarted && (
        <>
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'green',
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          Snake Run
        </div>
          <div id="menu-container"></div>
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '18px',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '15px 30px',
            borderRadius: '8px'
          }}>
          Use your left and right arrow keys to play!
          </div>
        </>
      )}
      {gameStarted && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '8px 16px',
          borderRadius: '4px'
        }}>
          Use your left arrow key to turn counterclockwise, right arrow key to turn clockwise
        </div>
      )}
    </div>
  );
}
