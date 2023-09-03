import { resizeCanvas } from "./views/ui.js";
import * as game from "./controllers/game.js";

export const btnNewGame = document.querySelector(".main__keypad-btn--new-game");
export const btnDesist = document.querySelector(".main__keypad-btn--desist");

const gameData = {
  maxFaltas: 6,
  palabraSecreta: [],
  letrasErradas: [],
  keydownEventListener: (event) => {
    game.checkTecla(event, gameData);
  }
};

// Dibuja en el canvas la figura de la horca.
window.addEventListener("load", () => {
  resizeCanvas(gameData.letrasErradas.length);
});

// Re-dibuja los elementos del canvas ya graficados
window.addEventListener("resize", () => {
  resizeCanvas(gameData.letrasErradas.length);
});

btnNewGame.addEventListener("click", () => {
  game.newGame(gameData);
});

btnDesist.addEventListener("click", () => {
  game.desist(gameData);
});
