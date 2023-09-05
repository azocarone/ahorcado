const centerX = 259;
const centerY = 244;

/**
 * Matriz de funciones que definen las partes de la figuras.
 */
export const figuras = [
  // Horca
  (ctx) => {
    ctx.moveTo(centerX - 259, centerY + 113);
    ctx.lineTo(centerX + 35, centerY + 113);
    ctx.moveTo(centerX - 177, centerY + 113);
    ctx.lineTo(centerX - 177, centerY - 241);
    ctx.lineTo(centerX, centerY - 241);
    ctx.lineTo(centerX, centerY - 194);
  },

  // Cabeza
  (ctx) => {
    ctx.arc(centerX, centerY - 166, 31, 0, Math.PI * 2);
  },

  // Tronco
  (ctx) => {
    ctx.moveTo(centerX, centerY - 135);
    ctx.lineTo(centerX, centerY);
  },

  // Brazo derecho
  (ctx) => {
    ctx.moveTo(centerX, centerY - 115);
    ctx.lineTo(centerX + 31, centerY - 63);
  },

  // Brazo izquierdo
  (ctx) => {
    ctx.moveTo(centerX, centerY - 115);
    ctx.lineTo(centerX - 31, centerY - 63);
  },

  // Pierna derecha
  (ctx) => {
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + 31, centerY + 72);
  },

  // Pierna izquierda
  (ctx) => {
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - 31, centerY + 72);
  },
];
