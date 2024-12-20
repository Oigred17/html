const calculadora = {
    valorPantalla: '0',
    primerOperando: null,
    esperandoSegundoOperando: false,
    operador: null,
};

function ingresarDigito(digito) {
    const { valorPantalla, esperandoSegundoOperando } = calculadora;

    if (esperandoSegundoOperando === true) {
        calculadora.valorPantalla = digito;
        calculadora.esperandoSegundoOperando = false;
    } else {
        calculadora.valorPantalla = valorPantalla === '0' ? digito : valorPantalla + digito;
    }
}

function ingresarDecimal(punto) {
    if (calculadora.esperandoSegundoOperando === true) return;

    if (!calculadora.valorPantalla.includes(punto)) {
        calculadora.valorPantalla += punto;
    }
}

function manejarOperador(siguienteOperador) {
    const { primerOperando, valorPantalla, operador } = calculadora;
    const valorEntrada = parseFloat(valorPantalla);

    if (operador && calculadora.esperandoSegundoOperando) {
        calculadora.operador = siguienteOperador;
        return;
    }

    if (primerOperando == null && !isNaN(valorEntrada)) {
        calculadora.primerOperando = valorEntrada;
    } else if (operador) {
        const resultado = operar(primerOperando, valorEntrada, operador);

        calculadora.valorPantalla = `${parseFloat(resultado.toFixed(7))}`;
        calculadora.primerOperando = resultado;
    }

    calculadora.esperandoSegundoOperando = true;
    calculadora.operador = siguienteOperador;


}

function operar(primerOperando, segundoOperando, operador) {
    if (operador === '+') {
        return primerOperando + segundoOperando;
    } else if (operador === '-') {
        return primerOperando - segundoOperando;
    } else if (operador === '*') {
        return primerOperando * segundoOperando;
    } else if (operador === '/') {
        return primerOperando / segundoOperando;
    }else if (operador === '=') {
         return segundoOperando;
    }
}

function reiniciarCalculadora() {
    calculadora.valorPantalla = '0';
    calculadora.primerOperando = null;
    calculadora.esperandoSegundoOperando = false;
    calculadora.operador = null;
}

function actualizarPantalla() {
    const pantalla = document.querySelector('.pantalla-calculadora');
    pantalla.value = calculadora.valorPantalla;
}

actualizarPantalla();

const teclas = document.querySelector('.teclas-calculadora');
teclas.addEventListener('click', (evento) => {
    const { target } = evento;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operador')) {
        manejarOperador(target.value);
        actualizarPantalla();
        return;
    }

    if (target.classList.contains('decimal')) {
        ingresarDecimal(target.value);
        actualizarPantalla();
        return;
    }

    if (target.classList.contains('reiniciar')) {
        reiniciarCalculadora();
        actualizarPantalla();
        return;
    }

    ingresarDigito(target.value);
    actualizarPantalla();
});