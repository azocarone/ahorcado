import { handleResize } from "./resize.js";
import { figuras } from "./figures.js";

// Obtener el elemento canvas y su contexto 2D
const canvas = document.querySelector(".main__game-drawing");
const ctx = canvas.getContext("2d");

// Calcular la relación de resolución del dispositivo
const ratio = window.devicePixelRatio || 1;

/**
 * Redimensiona el canvas y ajusta su contexto 2D en función del tamaño actual del navegador.
 */
function resizeCanvas() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // Ajustar el tamaño del canvas en píxeles y en CSS
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  
  // Ajustar el contexto para la alta resolución
  ctx.lineWidth = 5;
  ctx.scale(ratio, ratio);

  // Volver a dibujar las figuras en el canvas después de redimensionarlo
  mostrarFigura();
}

/**
 * Dibuja todas las figuras en el canvas utilizando el contexto 2D.
 */
function mostrarFigura() {
  for (let i = 0; i < figuras.length; i++) {
    dibujarFigura(i);
  }
}

/**
 * Dibuja una figura en el canvas utilizando el contexto 2D.
 * @param {number} index - El índice de la figura en el arreglo de figuras.
 */
function dibujarFigura(index) {
  ctx.beginPath();
  figuras[index](ctx);
  ctx.stroke();
}

// Agregar un evento de redimensionamiento que llama a handleResize con una función y un retraso
window.addEventListener("resize", () => handleResize(resizeCanvas, 200));

// Redimensionar el canvas al cargar la página
resizeCanvas();
