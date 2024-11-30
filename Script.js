let score = 0;
let pointsPerClick = 1;
let autoPoints = 0;
let bulbasaurUnlocked = false;
let charmanderUnlocked = false;
let squirtleUnlocked = false;
let pikachuUnlocked = false;
let criticalChance = 0.2; // Probabilidad de golpe crítico (20%)
let criticalMultiplier = 2; // Multiplicador del golpe crítico
const achievementList = document.getElementById('achievement-list');


const logros = [
  { id: 1, title: "Primer Click", description: "Realiza tu primer click.", condition: (score) => score >= 1, achieved: false },
  { id: 2, title: "Cazador Novato", description: "Alcanza 100 puntos.", condition: (score) => score >= 100, achieved: false },
  { id: 3, title: "Cazador Experto", description: "Alcanza 1,000 puntos.", condition: (score) => score >= 1000, achieved: false },
  /*{ id: 4, title: "Cazador Maestro", description: "Alcanza 10,000 puntos.", condition: (score) => score >= 10000, achieved: false },
  { id: 5, title: "Cazador Legendario", description: "Alcanza 100,000 puntos.", condition: (score) => score >= 100000, achieved: false },
  { id: 6, title: "Cazador Supremo", description: "Alcanza 1,000,000 puntos.", condition: (score) => score >= 1000000, achieved: false },
  */{ id: 7, title: "Coleccionista", description: "Desbloquea a todos los Pokémon.", condition: (score) => pikachuUnlocked && squirtleUnlocked && charmanderUnlocked && bulbasaurUnlocked, achieved: false },
  { id: 8, title: "Cazador de Tesoros", description: "Desbloquea todos los ataques.", condition: (score) => pikachuUnlocked && squirtleUnlocked && charmanderUnlocked && bulbasaurUnlocked, achieved: false },
  { id: 9, title: "Golpe Crítico", description: "Realiza un golpe crítico.", condition: (score) => Math.random() < criticalChance, achieved: false },
  { id: 10, title: "Cazador de Logros", description: "Desbloquea todos los logros.", condition: (score) => logros.every(logro => logro.achieved), achieved: false }];


const menu = document.getElementById('menu');
const menuButton = document.getElementById('menuButton');
// Referencia al contenedor del menú
const attackList = document.getElementById('attack-list');

// Lista de ataques por Pokémon desbloqueados
const pokemonAttacks = {
  Pikachu: "Impactrueno - Obtienes: 15 puntos",
  Charmander: "Lanzallamas - Obtienes: 1 punto por segundo",
  Bulbasaur: "Látigo Cepa - Obtienes: 5 puntos",
  Squirtle: "Pistola Agua - Obtienes: 10 puntos"
};



// Referencias al DOM
const scoreElement = document.getElementById('score');
const pokeball = document.getElementById('pokeball');
const upgradeClickButton = document.getElementById('upgrade-click');
const autoPointsButton = document.getElementById('auto-points');

// Función para actualizar puntos en pantalla
function updateScore() {
  scoreElement.textContent = score;
}


function updatePokemonImages() {
  if (score >= 10 && !bulbasaurUnlocked) {
    mostrarMensaje('¡Has desbloqueado a Bulbasaur!', 'verde');
    document.getElementById('pokemon1').classList.add('light');
    bulbasaurUnlocked = true;
    score += 5;
    addAttack('Bulbasaur');
    checkAchievements();
  }
  else if (score >= 25 && !charmanderUnlocked) {
    mostrarMensaje('¡Has desbloqueado a Charmander!', 'rojo');
    document.getElementById('pokemon2').classList.add('light');
    charmanderUnlocked = true;
    autoPoints += 1;
    addAttack('Charmander');
    checkAchievements();
  }
  else if (score >= 50 && !squirtleUnlocked) {
    mostrarMensaje('¡Has desbloqueado a Squirtle!', 'azul');
    document.getElementById('pokemon3').classList.add('light');
    squirtleUnlocked = true;
    score += 10;
    addAttack('Squirtle');
    checkAchievements();

  }
  else if (score >= 100 && !pikachuUnlocked) {
    mostrarMensaje('¡Has desbloqueado a Pikachu!', 'amarillo');

    document.getElementById('pokemon4').classList.add('light');
    pikachuUnlocked = true;
    score += 15;
    addAttack('Pikachu');
    checkAchievements();
  }
}

