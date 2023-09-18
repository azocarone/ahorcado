import { figuras } from "./figuras.js";

export const mainGameDrawing = document.querySelector(".main__game-drawing");
const mainGameWord = document.querySelector(".main__game-word");
const mainGameWrong = document.querySelector(".main__game-wrong");
const mainNoticeText = document.querySelector(".main__notice-text");
export const btnNewGame = document.querySelector(".main__keypad-btn--new-game");
export const btnDesist = document.querySelector(".main__keypad-btn--desist");

export const ctx = mainGameDrawing.getContext("2d");

export const ratio = window.devicePixelRatio || 1;

const notificaciones = {
  colores: {
    inicial: '#495057', // Gris Pizarra
    desiste: '#0077CC', // Azul Cerúleo
    advertencia: '#FF6600', // Naranja Rojizo
    condenado: '#CC0000', // Rojo Rubí
    absuelto: '#009933', // Verde Esmeralda
  },

  mensajes: {
    inicial: 'Solo letras mayúsculas y sin caracteres especiales.',
    desiste: 'Desististe de jugar.',
    advertencia: 'Te recuerdo, solo tienes que pulsar letras y sin caracteres especiales.',
    condenado: 'Fin del juego.',
    absuelto: 'Ganaste, felicidades.'
  },

  getColorMensaje(titulo) {
    const color = this.colores[titulo];
    const mensaje = this.mensajes[titulo];
    return { color, mensaje };
  },
};

export const mostrarFigura = (figura) => {
  ctx.beginPath();
  figuras[figura](ctx);
  ctx.stroke();
};

export const mostrarGuiones = (palabraSecreta) => {
  palabraSecreta.forEach((_, indice) => {
    const elemento = document.createElement("li");

    elemento.id = `dash-${indice}`;
    elemento.className = "main__game-word-letter";
    elemento.textContent = "?";
    mainGameWord.appendChild(elemento);
  });
};

export const mostrarLetraCorrecta = (index, letra) => {
  const letraCorrecta = document.getElementById(`dash-${index}`);

  letraCorrecta.textContent = letra;
};

export const mostrarLetrasIncorrectas = (letrasErradas) => {
  const letrasErradasSinRepetir = [...new Set(letrasErradas)].join(", ");

  mainGameWrong.textContent = letrasErradasSinRepetir;
};

export const limpiarLetras = () => {
  mainGameWord.textContent = "";
  mainGameWrong.textContent = "";
};

export const mostrarNotificacion = (titulo) => {
  const colorMensaje = notificaciones.getColorMensaje(titulo);
  mainNoticeText.style.setProperty('--color-notice', colorMensaje.color);
  mainNoticeText.textContent = colorMensaje.mensaje;
};

export const habilitarBotones = (newGameEnabled, desistirEnabled) => {
  btnNewGame.classList.toggle("main__keypad-btn--disabled", !newGameEnabled);
  btnDesist.classList.toggle("main__keypad-btn--disabled", !desistirEnabled);
};
