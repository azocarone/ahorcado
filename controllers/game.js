import { btnNewGame, btnDesist } from "../app.js";
import { getPalabra } from "../models/word.js";
import * as ui from "../views/ui.js";

export async function newGame(gameData) {
  gameData.letrasErradas.length = 0; // Vaciar el array en lugar de crear uno nuevo
  ui.inicializaPantalla(gameData.totalFiguras);
  habilitarBotones(false, true);
  gameData.palabraSecreta = await getPalabra();
  ui.showDashes(gameData.palabraSecreta);
  document.addEventListener("keydown", gameData.keydownEventListener);
}

export function desist(keydownEventListener) {
  document.removeEventListener("keydown", keydownEventListener);
  habilitarBotones(true, false);
  ui.showMensaje("desiste");
}

export function checkTecla(event, gameData) {
  const teclaPresionada = event.key.toUpperCase();

  if (event.code.includes("Key")) {
    checkLetra(teclaPresionada, gameData);
    checkStatus(gameData);
  } else {
    ui.showMensaje("advertencia");
  }
}

function checkLetra(letra, gameData) {
  const indices = [];

  gameData.palabraSecreta.forEach((secreto, index) => {
    if (secreto === letra) {
      indices.push(index);
      gameData.palabraSecreta[index] = undefined;
    }
  });

  if (indices.length > 0) {
    indices.forEach((index) => ui.showLetraCorrecta(index, letra));
  } else {
    gameData.letrasErradas.push(letra);
    ui.showFigura(gameData.totalFiguras);
    ui.showLetrasIncorrectas(gameData.letrasErradas);
  }
}

function checkStatus(gameData) {
  const numFaltas = gameData.totalFiguras;
  
  //console.log(numFaltas);
  
  const todasLetrasAcertadas = gameData.palabraSecreta.every(
    (valores) => valores === undefined
  );
  const maxFaltasAlcanzadas = numFaltas === gameData.maxFaltas;

  if (todasLetrasAcertadas || maxFaltasAlcanzadas) {
    document.removeEventListener("keydown", gameData.keydownEventListener);
    ui.showMensaje(maxFaltasAlcanzadas ? "condenado" : "absuelto");
    habilitarBotones(true, false);
  }
}

function habilitarBotones(newGameEnabled, desistEnabled) {
  btnNewGame.classList.toggle("main__keypad-btn--disabled", !newGameEnabled);
  btnDesist.classList.toggle("main__keypad-btn--disabled", !desistEnabled);
}
