import { resizeCanvas } from "./ui.js";
import { letrasErradas, newGame } from "./game.js";

export const btnNewGame = document.querySelector(".main__keypad-btn--new-game");
export const btnDesist = document.querySelector(".main__keypad-btn--desist");

// Dibuja en el canvas la figura de la horca.
window.addEventListener("load", resizeCanvas(0));

// Re-dibuja los elementos del canvas ya graficados 
window.addEventListener("resize", resizeCanvas(letrasErradas.length));

btnNewGame.addEventListener("click", newGame);
