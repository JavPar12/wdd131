const radiusOutput = document.getElementById('radius');
const areaOutput = document.querySelector('#area'); // Corregido el selector ID

const PI = 3.14159; // Corregido de == a =
let radius = 10;    // Corregido de const a let para poder cambiarlo
let area = 0;

// Primera vuelta
area = PI * radius * radius;
radiusOutput.textContent = radius; // Usando textContent
areaOutput.textContent = area;

// Segunda vuelta (cambiamos el radio)
radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;