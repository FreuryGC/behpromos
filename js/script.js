
const logo = document.getElementById('logo'); // Selecciona el logo por ID
const sidebar = document.querySelector('.sidebar'); // Selecciona la barra lateral por clase
const spans = document.querySelectorAll('span'); // Selecciona el primer elemento <span>
const darkmode_switch = document.querySelector('.switch'); // Selecciona el switch por clase
const circle = document.querySelector('.circle'); // Selecciona el circulo por clase
const menu = document.querySelector('.menu'); // Selecciona el menu por clase
const main = document.querySelector("main");

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
    spans.forEach((span)=>{
      span.classList.add("hide");
    })
  }
});

darkmode_switch.addEventListener('click', () => {
    let body = document.body;
    body.classList.toggle('dark_mode'); // Alterna la clase dark_mode en el body
    circle.classList.toggle('active'); // Alterna la clase circle_dark en el circulo
});

// Alterna clases al hacer clic en el logo, agrega la clase si no la tiene al dar clic y al dar clic de nuevo la quita 
logo.addEventListener('click', () => {
  sidebar.classList.toggle('mini_sidebar'); // Contrae/expande la barra lateral
  main.classList.toggle("min_main");
  spans.forEach((span)=>{
    span.classList.toggle('hide'); // Muestra/Oculta los textos de la barra lateral
  })
});