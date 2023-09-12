import { getPalabra } from "../models/word.js";
import * as ui from "../views/iu.js";

export class Game {
  constructor() {
    this.maxFaltas = 6;

    this.secreto = {
      longitud: {
        corta: {
          minAncho: 287,
          letras: 4, //5
        },
        larga: {
          minAncho: 294,
          letras: 4, //8
        },
      },
      palabra: [],
    };

    this.secretoCorto = this.secreto.longitud.corta;
    this.secretoLargo = this.secreto.longitud.larga;

    this.letrasErradas = [];

    this.keydownEventListener = this.keydownEventListener.bind(this);
  }

  get getTotalFiguras() {
    return this.letrasErradas.length;
  }

  sizeCanvas() {
    const mainGameDrawing = ui.mainGameDrawing;
    const ratio = ui.ratio;
    const ctx = ui.ctx;
    const width = mainGameDrawing.clientWidth;
    const height = mainGameDrawing.clientHeight;

    // Ajustar el tamaño del canvas en píxeles
    mainGameDrawing.width = width * ratio;
    mainGameDrawing.height = height * ratio;

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0a3871";

    // Ajustar el contexto para la alta resolución
    ctx.scale(ratio, ratio);

    // Volver a dibujar las figuras en el canvas después de redimensionarlo
    this.updateFiguras(this.getTotalFiguras);
  }

  updateFiguras(totalFiguras) {
    for (let figuraNumero = 0; figuraNumero <= totalFiguras; figuraNumero++) {
      ui.showFigura(figuraNumero);
    }
  }

  async newGame() {
    const canvasWidth = ui.mainGameDrawing.width;
    
    this.secreto.palabra = await getPalabra(this.obtenerLongitudPalabra(canvasWidth));
    this.letrasErradas.length = 0;
    this.sizeCanvas();
    ui.limpiaLetras();
    ui.showDashes(this.secreto.palabra);
    ui.showMensaje("inicial");
    ui.habilitarBotones(false, true);
    document.addEventListener("keydown", this.keydownEventListener);
  }

  obtenerLongitudPalabra(canvasWidth) {
    return canvasWidth >= this.secretoLargo.minAncho
      ? this.secretoLargo.letras
      : this.secretoCorto.letras;
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

    this.secreto.palabra.forEach((secreto, index) => {
      if (secreto === letra) {
        indices.push(index);
        this.secreto.palabra[index] = undefined;
      }
    });

    return indices;
  }

  checkStatusJuego() {
    const numFaltas = this.getTotalFiguras;
    const todasLetrasAcertadas = this.secreto.palabra.every(
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
