const centro = {
  x: 259,
  y: 244,
};

const horca = (ctx) => {
  const lineas = [
    [-259, 113, 35, 113],
    [-177, 113, -177, -241],
    [-177, -241, 0, -241],
    [0, -241, 0, -194],
  ];

  lineas.forEach(([x1, y1, x2, y2]) => {
    dibujarLinea(ctx, x1, y1, x2, y2);
  });
};

const cabeza = (ctx) => {
  dibujarCirculo(ctx, 0, -166, 31);
};

const tronco = (ctx) => {
  dibujarLinea(ctx, 0, -135, 0, 0);
};

const brazoDerecho = (ctx) => {
  dibujarLinea(ctx, 0, -115, 31, -63);
};

const brazoIzquierdo = (ctx) => {
  dibujarLinea(ctx, 0, -115, -31, -63);
};

const piernaDerecha = (ctx) => {
  dibujarLinea(ctx, 0, 0, 31, 72);
};

const piernaIzquierda = (ctx) => {
  dibujarLinea(ctx, 0, 0, -31, 72);
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
