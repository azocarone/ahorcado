// Importación de módulos
import { resizeCanvas } from "./views/ui.js";
import * as game from "./controllers/game.js";

// Declaración de constantes
export const btnNewGame = document.querySelector(".main__keypad-btn--new-game");
export const btnDesist = document.querySelector(".main__keypad-btn--desist");

// Declaración de la clase GameData
class GameData {
  constructor() {
    this.maxFaltas = 6;
    this.palabraSecreta = [];
    this._letrasErradas = [];
    this.keydownEventListener = this.keydownEventListener.bind(this);
  }

  get letrasErradas() {
    return this._letrasErradas;
  }

  get totalFiguras() {
    return this._letrasErradas.length;
  }

  keydownEventListener(event) {
    game.checkTecla(event, this);
  }
}

// Creación de una instancia de la clase GameData
const gameData = new GameData();

// Event Listeners
window.addEventListener("load", () => {
  resizeCanvas(gameData.totalFiguras);
});

window.addEventListener("resize", () => {
  resizeCanvas(gameData.totalFiguras);
});

btnNewGame.addEventListener("click", () => {
  game.newGame(gameData);
});

btnDesist.addEventListener("click", () => {
  game.desist(gameData.keydownEventListener);
});
