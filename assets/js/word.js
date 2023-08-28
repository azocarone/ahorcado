// Obtener referencia al elemento HTML donde se mostrarán las letras a adivinar
const mainGameWord = document.querySelector(".main__game-word");

// Array para almacenar la palabra secreta
let palabraSecreta = [];

// Función para crear los guiones de cada letra de la palabra
async function createDashes(indice) {
  const elemento = document.createElement("li");

  elemento.id = `dash-${indice}`;
  elemento.className = "main__game-word-letter";
  elemento.textContent = "?";
  mainGameWord.appendChild(elemento);
}

// Función para ocultar la palabra secreta
async function ocultarPalabra(longitud) {
  const palabra = 'BECAS'; // Para no bloquear la API, durante las pruebas

  // Obtener la palabra secreta de la API
  //const palabra = await getPalabra(longitud);

  // Dividir la palabra en letras y almacenarlas en el array palabraSecreta
  palabraSecreta = palabra.split("");

  // Crear un guion por cada letra de la palabra
  palabraSecreta.forEach((_, indice) => createDashes(indice));
}

/**
 * Lógica para obtener la palabra secreta,
 * empleando la API: Palabra Pública al Azar".
 *
 * https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=8
 *
 * c: número de palabras a generar; l: longitud de la palabra.
 */
async function getPalabra(longitud) {
  try {
    const response = await fetch(
      `https://clientes.api.greenborn.com.ar/public-random-word?l=${longitud}`
    );
    const data = await response.json();
    const palabra = data[0].toUpperCase();
    return palabra;
  } catch (err) {
    throw new Error(`Error al obtener la palabra: ${err}`);
  }
}

// Función para iniciar el juego
function initGame() {
  // Llamar a la función para ocultar la palabra
  ocultarPalabra(5);
}

// Llamada para iniciar el juego al cargar la página
initGame();
