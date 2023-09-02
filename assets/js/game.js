import { btnNewGame } from "./main.js";
import { getPalabra } from "./word.js";
import {
  showDashes,
  showLetraCorrecta,
  showLetrasIncorrectas,
  inicializarTextos,
  showMensaje
} from "./ui.js";

export let letrasErradas = [];
let palabraSecreta = [];
const maxFaltas = 6;

export async function newGame() {
  letrasErradas = [];
  inicializarTextos();
  btnNewGame.classList.toggle("main__keypad-btn--disabled");
  palabraSecreta = await getPalabra();
  showDashes(palabraSecreta);
  document.addEventListener("keydown", checkTecla);
};

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
  }
}
