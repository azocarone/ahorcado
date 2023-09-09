import { getPalabra } from "../models/gameWord.js";
import * as ui from "../views/gameIU.js";

export class Game {
  constructor() {
    this.maxFaltas = 6;
    this.palabraSecreta = [];
    this.letrasErradas = [];
    this.keydownEventListener = this.keydownEventListener.bind(this);
  }

  get getTotalFiguras() {
    return this.letrasErradas.length;
  }

  resizeCanvas() {
    const mainGameDrawing = ui.mainGameDrawing;
    const ratio = ui.ratio;
    const ctx = ui.ctx;
    const width = mainGameDrawing.clientWidth;
    const height = mainGameDrawing.clientHeight;

    // Ajustar el tamaño del canvas en píxeles y en CSS
    mainGameDrawing.width = width * ratio;
    mainGameDrawing.height = height * ratio;
    mainGameDrawing.style.width = width + "px";
    mainGameDrawing.style.height = height + "px";

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0a3871";

    // Ajustar el contexto para la alta resolución
    ctx.scale(ratio, ratio);

    // Volver a dibujar las figuras en el canvas después de redimensionarlo
    this.reShowFiguras(this.getTotalFiguras);
  }

  reShowFiguras(totalFiguras) {
    for (let figuraNumero = 0; figuraNumero <= totalFiguras; figuraNumero++) {
      ui.showFigura(figuraNumero);
    }
  }

  async newGame() {
    this.palabraSecreta = await getPalabra();
    this.letrasErradas.length = 0;
    this.resizeCanvas();
    ui.limpiaLetras();
    ui.showDashes(this.palabraSecreta);
    ui.showMensaje("inicial");
    ui.habilitarBotones(false, true);
    document.addEventListener("keydown", this.keydownEventListener);
  }

  desistir() {
    ui.showMensaje("desiste");
    ui.habilitarBotones(true, false);
    document.removeEventListener("keydown", this.keydownEventListener);
  }

  keydownEventListener(event) {
    this.checkTecla(event);
  }

  checkTecla(event) {
    const teclaPresionada = event.key.toUpperCase();

    if (event.code.includes("Key")) {
      this.evaluarLetra(teclaPresionada);
      this.checkStatusJuego();
    } else {
      ui.showMensaje("advertencia");
    }
  }

  evaluarLetra(letra) {
    const indices = this.buscarLetra(letra);

    if (indices.length > 0) {
      indices.forEach((index) => ui.showLetraCorrecta(index, letra));
    } else {
      this.letrasErradas.push(letra);
      ui.showFigura(this.getTotalFiguras);
      ui.showLetrasIncorrectas(this.letrasErradas);
    }
  }

  // Generando indices de letras encontradas.
  buscarLetra(letra) {
    const indices = [];

    this.palabraSecreta.forEach((secreto, index) => {
      if (secreto === letra) {
        indices.push(index);
        this.palabraSecreta[index] = undefined;
      }
    });

    return indices;
  }

  checkStatusJuego() {
    const numFaltas = this.getTotalFiguras;
    const todasLetrasAcertadas = this.palabraSecreta.every(
      (valores) => valores === undefined
    );
    const maxFaltasAlcanzadas = numFaltas === this.maxFaltas;

    if (todasLetrasAcertadas || maxFaltasAlcanzadas) {
      document.removeEventListener("keydown", this.keydownEventListener);
      ui.showMensaje(maxFaltasAlcanzadas ? "condenado" : "absuelto");
      ui.habilitarBotones(true, false);
    }
  }
}
