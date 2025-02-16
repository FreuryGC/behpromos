const logo = document.getElementById('logo');
const sidebar = document.querySelector('.sidebar');
const spans = document.querySelectorAll('span');
const menu = document.querySelector('.menu');
const main = document.querySelector("main");

// Control de menú lateral
menu.addEventListener('click', () => {
  sidebar.classList.toggle("max_sidebar");
  if (sidebar.classList.contains("max_sidebar")) {
    menu.children[0].style.display = "none";
    menu.children[1].style.display = "block";
  } else {
    menu.children[0].style.display = "block";
    menu.children[1].style.display = "none";
  }
  if (window.innerWidth <= 320) {
    sidebar.classList.add("mini_sidebar");
    main.classList.add("min_main");
    spans.forEach(span => span.classList.add("hide"));
  }
});

logo.addEventListener('click', () => {
  sidebar.classList.toggle('mini_sidebar');
  main.classList.toggle("min_main");
  spans.forEach(span => span.classList.toggle('hide'));
});

// Función para obtener datos de las áreas desde el servidor
async function fetchAreasData() {
  try {
    const response = await fetch('/api/areas');
    if (!response.ok) throw new Error('Error al obtener los datos de las áreas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Función para obtener datos de las mesas desde el servidor
async function fetchMesasData() {
  try {
    const response = await fetch('/api/mesas');
    if (!response.ok) throw new Error('Error al obtener los datos de las mesas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Función para dibujar áreas y mesas
async function drawAreasAndTables() {
  const heatmapContainer = document.querySelector('.heatmap');
  const storeMap = document.querySelector('.store_map');

  if (!storeMap || !heatmapContainer) {
    console.error('No se encontró el mapa o el contenedor de áreas.');
    return;
  }

  const processMap = async () => {
    if (!storeMap.clientWidth || !storeMap.clientHeight) {
      console.error("Las dimensiones del contenedor del mapa no están disponibles.");
      return;
    }

    const actualMapWidth = storeMap.clientWidth;
    const actualMapHeight = storeMap.clientHeight;

    console.log(`Dimensiones del contenedor del mapa: ${actualMapWidth}x${actualMapHeight}`);

    const areas = await fetchAreasData();
    const mesas = await fetchMesasData();

    const minX = Math.min(...areas.map(area => area.cAreX));

    // Limpiar el contenedor antes de agregar nuevas áreas y mesas
    heatmapContainer.innerHTML = '';

    // Dibujar áreas
    areas.forEach(area => {
      const adjustedX = area.cAreX - minX;

      const areaDiv = document.createElement('div');
      areaDiv.classList.add('map-area');
      areaDiv.style.top = `${(area.cAreY / actualMapHeight) * 100}%`;
      areaDiv.style.left = `${(adjustedX / actualMapWidth) * 100}%`;
      areaDiv.style.width = `${(area.cAreAncho / actualMapWidth) * 100}%`;
      areaDiv.style.height = `${(area.cAreAlto / actualMapHeight) * 100}%`;
      areaDiv.innerText = area.cAreDesc; // Nombre del área

      // Filtrar mesas que pertenecen a esta área
      const mesasEnArea = mesas.filter(mesa => mesa.cMesArea === area.cAreFolio);

      // Dibujar mesas dentro del área
      mesasEnArea.forEach(mesa => {
        const mesaDiv = document.createElement('div');
        mesaDiv.classList.add('map-table');
        mesaDiv.style.top = `${(mesa.cMesY / area.cAreAlto) * 100}%`;
        mesaDiv.style.left = `${(mesa.cMesX / area.cAreAncho) * 23}%`;
        mesaDiv.style.width = `${(mesa.cMesAncho / area.cAreAncho) * 100}%`;
        mesaDiv.style.height = `${(mesa.cMesAlto / area.cAreAlto) * 100}%`;
        mesaDiv.innerText = mesa.cMesNom; // Nombre de la mesa
        mesaDiv.style.backgroundColor = getTableColor(mesa.cMesVentas); // Color basado en las ventas

        areaDiv.appendChild(mesaDiv);
      });

      heatmapContainer.appendChild(areaDiv);
    });
  };

  if (storeMap.complete) {
    processMap();
  } else {
    storeMap.onload = processMap;
  }
}

// Función para obtener el color basado en las ventas
function getTableColor(ventas) {
  if (ventas > 100) {
    return 'rgba(255, 0, 0, 0.7)'; // Rojo para ventas altas
  } else if (ventas > 50) {
    return 'rgba(255, 165, 0, 0.7)'; // Naranja para ventas medias
  } else {
    return 'rgba(0, 255, 0, 0.7)'; // Verde para ventas bajas
  }
}

// Ejecutar la función al cargar la página
window.onload = drawAreasAndTables;