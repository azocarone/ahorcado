const centro = {
  x: 259,
  y: 236,
};

const horca = (ctx) => {
  const lineas = [
    [-259, 113, 35, 113],
    [-197, 113, -197, -221],
    [-197, -219, -20, -219],
    [-20, -221, -20, -195],
  ];

  lineas.forEach(([x1, y1, x2, y2]) => {
    dibujarLinea(ctx, x1, y1, x2, y2);
  });
};

const cabeza = (ctx) => {
  dibujarCirculo(ctx, -20, -166, 31);
};

const tronco = (ctx) => {
  dibujarLinea(ctx, -20, -135, -20, -20);
};

const brazoDerecho = (ctx) => {
  dibujarLinea(ctx, -20, -115, 11, -63);
};

const brazoIzquierdo = (ctx) => {
  dibujarLinea(ctx, -20, -115, -51, -63);
};

const piernaDerecha = (ctx) => {
  dibujarLinea(ctx, -20, -20, 11, 62);
};

const piernaIzquierda = (ctx) => {
  dibujarLinea(ctx, -20, -20, -51, 62);
};

const dibujarLinea = (ctx, x1, y1, x2, y2) => {
  ctx.moveTo(centro.x + x1, centro.y + y1);
  ctx.lineTo(centro.x + x2, centro.y + y2);
};

const dibujarCirculo = (ctx, x, y, radius) => {
  ctx.arc(centro.x + x, centro.y + y, radius, 0, Math.PI * 2);
};

export const figuras = [
  horca,
  cabeza,
  tronco,
  brazoDerecho,
  brazoIzquierdo,
  piernaDerecha,
  piernaIzquierda,
];
