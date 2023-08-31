const mainGameWrong = document.querySelector(".main__game-wrong");
const mainInfoText = document.querySelector(".main__info-text");
const maxFaltas = 6;

const avisos = {
  advertencia: "Te recuerdo, solo debes pulsar letras ...",
  condenado: "Fin del juego",
  absuelto: "Ganaste, felicidades",
};

//let palabraSecreta = []; // Ya está declarada en el módulo ./word.js
let letrasErradas = [];

document.addEventListener("keydown", checkTecla);

function checkTecla(evento) {
  const teclaPresionada = evento.key.toUpperCase();

  if (evento.code.includes("Key")) {
    checkLetra(teclaPresionada);
    checkStatus();
  } else {
    showMensaje("advertencia");
  }
}

function checkLetra(letra) {
  const indices = [];

  palabraSecreta.forEach((secreto, index) => {
    if (secreto === letra) {
      indices.push(index);
      palabraSecreta[index] = undefined;
    }
  });

  if (indices.length > 0) {
    indices.forEach((index) => showLetraCorrecta(index, letra));
  } else {
    letrasErradas.push(letra);
    showLetrasIncorrectas();
  }
}

function showLetraCorrecta(index, letra) {
  const letraCorrecta = document.getElementById(`dash-${index}`);
  letraCorrecta.textContent = letra;
}

function showLetrasIncorrectas() {
  const letrasErradasSinRepetir = [...new Set(letrasErradas)].join(", ");
  mainGameWrong.textContent = letrasErradasSinRepetir;
}

function checkStatus() {
  const numFaltas = letrasErradas.length;
  const todasLetrasAcertadas = palabraSecreta.every(
    (valores) => valores === undefined
  );
  const maxFaltasAlcanzadas = numFaltas === maxFaltas;

  if (todasLetrasAcertadas || maxFaltasAlcanzadas) {
    document.removeEventListener("keydown", checkTecla);
    showMensaje(maxFaltasAlcanzadas ? "condenado" : "absuelto");
  }
}

function showMensaje(titulo) {
  mainInfoText.textContent = avisos[titulo];
}
