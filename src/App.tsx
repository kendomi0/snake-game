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
  const [gameOver, setGameOver] = useState(false);
  const [game] = useState(() => new Game());

  useEffect(() => {
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
        setGameOver(false);
        initializeGame(config);
      };

      game.switchContext = startGameHandler;
      game.onGameOver = () => {
        setGameOver(true);
        setTimeout(() => {
          setGameStarted(false);
          setGameOver(false);
        }, 2000);
      };
    }
  }, [game, gameStarted]);

  return (
    <div className="App">
      {!gameStarted && (
        <>
          <div
            style={{
              position: "absolute",
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "green",
              fontSize: "48px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Snake Run
          </div>
          <div
            style={{
              position: "absolute",
              top: "160px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            (Currently single-player)
          </div>
          <div
            id="menu-container"
            style={{
              position: "absolute",
              top: "180px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
              flexDirection: "row",
              justifyContent: "center",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              fontSize: "18px",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "15px 30px",
              borderRadius: "8px",
            }}
          >
            Use your left and right arrow keys to play!
          </div>
        </>
      )}
      {gameStarted && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          You are the{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>BLUE</span> snake.
          Use your left arrow key to turn counterclockwise, right arrow key to
          turn clockwise.
        </div>
      )}
      {gameOver && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "64px",
            fontWeight: "bold",
            color: "red",
            zIndex: 1000,
          }}
        >
          GAME OVER!
        </div>
      )}
    </div>
  );
}
