const logo = document.getElementById('logo');
const sidebar = document.querySelector('.sidebar');
const spans = document.querySelectorAll('span');
const menu = document.querySelector('.menu');
const main = document.querySelector("main");

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

    const mapWidth = storeMap.clientWidth;
    const mapHeight = storeMap.clientHeight;

    console.log(`Dimensiones reales de la imagen del mapa: ${mapWidth}x${mapHeight}`);

    const areas = await fetchAreasData();
    const mesas = await fetchMesasData();

    const minX = Math.min(...areas.map(area => area.cAreX));
    const mesMinX = Math.min(...areas.map(area => area.cAreX));

    heatmapContainer.innerHTML = '';

    areas.forEach(area => {
      const areaDiv = document.createElement('div');
      areaDiv.classList.add('map-area');

      const adjustedX = area.cAreX - minX;

      // Escalamos las posiciones y tamaños del área
      const scaledX = (adjustedX / mapWidth) * storeMap.clientWidth;
      const scaledY = (area.cAreY / mapHeight) * storeMap.clientHeight;
      const scaledWidth = (area.cAreAncho / mapWidth) * storeMap.clientWidth;
      const scaledHeight = (area.cAreAlto / mapHeight) * storeMap.clientHeight;

      areaDiv.style.position = 'absolute';
      areaDiv.style.top = `${scaledY}px`;
      areaDiv.style.left = `${scaledX}px`;
      areaDiv.style.width = `${scaledWidth}px`;
      areaDiv.style.height = `${scaledHeight}px`;
      areaDiv.innerText = area.cAreDesc;

      const mesasEnArea = mesas.filter(mesa => mesa.cMesArea === area.cAreFolio);

      mesasEnArea.forEach(mesa => {
        const mesaDiv = document.createElement('div');
        mesaDiv.classList.add('map-table');
        mesaDiv.style.position = 'absolute';

        // Calculamos la posición y tamaño escalados de la mesa dentro del área
        const mesaScaledX = (area.cAreX / mesa.cMesX) * 100;//(mesa.cMesX / area.cAreAncho) * scaledWidth;
        const mesaScaledY = (area.cAreY / mesa.cMesY) * 50;//(mesa.cMesY / area.cAreAlto) * scaledHeight;
        const mesaScaledWidth = 50;//(mesa.cMesAncho / area.cAreAncho) * scaledWidth;
        const mesaScaledHeight = 50;//(mesa.cMesAlto / area.cAreAlto) * scaledHeight;

        mesaDiv.style.top = `${mesaScaledY}px`;
        mesaDiv.style.left = `${mesaScaledX}px`;
        mesaDiv.style.width = `${mesaScaledWidth}px`;
        mesaDiv.style.height = `${mesaScaledHeight}px`;
        mesaDiv.innerText = mesa.cMesNom;
        mesaDiv.style.backgroundColor = getTableColor(mesa.cMesVentas);

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


function getTableColor(ventas) {
  if (ventas > 100) {
    return 'rgba(255, 0, 0, 0.7)';
  } else if (ventas > 50) {
    return 'rgba(255, 165, 0, 0.7)';
  } else {
    return 'rgba(0, 255, 0, 0.7)';
  }
}

window.onload = drawAreasAndTables;
