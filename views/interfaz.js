import { figuras } from "./figuras.js";

export const mainGameDrawing = document.querySelector(".main__game-drawing");
const mainGameWord = document.querySelector(".main__game-word");
const mainGameWrong = document.querySelector(".main__game-wrong");
const mainInfoText = document.querySelector(".main__info-text");
export const btnNewGame = document.querySelector(".main__keypad-btn--new-game");
export const btnDesist = document.querySelector(".main__keypad-btn--desist");

export const ctx = mainGameDrawing.getContext("2d");

export const ratio = window.devicePixelRatio || 1;

const mensaje = {
  inicial: "Solo letras mayúsculas y sin caracteres especiales.",
  desiste: "Desististe de jugar..",
  advertencia: "Te recuerdo, solo tienes que pulsar letras y sin caracteres especiales.",
  condenado: "Fin del juego.",
  absuelto: "Ganaste, felicidades.",
};

export function mostrarFigura(figura) {
  ctx.beginPath();
  figuras[figura](ctx);
  ctx.stroke();
}

export function mostrarGuiones(palabraSecreta) {
  palabraSecreta.forEach((_, indice) => {
    const elemento = document.createElement("li");

    elemento.id = `dash-${indice}`;
    elemento.className = "main__game-word-letter";
    elemento.textContent = "?";
    mainGameWord.appendChild(elemento);
  });
}

export function mostrarLetraCorrecta(index, letra) {
  const letraCorrecta = document.getElementById(`dash-${index}`);

  letraCorrecta.textContent = letra;
}

export function mostrarLetrasIncorrectas(letrasErradas) {
  const letrasErradasSinRepetir = [...new Set(letrasErradas)].join(", ");

  mainGameWrong.textContent = letrasErradasSinRepetir;
}

export function limpiarLetras() {
  mainGameWord.textContent = "";
  mainGameWrong.textContent = "";
}

export function mostrarMensaje(titulo) {
  mainInfoText.textContent = mensaje[titulo];
}

export function habilitarBotones(newGameEnabled, desistirEnabled) {
  btnNewGame.classList.toggle("main__keypad-btn--disabled", !newGameEnabled);
  btnDesist.classList.toggle("main__keypad-btn--disabled", !desistirEnabled);
}
