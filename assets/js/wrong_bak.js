const avisos = {
    condenado: {
        frase: 'Fin del juego',
    },
    absuelto: {
        frase: 'Ganaste, felicidades',
    }
}

const MAX_ERRORS = 6;

function checkLetra(aSecretos, aErrores, letra) {
    checkStatus(aSecretos, aErrores);
}

function checkStatus(aSecretos, aErrores) {
    //const numFaltas = showHorca(aErrores.length);
    const numFaltas = aErrores.length;

    if (numFaltas === MAX_ERRORS) {
        showMensaje('condenado');
    } else if (aSecretos.every(valores => valores === undefined)) {
        showMensaje('absuelto');
    }
}

function showMensaje(status) {
    document.removeEventListener('keydown', checkTecla);
    alert(avisos[status].frase);
}
