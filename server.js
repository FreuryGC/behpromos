const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname)); // Servir archivos estáticos

// Datos simulados de las áreas
const areasData = [
  { cAreFolio: 15, cAreDesc: 'BAR 1', cAreX: 185, cAreY: 334, cAreAncho: 300, cAreAlto: 150 },
  { cAreFolio: 16, cAreDesc: 'TERRAZA', cAreX: 632, cAreY: 450, cAreAncho: 550, cAreAlto: 150 },
  { cAreFolio: 17, cAreDesc: 'BILLAR 3', cAreX: 963, cAreY: 154, cAreAncho: 227, cAreAlto: 290 },
  { cAreFolio: 18, cAreDesc: 'BILLAR 1', cAreX: 185, cAreY: 0, cAreAncho: 380, cAreAlto: 150 },
  { cAreFolio: 19, cAreDesc: 'BAR 2B', cAreX: 706, cAreY: 295, cAreAncho: 251, cAreAlto: 150 },
  { cAreFolio: 20, cAreDesc: 'BAR 2A', cAreX: 706, cAreY: 154, cAreAncho: 251, cAreAlto: 137 },
  { cAreFolio: 21, cAreDesc: 'BARRA', cAreX: 185, cAreY: 153, cAreAncho: 518, cAreAlto: 178 },
  { cAreFolio: 22, cAreDesc: 'BILLAR 2', cAreX: 571, cAreY: 0, cAreAncho: 616, cAreAlto: 150 }
];

// Endpoint para obtener los datos de las áreas (sin escalar)
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