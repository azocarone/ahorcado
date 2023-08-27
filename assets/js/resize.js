let resizeTimeout;

/**
 * Maneja el evento de redimensionamiento del navegador y ejecuta la función de redimensionamiento después de un retraso.
 * @param {Function} resizeCanvas - La función de redimensionamiento del canvas.
 * @param {number} delay - El tiempo de retraso en milisegundos.
 */
export function handleResize(resizeCanvas, delay) {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(resizeCanvas, delay); // Ajusta el tiempo de espera según tus necesidades
}
