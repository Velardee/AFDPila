const { BrowserWindow } = require('electron').remote;
const path = require('path');

const firstPilaButton = document.getElementById('1AFD');
const secondPilaButton = document.getElementById('2AFD');

firstPilaButton.addEventListener('click', (event) => {
    const afd1 = path.join('file://', __dirname, '/windows/Pila1/1AFD.html');

    let window1 = new BrowserWindow({
        width: 650,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true
        }
    });

    window1.on('close', () => { window1 = null });
    window1.loadURL(afd1);
    window1.show();
});

secondPilaButton.addEventListener('click', (event) => {
    const afd2 = path.join('file://', __dirname, '/windows/Pila2/2AFD.html');

    let window2 = new BrowserWindow({
        width: 650,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true
        }
    });

    window2.on('close', () => { window2 = null });
    window2.loadURL(afd2);
    window2.show();
});