const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Datos simulados de las áreas
const areasData = [
    { cAreFolio: 1, cAreDesc: 'BAR 1', cAreX: 185, cAreY: 334, cAreAncho: 300, cAreAlto: 150 },
    { cAreFolio: 2, cAreDesc: 'TERRAZA', cAreX: 640, cAreY: 450, cAreAncho: 550, cAreAlto: 150 },
    { cAreFolio: 3, cAreDesc: 'BILLAR 3', cAreX: 963, cAreY: 154, cAreAncho: 227, cAreAlto: 290 },
    { cAreFolio: 4, cAreDesc: 'BILLAR 1', cAreX: 185, cAreY: 0, cAreAncho: 380, cAreAlto: 150 },
    { cAreFolio: 5, cAreDesc: 'BAR 2B', cAreX: 706, cAreY: 295, cAreAncho: 251, cAreAlto: 150 },
    { cAreFolio: 6, cAreDesc: 'BAR 2A', cAreX: 185, cAreY: 450, cAreAncho: 300, cAreAlto: 150 },
    // ... (agrega el resto de las áreas aquí)
];

// Datos simulados de las mesas
const mesasData = [
    { cMesFolio: 270, cMesArea: 1, cMesNom: '50', cMesX: 908, cMesY: 100, cMesAncho: 30, cMesAlto: 30, cMesVentas: 120 },
    { cMesFolio: 271, cMesArea: 1, cMesNom: '51', cMesX: 708, cMesY: 100, cMesAncho: 30, cMesAlto: 30, cMesVentas: 80 },
    { cMesFolio: 272, cMesArea: 1, cMesNom: '52', cMesX: 508, cMesY: 100, cMesAncho: 30, cMesAlto: 30, cMesVentas: 40 },
    { cMesFolio: 273, cMesArea: 1, cMesNom: '53', cMesX: 308, cMesY: 100, cMesAncho: 30, cMesAlto: 30, cMesVentas: 20 },
    { cMesFolio: 274, cMesArea: 1, cMesNom: '54', cMesX: 308, cMesY: 50, cMesAncho: 30, cMesAlto: 30, cMesVentas: 10 },
    { cMesFolio: 275, cMesArea: 1, cMesNom: '55', cMesX: 508, cMesY: 50, cMesAncho: 30, cMesAlto: 30, cMesVentas: 5 },
    { cMesFolio: 276, cMesArea: 1, cMesNom: '56', cMesX: 708, cMesY: 50, cMesAncho: 30, cMesAlto: 30, cMesVentas: 2 },
    { cMesFolio: 277, cMesArea: 2, cMesNom: '80', cMesX: 308, cMesY: 0, cMesAncho: 30, cMesAlto: 30, cMesVentas: 1 },
    // ... (agrega el resto de las mesas aquí)
];

// Endpoint para obtener las áreas
app.get('/api/areas', (req, res) => {
    res.json(areasData);
});

// Endpoint para obtener las mesas
app.get('/api/mesas', (req, res) => {
    res.json(mesasData);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});