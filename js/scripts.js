const estado = document.getElementById('estado');
const faltas = document.getElementById('faltas');
const btnIniciar = document.getElementById('btn-iniciar');
const btnRecargar = document.getElementById('btn-recargar');

//

estado.width = 588;
estado.height = 360;

faltas.width = 264;
faltas.height = 36;

//

const ctxEstado = estado.getContext('2d');
const ctxFaltas = faltas.getContext('2d');

//

ctxEstado.lineWidth = 5;
ctxEstado.font = '30px Inter';
ctxEstado.textAlign = 'left';

ctxFaltas.font = '24px Inter';
ctxFaltas.textAlign = 'center';

//

const dibujo = {
    horca: () => {
        ctxEstado.moveTo(0, 357);
        ctxEstado.lineTo(294, 357);
        ctxEstado.moveTo(82, 357);
        ctxEstado.lineTo(82, 3);
        ctxEstado.lineTo(259, 3);
        ctxEstado.lineTo(259, 50);
    },
    cabeza: () => {
        ctxEstado.arc(259, 78, 31, 0, Math.PI * 2);
    },
    tronco: () => {
        ctxEstado.moveTo(259, 109);
        ctxEstado.lineTo(259, 244);
    },
    brazoDerecho: () => {
        ctxEstado.moveTo(259, 129);
        ctxEstado.lineTo(290, 181);
    },
    brazoIzquierdo: () => {
        ctxEstado.moveTo(259, 129);
        ctxEstado.lineTo(228, 181);
    },
    piernaDerecha: () => {
        ctxEstado.moveTo(259, 244);
        ctxEstado.lineTo(290, 316);
    },
    piernaIzquierda: () => {
        ctxEstado.moveTo(259, 244);
        ctxEstado.lineTo(228, 316);
    }
}

const aviso = {
    ahocardo: {
        frase: 'Fɨn đɇł Ɉᵾɇǥø!',
        color: 'red'
    },
    salvado: {
        frase: 'Gₐₙₐₛₜₑ, fₑₗᵢcᵢdₐdₑₛ!',
        color: 'green'
    }
}

//

let aSecretos = [];
let aErrores = [];

//

btnIniciar.addEventListener('click', iniciar);

//

function iniciar() {
    btnIniciar.style.display = 'none';
    btnRecargar.style.display = 'inline-block';
    estado.style.display = 'inline-block';
    faltas.style.display = 'inline-block';
    showHorca(0);
    createGuiones(aSecretos);
    btnRecargar.addEventListener('click', () => {
        location.reload();
    })
    document.addEventListener('keydown', checkTecla);
}

//

async function createGuiones(aSecretos) {

    /*
        * Mostrar guiones para la palabra secreta: 

        - Dinuja las lineas que serán los guiones para la palabra secreta;
        - Conecta con la función "Crear palabra secreta".
    */

    let index = 0;

    for (const letra of 'PRIVILEGIO') { // ? Para no bloqueaar la API
        // for (const letra of await getPalabra()) { // ! Validar caracteres especiales.
        aSecretos.push(letra);
        const elem = document.createElement('canvas');
        elem.id = `guion-${index++}`;
        elem.className = 'guion';
        elem.width = '80';
        elem.height = '92';
        document.querySelector('.box-guiones').appendChild(elem);
        elem.style.display = 'inline-block';
    };
}

//

async function getPalabra() {

    /*  
        * Crear palabra secreta
        
        Desarrolla la lógica para escoger una palabra secreta de forma aleatoria, empleando
        la API "Palabra Pública al Azar":
        
        https://clientes.api.greenborn.com.ar/public-random-word?c=9&l=8
     
        c: número de palabras a generar; l: longitud de la palabra.
     */

    const c = Math.floor(Math.random() * 12);

    try {
        const response = await fetch(`https://clientes.api.greenborn.com.ar/public-random-word?l=${c}`);
        const data = await response.json();
        const palabra = data[0].toUpperCase();
        return palabra;
    } catch (err) {
        console.error(err);
    }
}

