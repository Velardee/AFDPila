const { dialog } = require('electron').remote;

const button = document.getElementById('comprobar')

const automata = {
    estadoInicial: 1,
    estadoFinal: 2,
    transiciones: [{
            estado: 1,
            simbolo: 'a',
            simboloPila: '',
            al_estado: 1,
            al_simbolo: ['A']
        },
        {
            estado: 1,
            simbolo: 'a',
            simboloPila: 'A',
            al_estado: 1,
            al_simbolo: ['A', 'A']
        },
        {
            estado: 1,
            simbolo: 'b',
            simboloPila: 'A',
            al_estado: 2,
            al_simbolo: ['B']
        },
        {
            estado: 2,
            simbolo: 'b',
            simboloPila: 'B',
            al_estado: 2,
            al_simbolo: ['']
        },
        {
            estado: 2,
            simbolo: 'b',
            simboloPila: 'A',
            al_estado: 2,
            al_simbolo: ['B']
        }
    ]
}

button.addEventListener('click', (event) => {
    let cadena = document.getElementById('txtCadena').value;
    let estadoActual = automata.estadoInicial;
    let err = false;
    let pila = [''];

    cadena.split('').every(simbolo => {
        let encuentraTransicion = false;

        automata.transiciones.every(transicion => {
            if (transicion.estado == estadoActual && transicion.simbolo == simbolo && transicion.simboloPila == pila[pila.length - 1]) {
                pila.pop();
                for (i = 0; i < (transicion.al_simbolo.length); i++) {
                    if (transicion.al_simbolo[i] != '') {
                        pila.push(transicion.al_simbolo[i]);
                    }
                }

                estadoActual = transicion.al_estado;
                encuentraTransicion = true;
                return false;
            }
            return true;
        });

        if (!encuentraTransicion) {
            err = true;
            return false;
        }
        return true;
    });

    if (!err && automata.estadoFinal == estadoActual && pila.length == 0) {
        let options = {
            buttons: ['Aceptar'],
            message: 'Cadena ingresada correcta'
        }
        dialog.showMessageBox(options);
    } else {
        dialog.showErrorBox('Error', 'La cadena ingresada es invalida.');
    }
});