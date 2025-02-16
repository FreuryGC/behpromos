const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

// Datos simulados de las áreas
const areasData = [
  { cAreFolio: 1, cAreDesc: 'BAR 1', cAreX: 185, cAreY: 334, cAreAncho: 300, cAreAlto: 150, cAreEstatus: 1},
  { cAreFolio: 2, cAreDesc: 'TERRAZA', cAreX: 640, cAreY: 450, cAreAncho: 550, cAreAlto: 150, cAreEstatus: 1},
  { cAreFolio: 3, cAreDesc: 'BILLAR 3', cAreX: 963, cAreY: 154, cAreAncho: 227, cAreAlto: 290, cAreEstatus: 1},
  { cAreFolio: 5, cAreDesc: 'BILLAR 1', cAreX: 185, cAreY: 0, cAreAncho: 380, cAreAlto: 150, cAreEstatus: 1},
  { cAreFolio: 6, cAreDesc: 'BAR 2B', cAreX: 706, cAreY: 295, cAreAncho: 251, cAreAlto: 150, cAreEstatus: 1},
  { cAreFolio: 7, cAreDesc: 'BAR 2A', cAreX: 706, cAreY: 154, cAreAncho: 251, cAreAlto: 137, cAreEstatus: 1},
  { cAreFolio: 8, cAreDesc: 'BARRA', cAreX: 185, cAreY: 153, cAreAncho: 518, cAreAlto: 178, cAreEstatus: 1},
  { cAreFolio: 10, cAreDesc: 'BILLAR 2', cAreX: 571, cAreY: 0, cAreAncho: 616, cAreAlto: 150, cAreEstatus: 1}
];


// Datos simulados de las mesas
const mesasData = [
  { cMesFolio: 270, cMesArea: 1, cMesNom: '50', cMesX: 908, cMesY: 280, cMesAncho: 150, cMesAlto: 200, cMesVentas: 120 },
  { cMesFolio: 271, cMesArea: 1, cMesNom: '51', cMesX: 708, cMesY: 280, cMesAncho: 150, cMesAlto: 200, cMesVentas: 80 },
  { cMesFolio: 272, cMesArea: 1, cMesNom: '52', cMesX: 508, cMesY: 280, cMesAncho: 150, cMesAlto: 200, cMesVentas: 90 },
  { cMesFolio: 273, cMesArea: 1, cMesNom: '53', cMesX: 308, cMesY: 280, cMesAncho: 150, cMesAlto: 200, cMesVentas: 110 },
  { cMesFolio: 274, cMesArea: 1, cMesNom: '54', cMesX: 308, cMesY: 80, cMesAncho: 150, cMesAlto: 150, cMesVentas: 130 },
  { cMesFolio: 275, cMesArea: 1, cMesNom: '55', cMesX: 508, cMesY: 80, cMesAncho: 150, cMesAlto: 150, cMesVentas: 140 },
  { cMesFolio: 276, cMesArea: 1, cMesNom: '56', cMesX: 708, cMesY: 80, cMesAncho: 150, cMesAlto: 150, cMesVentas: 100 },
  { cMesFolio: 277, cMesArea: 2, cMesNom: '80', cMesX: 308, cMesY: 15, cMesAncho: 150, cMesAlto: 150, cMesVentas: 75 },
  { cMesFolio: 278, cMesArea: 2, cMesNom: '81', cMesX: 508, cMesY: 17, cMesAncho: 150, cMesAlto: 150, cMesVentas: 95 },
  { cMesFolio: 279, cMesArea: 2, cMesNom: '82', cMesX: 708, cMesY: 17, cMesAncho: 150, cMesAlto: 150, cMesVentas: 85 },
  { cMesFolio: 280, cMesArea: 2, cMesNom: '83', cMesX: 908, cMesY: 17, cMesAncho: 150, cMesAlto: 150, cMesVentas: 110 },
  { cMesFolio: 281, cMesArea: 2, cMesNom: '84', cMesX: 1108, cMesY: 17, cMesAncho: 150, cMesAlto: 150, cMesVentas: 120 },
  { cMesFolio: 282, cMesArea: 2, cMesNom: '87', cMesX: 708, cMesY: 217, cMesAncho: 150, cMesAlto: 150, cMesVentas: 130 },
  { cMesFolio: 283, cMesArea: 2, cMesNom: '85', cMesX: 308, cMesY: 217, cMesAncho: 150, cMesAlto: 150, cMesVentas: 140 },
  { cMesFolio: 284, cMesArea: 2, cMesNom: '86', cMesX: 508, cMesY: 217, cMesAncho: 150, cMesAlto: 150, cMesVentas: 90 },
  { cMesFolio: 285, cMesArea: 2, cMesNom: '88', cMesX: 908, cMesY: 217, cMesAncho: 150, cMesAlto: 150, cMesVentas: 95 },
  { cMesFolio: 286, cMesArea: 2, cMesNom: '89', cMesX: 1108, cMesY: 217, cMesAncho: 150, cMesAlto: 150, cMesVentas: 100 },
  { cMesFolio: 287, cMesArea: 2, cMesNom: '90', cMesX: 107, cMesY: 417, cMesAncho: 150, cMesAlto: 150, cMesVentas: 105 },
  { cMesFolio: 288, cMesArea: 2, cMesNom: '91', cMesX: 307, cMesY: 417, cMesAncho: 150, cMesAlto: 150, cMesVentas: 115 },
  { cMesFolio: 289, cMesArea: 2, cMesNom: '92', cMesX: 508, cMesY: 417, cMesAncho: 150, cMesAlto: 150, cMesVentas: 125 },
  { cMesFolio: 290, cMesArea: 2, cMesNom: '93', cMesX: 708, cMesY: 417, cMesAncho: 150, cMesAlto: 150, cMesVentas: 135 },
  { cMesFolio: 291, cMesArea: 2, cMesNom: '94', cMesX: 908, cMesY: 417, cMesAncho: 150, cMesAlto: 150, cMesVentas: 145 },
  { cMesFolio: 292, cMesArea: 2, cMesNom: '95', cMesX: 1108, cMesY: 417, cMesAncho: 150, cMesAlto: 150, cMesVentas: 155 },
  { cMesFolio: 293, cMesArea: 3, cMesNom: '11', cMesX: 570, cMesY: 37, cMesAncho: 125, cMesAlto: 200, cMesVentas: 75 }
  // Continúa con el resto de los datos
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