menuButton.addEventListener('click', () => {
  menu.style.bottom = '0px'; // Mostrar el menú
  menuButton.classList.add('hidden'); // Ocultar el botón inicial
});
// Ocultar el menú y volver a mostrar el botón inicial
closeButton.addEventListener('click', () => {
  menu.style.bottom = '-250px'; // Ocultar el menú
  menuButton.classList.remove('hidden'); // Mostrar el botón inicial
});





// Incrementar puntos al hacer clic en la Pokébola
pokeball.addEventListener('click', () => {

  const isCritical = Math.random() < criticalChance;
  const pointsEarned = isCritical ? pointsPerClick * criticalMultiplier : pointsPerClick;

  score += pointsEarned;
  pokeball.classList.add('spin');

  // Esperar el tiempo de la animación para quitar la clase
  setTimeout(() => {
    pokeball.classList.remove('spin');
  }, 300); // Duración de la animación en milisegundos

  if (isCritical) {
    pokeball.style.boxShadow = '0px 0px 15px gold'; // Brillo dorado en golpe crítico
    setTimeout(() => {
      pokeball.style.boxShadow = 'none';
    }, 300); // Elimina el efecto después de 300ms

  }
  updateScore();
  updatePokemonImages();
  checkAchievements();
});


// Función para verificar logros
function checkAchievements() {

    logros.forEach((logro) => {
        if (!logro.achieved && logro.condition(score, pointsPerClick)) {
          logro.achieved = true;
            displayAchievement(logro);
        }
    });
}

// Función para mostrar logros desbloqueados
function displayAchievement(logro) {
    const achievementItem = document.createElement('li');
    achievementItem.textContent = `${logro.title}: ${logro.description}`;
    achievementList.appendChild(achievementItem);

    // Notificación emergente
    alert(`¡Logro desbloqueado! ${logro.title}`);
}







// Comprar mejoras
upgradeClickButton.addEventListener('click', () => {
  if (score >= 10) {
    score -= 10;
    pointsPerClick += 1;
    updateScore();
  } else {
    alert('¡No tienes suficientes puntos!');
  }
});

autoPointsButton.addEventListener('click', () => {
  if (score >= 50) {
    score -= 50;
    autoPoints += 1;
    updateScore();
  } else {
    alert('¡No tienes suficientes puntos!');
  }
});

// Generar puntos automáticamente
setInterval(() => {
  if (autoPoints > 0) {
    score += autoPoints;


    updateScore();
    updatePokemonImages();
  }
}, 1000);




// Función para añadir un ataque al menú
function addAttack(pokemon) {
  if (pokemonAttacks[pokemon]) {
    // Crear un nuevo elemento <li> con el ataque
    const attackItem = document.createElement('li');
    attackItem.textContent = `${pokemon}: ${pokemonAttacks[pokemon]}`;

    // Añadir el ataque a la lista
    attackList.appendChild(attackItem);
  } else {
    console.log(`El Pokémon ${pokemon} no tiene un ataque registrado.`);
  }
}

function mostrarMensaje(texto, color) {
  const contenedor = document.getElementById("contenedor-mensajes");
  const mensaje = document.createElement("div");
  switch (color) {
    case "verde":
      mensaje.style.backgroundColor = "green";
      break;

    case "azul":
      mensaje.style.backgroundColor = "blue";
      break;

    case "amarillo":
      mensaje.style.backgroundColor = "yellow";
      mensaje.style.color = "black";
      break;
    case "rojo":
      mensaje.style.backgroundColor = "red";
      break;
    default:
      break;
  }

  // Crear un nuevo mensaje

  mensaje.className = "mensaje";
  mensaje.textContent = texto;

  // Agregar el mensaje al contenedor
  contenedor.appendChild(mensaje);

  // Eliminar el mensaje automáticamente después de 5 segundos
  setTimeout(() => {
    if (mensaje.parentElement) {
      mensaje.remove();
    }
  }, 2000);

  mensaje.style.color = "white";

}



// Obtener referencias a los elementos
const achievementsContainer = document.getElementById('achievements');
const toggleAchievementsButton = document.getElementById('toggleAchievements');

// Alternar visibilidad de logros
toggleAchievementsButton.addEventListener('click', () => {
    const isHidden = achievementsContainer.style.display === 'none';
    achievementsContainer.style.display = isHidden ? 'block' : 'none';
});