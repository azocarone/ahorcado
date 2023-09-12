import { Game } from "./controllers/Game.js";
import { btnNewGame, btnDesistir } from "./views/iu.js";

const game = new Game();

window.addEventListener("load", () => {
  game.sizeCanvas();
});

window.addEventListener("resize", () => {
  game.sizeCanvas();
});

btnNewGame.addEventListener("click", () => {
  game.newGame();
});

btnDesistir.addEventListener("click", () => {
  game.desistir();
});
