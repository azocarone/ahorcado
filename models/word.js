export const getPalabra = async (longitud) => {
  const palabra = longitud >= 5 ? await getAPI(longitud) : "LINUX";
  return Array.from(palabra);
};

/**
 * Lógica para emplear la API: "Palabra Pública al Azar".
 * https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=8
 * c: número de palabras a generar; l: longitud de la palabra.
 */
const getAPI = async (longitud) => {
  try {
    const response = await fetch(
      `https://clientes.api.greenborn.com.ar/public-random-word?c=1&l=${longitud}`
    );
    const data = await response.json();
    const palabra = data[0].toUpperCase();
    return palabra;
  } catch (err) {
    throw new Error(`Error al obtener la palabra: ${err}`);
  }
};
