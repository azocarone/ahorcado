import { figuras } from "./figures.js";
import { mensaje } from "./messages.js";

const mainGameDrawing = document.querySelector(".main__game-drawing");
const mainGameWord = document.querySelector(".main__game-word");
const mainGameWrong = document.querySelector(".main__game-wrong");
const mainInfoText = document.querySelector(".main__info-text");

const ctx = mainGameDrawing.getContext("2d");

const ratio = window.devicePixelRatio || 1;

export function resizeCanvas(totalFiguras) {
  const width = mainGameDrawing.clientWidth;
  const height = mainGameDrawing.clientHeight;

  // Ajustar el tamaño del canvas en píxeles y en CSS
  mainGameDrawing.width = width * ratio;
  mainGameDrawing.height = height * ratio;
  mainGameDrawing.style.width = width + "px";
  mainGameDrawing.style.height = height + "px";

  ctx.lineWidth = 5;

  // Ajustar el contexto para la alta resolución
  ctx.scale(ratio, ratio);

  // Volver a dibujar las figuras en el canvas después de redimensionarlo
  reShowFiguras(totalFiguras);
}

function reShowFiguras(totalFiguras) {
  for (let figuraNumero = 0; figuraNumero <= totalFiguras; figuraNumero++) {
    showFigura(figuraNumero);
  }
}

function showFigura(index) {
  ctx.beginPath();
  figuras[index](ctx);
  ctx.stroke();
}

export function showDashes(palabraSecreta) {
  palabraSecreta.forEach((_, indice) => {
    const elemento = document.createElement("li");
    elemento.id = `dash-${indice}`;
    elemento.className = "main__game-word-letter";
    elemento.textContent = "?";
    mainGameWord.appendChild(elemento);
  });
}

export function showLetraCorrecta(index, letra) {
  const letraCorrecta = document.getElementById(`dash-${index}`);

  letraCorrecta.textContent = letra;
}

export function showLetrasIncorrectas(letrasErradas) {
  const letrasErradasSinRepetir = [...new Set(letrasErradas)].join(", ");

  mainGameWrong.textContent = letrasErradasSinRepetir;
}

export function inicializarTextos() {
  mainGameWord.textContent = "";
  mainGameWrong.textContent = "";
  showMensaje("inicial");
}

export function showMensaje(titulo) {
  mainInfoText.textContent = mensaje[titulo];
}
