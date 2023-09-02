import { btnNewGame, btnDesist } from "./main.js";
import { getPalabra } from "./word.js";
import {
  showFigura,
  showDashes,
  showLetraCorrecta,
  showLetrasIncorrectas,
  initializeGame,
  showMensaje,
} from "./ui.js";

export let letrasErradas = [];
let palabraSecreta = [];
const maxFaltas = 6;

export async function newGame() {
  letrasErradas = [];
  initializeGame();
  btnNewGame.classList.toggle("main__keypad-btn--disabled");
  palabraSecreta = await getPalabra();
  showDashes(palabraSecreta);
  document.addEventListener("keydown", checkTecla);
  btnDesist.classList.toggle("main__keypad-btn--disabled");
  btnDesist.addEventListener("click", desist);
}

function desist() {
  document.removeEventListener("keydown", checkTecla);
  document.removeEventListener("click", desist);
  showMensaje("desiste");
  btnDesist.classList.toggle("main__keypad-btn--disabled");
  btnNewGame.classList.toggle("main__keypad-btn--disabled");
}

function checkTecla(evento) {
  const teclaPresionada = evento.key.toUpperCase();

  if (evento.code.includes("Key")) {
    checkLetra(teclaPresionada);
    checkStatus();
  } else {
    showMensaje("advertencia");
  }
}

function checkLetra(letra) {
  const indices = [];

  palabraSecreta.forEach((secreto, index) => {
    if (secreto === letra) {
      indices.push(index);
      palabraSecreta[index] = undefined;
    }
  });

  if (indices.length > 0) {
    indices.forEach((index) => showLetraCorrecta(index, letra));
  } else {
    letrasErradas.push(letra);
    showFigura(letrasErradas.length);
    showLetrasIncorrectas(letrasErradas);
  }
}

function checkStatus() {
  const numFaltas = letrasErradas.length;
  const todasLetrasAcertadas = palabraSecreta.every(
    (valores) => valores === undefined
  );
  const maxFaltasAlcanzadas = numFaltas === maxFaltas;

  if (todasLetrasAcertadas || maxFaltasAlcanzadas) {
    document.removeEventListener("keydown", checkTecla);
    showMensaje(maxFaltasAlcanzadas ? "condenado" : "absuelto");
    btnNewGame.classList.toggle("main__keypad-btn--disabled");
    btnDesist.classList.toggle("main__keypad-btn--disabled");
  }
}
