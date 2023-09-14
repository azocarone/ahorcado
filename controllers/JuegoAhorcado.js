import { obtenerPalabra } from "../models/palabra.js";
import * as ui from "../views/interfaz.js";

export class JuegoAhorcado {
  constructor() {
    this.maxFaltas = 6;

    this.secreto = {
      corto: {
        letras: 5,
      },
      largo: {
        letras: 8,
      },
      palabra: [],
    };

    this.letrasErradas = [];

    this.keydownEventListener = this.keydownEventListener.bind(this);
  }

  get getTotalFiguras() {
    return this.letrasErradas.length;
  }

  async iniciar() {
    const canvasWidth = ui.mainGameDrawing.width;

    this.secreto.palabra = await obtenerPalabra(
      this.obtenerLongitudPalabra(canvasWidth)
    );
    this.letrasErradas.length = 0;
    this.configurarCanvas();
    ui.limpiarLetras();
    ui.mostrarGuiones(this.secreto.palabra);
    ui.mostrarMensaje("inicial");
    ui.habilitarBotones(false, true);
    document.addEventListener("keydown", this.keydownEventListener);
  }

  configurarCanvas() {
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
    this.desplegarFiguras(this.getTotalFiguras);
  }

  desplegarFiguras(totalFiguras) {
    for (let figuraNumero = 0; figuraNumero <= totalFiguras; figuraNumero++) {
      ui.mostrarFigura(figuraNumero);
    }
  }

  obtenerLongitudPalabra(canvasWidth) {
    return canvasWidth >= 294
      ? this.secreto.largo.letras
      : this.secreto.corto.letras;
  }

  desistir() {
    ui.mostrarMensaje("desiste");
    ui.habilitarBotones(true, false);
    document.removeEventListener("keydown", this.keydownEventListener);
  }

  keydownEventListener(evento) {
    this.validarTecla(evento);
  }

  validarTecla(evento) {
    const teclaPresionada = evento.key.toUpperCase();

    if (evento.code.includes("Key")) {
      this.procesarLetra(teclaPresionada);
      this.evaluarEstatusJuego();
    } else {
      ui.mostrarMensaje("advertencia");
    }
  }

  procesarLetra(letra) {
    const indices = this.generarIndicesLetrasAcertadas(letra);

    if (indices.length > 0) {
      indices.forEach((index) => ui.mostrarLetraCorrecta(index, letra));
    } else {
      this.letrasErradas.push(letra);
      ui.mostrarFigura(this.getTotalFiguras);
      ui.mostrarLetrasIncorrectas(this.letrasErradas);
    }
  }

  generarIndicesLetrasAcertadas(letra) {
    const indices = [];

    this.secreto.palabra.forEach((secreto, index) => {
      if (secreto === letra) {
        indices.push(index);
        this.secreto.palabra[index] = undefined;
      }
    });

    return indices;
  }

  evaluarEstatusJuego() {
    const numFaltas = this.getTotalFiguras;
    const todasLetrasAcertadas = this.secreto.palabra.every(
      (valores) => valores === undefined
    );
    const maxFaltasAlcanzadas = numFaltas === this.maxFaltas;

    if (todasLetrasAcertadas || maxFaltasAlcanzadas) {
      document.removeEventListener("keydown", this.keydownEventListener);
      ui.mostrarMensaje(maxFaltasAlcanzadas ? "condenado" : "absuelto");
      ui.habilitarBotones(true, false);
    }
  }
}
