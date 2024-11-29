let score = 0;
let pointsPerClick = 1;
let autoPoints = 0;
let bulbasaurUnlocked = false;
let charmanderUnlocked = false;
let squirtleUnlocked = false;
let pikachuUnlocked = false;
let criticalChance = 0.2; // Probabilidad de golpe crítico (20%)
let criticalMultiplier = 2; // Multiplicador del golpe crítico
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
    alert('¡Has desbloqueado a Bulbasaur!');
    document.getElementById('pokemon1').classList.add('light');
    bulbasaurUnlocked = true;
    score += 5;
    addAttack('Bulbasaur');

  }
  else if (score >= 25 && !charmanderUnlocked) {
    alert('¡Has desbloqueado a Charmander!');
    document.getElementById('pokemon2').classList.add('light');
    charmanderUnlocked = true;
    autoPoints += 1;
    addAttack('Charmander');

  }
  else if (score >= 50 && !squirtleUnlocked) {
    alert('¡Has desbloqueado a Squirtle!');
    document.getElementById('pokemon3').classList.add('light');
    squirtleUnlocked = true;
    score += 10;
    addAttack('Squirtle');

  }
  else if (score >= 100 && !pikachuUnlocked) {
    alert('¡Has desbloqueado a Pikachu!');
    document.getElementById('pokemon4').classList.add('light');
    pikachuUnlocked = true;
    score += 15;
    addAttack('Pikachu');
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
});

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
