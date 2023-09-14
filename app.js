import { JuegoAhorcado } from "./controllers/JuegoAhorcado.js";
import { btnNewGame, btnDesist } from "./views/interfaz.js";

const juego = new JuegoAhorcado();

window.addEventListener("load", () => {
  juego.configurarCanvas();
});

window.addEventListener("resize", () => {
  juego.configurarCanvas();
});

btnNewGame.addEventListener("click", () => {
  juego.iniciar();
});

btnDesist.addEventListener("click", () => {
  juego.desistir();
});