//

function checkTecla(event) {

    /*  
        * Verificar si la tecla presionada es una letra:

        - Verifica si una tecla fue presionada;
        - Desarrolla la lógica para verificar si la tecla presionada es una letra y no un número.
    */

    const codeValor = event.code;
    let keyValor = event.key;
    keyValor = keyValor.toUpperCase();
    codeValor.includes('Key') ? checkLetra(aSecretos, aErrores, keyValor) : alert('Pulsa una letra!');
}

//

function checkLetra(aSecretos, aErrores, letra) {

    /*  
        * Verificar si la letra presionada está dentro de la palabra secreta:

        - En el caso de estar la letra en la palabra secreta, llamar a la función: dibujar letra correcta;
        - Por el contrio, al no ser la letra parte de la palabra secreta, se de invocar
          la función: dibujar letra incorrecta.
    */

    let index = aSecretos.indexOf(letra);

    if (index != -1) {
        do {
            showLetraCorrecta(aSecretos, index);
            delete aSecretos[index];
            index = aSecretos.indexOf(letra, index + 1);
        } while (index != -1);
    } else {
        aErrores.push(letra);
        showLetraIncorrecta(aErrores);
    }

    checkStatus(aSecretos, aErrores);
}

//

function showLetraCorrecta(aSecretos, index) {

    /*  
        * Dibujar Letra Correcta
    */

    const letraCorrecta = document.getElementById(`guion-${index}`);
    const ctxletraCorrecta = letraCorrecta.getContext('2d');

    ctxletraCorrecta.width = 80;
    ctxletraCorrecta.height = 92;
    ctxletraCorrecta.font = '48px Inter';
    ctxletraCorrecta.textAlign = 'center';
    ctxletraCorrecta.fillText(aSecretos[index], 40, 65);
}

//

function showLetraIncorrecta(aErrores) {

    /*  
        * Dibujar Letra Incorrecta:
        
        - Debe aparecer en un lugar diferente de la pantalla, pero visible al usuario;
        - Las letras equivocadas no pueden visualizarse de forma repetida.
    */

    const sinRepetir = new Set(aErrores);
    let lista = [...sinRepetir].join('  ');

    ctxFaltas.clearRect(0, 0, faltas.width, faltas.height);
    ctxFaltas.fillText(lista, 132, 24);
}

//

function checkStatus(aSecretos, aErrores) {

    /*
        * Verificar Fin del Juego / Ganador:

        - Lógica para verificar, si el usuario se equivocó la cantidad de veces para crear el ahorcado completo;.
        - Caso contrario, verifica si el usuario acertó la cantidad de letras necesarias 
          para completar la palabra secreta.
    */

    const numFaltas = showHorca(aErrores.length);

    if (numFaltas == 6) {
        showMensaje(0);
    } else if (aSecretos.every((valores) => valores == 'undefined')) {
        showMensaje(1);
    }
}

//

function showHorca(index) {

    /*  
        * Dibujar Horca:

        - Horca;
        - Cabeza;
        - Tronco;
        - Brazo derecho;
        - Brazo izquierdo;
        - Pierna derecha;
        - Pierna izquierda.
    */

    ctxEstado.beginPath();
    Object.values(dibujo)[index]();
    ctxEstado.stroke();
    ctxEstado.closePath();
    return index;
}

//

function showMensaje(index) {

    /*  
        Dibujar mensaje "Fin del juego" / "Ganaste, felicidades":
        
        - Desarrolla la lógica para escribir los mensajes para el usuario con las respectivas frases,
          dependiendo del caso: "Fin del juego!" en color rojo y "Ganaste, felicidades!" en color verde.
    */

    document.removeEventListener('keydown', checkTecla);

    ctxEstado.fillStyle = Object.values(aviso)[index].color;
    ctxEstado.fillText(Object.values(aviso)[index].frase, 330, 230);
}