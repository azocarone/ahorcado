const center = {
  x: 259,
  y: 244,
};

const horca = (ctx) => {
  const lines = [
    [-259, 113, 35, 113],
    [-177, 113, -177, -241],
    [-177, -241, 0, -241],
    [0, -241, 0, -194],
  ];

  lines.forEach(([x1, y1, x2, y2]) => {
    drawLine(ctx, x1, y1, x2, y2);
  });
};

const cabeza = (ctx) => {
  drawCircle(ctx, 0, -166, 31);
};

const tronco = (ctx) => {
  drawLine(ctx, 0, -135, 0, 0);
};

const brazoDerecho = (ctx) => {
  drawLine(ctx, 0, -115, 31, -63);
};

const brazoIzquierdo = (ctx) => {
  drawLine(ctx, 0, -115, -31, -63);
};

const piernaDerecha = (ctx) => {
  drawLine(ctx, 0, 0, 31, 72);
};

const piernaIzquierda = (ctx) => {
  drawLine(ctx, 0, 0, -31, 72);
};

const drawLine = (ctx, x1, y1, x2, y2) => {
  ctx.moveTo(center.x + x1, center.y + y1);
  ctx.lineTo(center.x + x2, center.y + y2);
};

const drawCircle = (ctx, x, y, radius) => {
  ctx.arc(center.x + x, center.y + y, radius, 0, Math.PI * 2);
};

export const getFigura = [
  horca,
  cabeza,
  tronco,
  brazoDerecho,
  brazoIzquierdo,
  piernaDerecha,
  piernaIzquierda,
];
