const logo = document.getElementById('logo'); // Selecciona el logo por ID
const sidebar = document.querySelector('.sidebar'); // Selecciona la barra lateral
const spans = document.querySelectorAll('span'); // Selecciona todos los elementos <span>
const menu = document.querySelector('.menu'); // Selecciona el menú
const main = document.querySelector("main");

// Control de menú lateral
menu.addEventListener('click', () => {
  sidebar.classList.toggle("max_sidebar");
  if(sidebar.classList.contains("max_sidebar")){
    menu.children[0].style.display = "none";
    menu.children[1].style.display = "block";
  }else{
    menu.children[0].style.display = "block";
    menu.children[1].style.display = "none";
  }
  if(window.innerWidth<=320){
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
      if (!response.ok) throw new Error('Error al obtener los datos');
      return await response.json();
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
}

// Función para obtener datos de las áreas desde el servidor
async function fetchAreasData() {
  try {
      const response = await fetch('/api/areas');
      if (!response.ok) throw new Error('Error al obtener los datos');
      return await response.json();
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
}

// Función para obtener datos de las áreas desde el servidor
async function fetchAreasData() {
  try {
      const response = await fetch('/api/areas');
      if (!response.ok) throw new Error('Error al obtener los datos');
      return await response.json();
  } catch (error) {
      console.error('Error:', error);
      return [];
  }
}

async function drawSections() {
  const heatmapContainer = document.querySelector('.heatmap');
  const storeMap = document.querySelector('.store_map');

  if (!storeMap || !heatmapContainer) {
      console.error('No se encontró el mapa o el contenedor de áreas.');
      return;
  }

  const processMap = async () => {
      // Verificar si el contenedor del mapa tiene dimensiones válidas
      if (!storeMap.clientWidth || !storeMap.clientHeight) {
          console.error("Las dimensiones del contenedor del mapa no están disponibles.");
          return;
      }

      // Dimensiones del contenedor del mapa
      const actualMapWidth = storeMap.clientWidth;
      const actualMapHeight = storeMap.clientHeight;

      console.log(`Dimensiones del contenedor del mapa: ${actualMapWidth}x${actualMapHeight}`);

      const areas = await fetchAreasData();

      // Obtener el valor mínimo de cAreX para normalizar las posiciones
      const minX = Math.min(...areas.map(area => area.cAreX));

      // Limpiar el contenedor antes de agregar nuevas áreas
      heatmapContainer.innerHTML = '';

      // Escalar y posicionar las áreas
      areas.forEach(area => {
          // Normalizamos las posiciones de X restando el mínimo valor
          const adjustedX = area.cAreX - minX;

          const scaledX = (adjustedX / actualMapWidth) * actualMapWidth;
          const scaledY = (area.cAreY / actualMapHeight) * actualMapHeight;
          const scaledWidth = (area.cAreAncho / actualMapWidth) * actualMapWidth;
          const scaledHeight = (area.cAreAlto / actualMapHeight) * actualMapHeight;

          const section = document.createElement('div');
          section.classList.add('map-section');
          section.style.position = 'absolute';
          section.style.top = `${scaledY}px`;
          section.style.left = `${scaledX}px`;
          section.style.width = `${scaledWidth}px`;
          section.style.height = `${scaledHeight}px`;
          section.innerText = area.cAreDesc; // Nombre del área
          section.style.backgroundColor = 'rgba(0, 150, 255, 0.5)';
          section.style.border = '2px solid blue';
          section.style.display = 'flex';
          section.style.alignItems = 'center';
          section.style.justifyContent = 'center';
          section.style.color = 'white';
          section.style.fontSize = '14px';
          section.style.fontWeight = 'bold';

          heatmapContainer.appendChild(section);
      });
  };

  // Esperar a que la imagen cargue completamente antes de procesar
  if (storeMap.complete) {
      processMap();
  } else {
      storeMap.onload = processMap;
  }
}


// Ejecutar la función al cargar la página
window.onload = drawSections;
