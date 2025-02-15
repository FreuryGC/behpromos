const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Datos simulados de las áreas
const areasData = [
  { cAreFolio: 1, cAreDesc: 'BAR 1', cAreX: 185, cAreY: 334, cAreAncho: 300, cAreAlto: 150 },
  { cAreFolio: 2, cAreDesc: 'TERRAZA', cAreX: 632, cAreY: 450, cAreAncho: 550, cAreAlto: 150 },
  // ... (agrega el resto de las áreas aquí)
];

// Datos simulados de las mesas
const mesasData = [
  { cMesFolio: 270, cMesArea: 1, cMesNom: '50', cMesX: 50, cMesY: 50, cMesAncho: 30, cMesAlto: 30, cMesVentas: 120 },
  { cMesFolio: 271, cMesArea: 1, cMesNom: '51', cMesX: 100, cMesY: 50, cMesAncho: 30, cMesAlto: 30, cMesVentas: 80 },
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