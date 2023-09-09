import { Game } from "./controllers/Game.js";
import { btnNewGame, btnDesistir } from "./views/gameIU.js";

const game = new Game();

window.addEventListener("load", () => {
  game.resizeCanvas();
});

window.addEventListener("resize", () => {
  game.resizeCanvas();
});

btnNewGame.addEventListener("click", () => {
  game.newGame();
});

btnDesistir.addEventListener("click", () => {
  game.desistir();
});
