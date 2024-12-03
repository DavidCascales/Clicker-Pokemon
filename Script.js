let score = 0;
let pointsPerClick = 1;
let autoPoints = 0;
let bulbasaurUnlocked = false;
let charmanderUnlocked = false;
let squirtleUnlocked = false;
let pikachuUnlocked = false;
let ivysaurUnlocked = false;
let venusaurUnlocked = false;
let charmeleonUnlocked = false;
let charizardUnlocked = false;
let wartortleUnlocked = false;
let blastoiseUnlocked = false;

let criticalChance = 0.2; // Probabilidad de golpe crítico (20%)
let criticalMultiplier = 2; // Multiplicador del golpe crítico
const achievementList = document.getElementById("achievement-list");
let activePokemon = [1, 4, 7, 25]; // IDs de los Pokémon actuales (puedes personalizar esto)
const evolutions = {
  1: { next: 2, cost: 100 }, // Bulbasaur -> Ivysaur
  2: { next: 3, cost: 300 }, // Ivysaur -> Venusaur
  3: { next: null, cost: null }, // Venusaur -> Sin evolución
  4: { next: 5, cost: 100 }, // Charmander -> Charmeleon
  5: { next: 6, cost: 300 }, // Charmeleon -> Charizard
  6: { next: null, cost: null }, // Charizard -> Sin evolución
  7: { next: 8, cost: 100 }, // Squirtle -> Wartortle
  8: { next: 9, cost: 300 }, // Wartortle -> Blastoise
  9: { next: null, cost: null }, // Blastoise -> Sin evolución
  25: { next: null, cost: null }, // Pikachu -> Sin evolución
};

const logros = [
  {
    id: 1,
    title: "Primer Click",
    description: "Realiza tu primer click.",
    condition: (score) => score >= 1,
    achieved: false,
  },
  {
    id: 2,
    title: "Cazador Novato",
    description: "Alcanza 100 puntos.",
    condition: (score) => score >= 100,
    achieved: false,
  },
  {
    id: 3,
    title: "Cazador Experto",
    description: "Alcanza 1,000 puntos.",
    condition: (score) => score >= 1000,
    achieved: false,
  },
  /*{ id: 4, title: "Cazador Maestro", description: "Alcanza 10,000 puntos.", condition: (score) => score >= 10000, achieved: false },
  { id: 5, title: "Cazador Legendario", description: "Alcanza 100,000 puntos.", condition: (score) => score >= 100000, achieved: false },
  { id: 6, title: "Cazador Supremo", description: "Alcanza 1,000,000 puntos.", condition: (score) => score >= 1000000, achieved: false },
  */ {
    id: 7,
    title: "Coleccionista",
    description: "Desbloquea a todos los Pokémon Base.",
    condition: (score) =>
      pikachuUnlocked &&
      squirtleUnlocked &&
      charmanderUnlocked &&
      bulbasaurUnlocked,
    achieved: false,
  },
  /*(arreglar)mirar este logro*/ {
    id: 8,
    title: "Cazador de Tesoros",
    description: "Desbloquea todos los ataques.",
    condition: (score) =>
      ivysaurUnlocked &&
      venusaurUnlocked &&
      charmeleonUnlocked &&
      charizardUnlocked &&
      wartortleUnlocked &&
      blastoiseUnlocked,
    achieved: false,
  },
  {
    id: 9,
    title: "Golpe Crítico",
    description: "Realiza un golpe crítico.",
    condition: (score) => Math.random() < criticalChance,
    achieved: false,
  },
  {
    id: 10,
    title: "Cazador de Logros",
    description: "Desbloquea todos los logros.",
    condition: (score) => logros.every((logro) => logro.achieved),
    achieved: false,
  },
  {
    id: 11,
    title: "Evolucionador",
    description: "Evoluciona a todos los Pokémon.",
    condition: (score) =>
      ivysaurUnlocked &&
      venusaurUnlocked &&
      charmeleonUnlocked &&
      charizardUnlocked &&
      wartortleUnlocked &&
      blastoiseUnlocked,
    achieved: false,
  },
];

const menu = document.getElementById("menu");
const menuButton = document.getElementById("menuButton");
// Referencia al contenedor del menú
const attackList = document.getElementById("attack-list");

// Lista de ataques por Pokémon desbloqueados
const pokemonAttacks = {
  Pikachu: {
    attack: "Impactrueno - Obtienes: 15 puntos",
    points: 15,
    type: "click",
    effect: "electric",
  },
  Charmander: {
    attack: "Lanzallamas - Obtienes: 1 punto por segundo",
    points: 1,
    type: "auto",
    effect: "fire",
  },
  Charmeleon: {
    attack: "Garra Dragón - Obtienes: 3 puntos por segundo",
    points: 3,
    type: "auto",
    effect: "fire",
  },
  Charizard: {
    attack: "Vuelo - Obtienes: 5 puntos por segundo",
    points: 5,
    type: "auto",
    effect: "fire",
  },
  Squirtle: {
    attack: "Pistola Agua - Obtienes: 10 puntos",
    points: 10,
    type: "click",
    effect: "water",
  },
  Wartortle: {
    attack: "Hidrobomba - Obtienes: 25 puntos",
    points: 25,
    type: "click",
    effect: "water",
  },
  Blastoise: {
    attack: "Hidrocañón - Obtienes: 50 puntos",
    points: 50,
    type: "click",
    effect: "water",
  },
  Bulbasaur: {
    attack: "Látigo Cepa - Obtienes: 5 puntos",
    points: 5,
    type: "click",
    effect: "grass",
  },
  Ivysaur: {
    attack: "Hoja Afilada - Obtienes: 15 puntos",
    points: 15,
    type: "click",
    effect: "grass",
  },
  Venusaur: {
    attack: "Rayo Solar - Obtienes: 35 puntos",
    points: 35,
    type: "click",
    effect: "grass",
  },
};

function getPokemonName(id) {
  const pokemonNames = {
    1: "Bulbasaur",
    2: "Ivysaur",
    3: "Venusaur",
    4: "Charmander",
    5: "Charmeleon",
    6: "Charizard",
    7: "Squirtle",
    8: "Wartortle",
    9: "Blastoise",
    25: "Pikachu",
  };
  return pokemonNames[id] || "Desconocido";
}

// Referencias al DOM
const scoreElement = document.getElementById("score");
const pokeball = document.getElementById("pokeball");
const upgradeClickButton = document.getElementById("upgrade-click");
const autoPointsButton = document.getElementById("auto-points");

// Función para actualizar puntos en pantalla
function updateScore() {
  scoreElement.textContent = score;
}

function updatePokemonImages() {
  if (score >= 10 && !bulbasaurUnlocked) {
    mostrarMensaje("¡Has desbloqueado a Bulbasaur!", "green", "white");
    document.getElementById("pokemon1").classList.add("light");
    bulbasaurUnlocked = true;
    // score += 5;
    addAttack("Bulbasaur");
    checkAchievements();
    updateEvolutionShop();
  } else if (score >= 25 && !charmanderUnlocked) {
    mostrarMensaje("¡Has desbloqueado a Charmander!", "red", "white");
    document.getElementById("pokemon2").classList.add("light");
    charmanderUnlocked = true;
    // autoPoints += 1;
    addAttack("Charmander");
    checkAchievements();
    updateEvolutionShop();
  } else if (score >= 50 && !squirtleUnlocked) {
    mostrarMensaje("¡Has desbloqueado a Squirtle!", "blue", "white");
    document.getElementById("pokemon3").classList.add("light");
    squirtleUnlocked = true;
    //score += 10;
    addAttack("Squirtle");
    checkAchievements();
    updateEvolutionShop();
  } else if (score >= 100 && !pikachuUnlocked) {
    mostrarMensaje("¡Has desbloqueado a Pikachu!", "yellow", "black");
    document.getElementById("pokemon4").classList.add("light");
    pikachuUnlocked = true;
    // score += 15;
    addAttack("Pikachu");
    checkAchievements();
    updateEvolutionShop();
  }
}

menuButton.addEventListener("click", () => {
  menu.style.bottom = "0px"; // Mostrar el menú
  menuButton.classList.add("hidden"); // Ocultar el botón inicial
});
// Ocultar el menú y volver a mostrar el botón inicial
closeButton.addEventListener("click", () => {
  menu.style.bottom = "-300px"; // Ocultar el menú
  menuButton.classList.remove("hidden"); // Mostrar el botón inicial
});

// Obtener los elementos
const botonColeccion = document.getElementById("toggle-collection-button");
const pokemonCollection = document.getElementById("pokemon-collection");
const closeColeccion = document.getElementById("close-collection-button");

// Evento para mostrar la colección
botonColeccion.addEventListener("click", () => {
  // Ocultar el botón de mostrar colección
  botonColeccion.style.display = "none";

  // Mover la colección a la vista (deslizar desde la izquierda)
  pokemonCollection.style.left = "10px"; // Mover la colección a la posición visible
});

// Evento para cerrar la colección
closeColeccion.addEventListener("click", () => {
  // Mover la colección fuera de la pantalla hacia la izquierda
  pokemonCollection.style.left = "-400px";

  // Volver a mostrar el botón de mostrar colección
  botonColeccion.style.display = "block";
});

// Función para aplicar el efecto según el tipo de Pokémon
function triggerEffect(pokemonType) {
  // Marcar el efecto como activo
  isEffectActive = true;
  // Mapear tipos de Pokémon a clases CSS
  const typeEffects = {
    grass: "effect-grass",
    fire: "effect-fire",
    water: "effect-water",
    electric: "effect-electric",
  };

  // Reinicia la Pokébola al estado base
  pokeball.className = "pokeball";
  // Obtener la clase del efecto correspondiente
  const effectClass = typeEffects[pokemonType];

  // Agregar la clase del efecto correspondiente
  if (effectClass) {
    pokeball.classList.add(effectClass);

    // Remover el efecto después de 2 segundos
    setTimeout(() => {
      if (pokeball.classList.contains(effectClass)) {
        pokeball.classList.remove(effectClass); // Elimina el efecto al finalizar
      }
    }, 2000);
  }
}

// Obtener todas las imágenes de Pokémon
const pokemonImages = document.querySelectorAll(".pokemon-images img");

// Evento para abrir la página del Pokémon si está desbloqueado
pokemonImages.forEach((image) => {
  image.addEventListener("click", () => {
    const pokemonId = image.id; // Obtener el id de la imagen
    const isUnlocked = getPokemonUnlockStatus(pokemonId); // Verificar si está desbloqueado

    if (isUnlocked) {
      const imageUrl = image.src;
      window.open("CartaIndv.html?imagen=" + imageUrl, "_blank"); // Abre la imagen en una nueva pestaña
    } else {
      alert("Este Pokémon aún está bloqueado. ¡Desbloquéalo primero!");
    }
  });
});

// Función para obtener el estado de desbloqueo de un Pokémon
function getPokemonUnlockStatus(pokemonId) {
  if (pokemonId === "pokemon1") return bulbasaurUnlocked;
  if (pokemonId === "pokemon2") return charmanderUnlocked;
  if (pokemonId === "pokemon3") return squirtleUnlocked;
  if (pokemonId === "pokemon4") return pikachuUnlocked;
  return false;
}

// Incrementar puntos al hacer clic en la Pokébola
pokeball.addEventListener("click", () => {
  const isCritical = Math.random() < criticalChance;
  const pointsEarned = isCritical
    ? pointsPerClick * criticalMultiplier
    : pointsPerClick;

  score += pointsEarned;
  pokeball.classList.add("spin");

  // Esperar el tiempo de la animación para quitar la clase
  setTimeout(() => {
    pokeball.classList.remove("spin");
  }, 300); // Duración de la animación en milisegundos

  if (isCritical) {
    pokeball.style.boxShadow = "0px 0px 15px gold"; // Brillo dorado en golpe crítico
    setTimeout(() => {
      pokeball.style.boxShadow = "none";
    }, 300); // Elimina el efecto después de 300ms
  }
  updateScore();
  updatePokemonImages();
  checkAchievements();
  updateEvolutionShop();
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
  const achievementItem = document.createElement("li");
  achievementItem.textContent = `${logro.title}: ${logro.description}`;
  achievementList.appendChild(achievementItem);

  // Notificación emergente
  // alert(`¡Logro desbloqueado! ${logro.title}`);
}

// Comprar mejoras
upgradeClickButton.addEventListener("click", () => {
  if (score >= 10) {
    score -= 10;
    pointsPerClick += 1;
    updateScore();
    updateEvolutionShop();
    mostrarMensaje(
      "¡Has mejorado tu ataque! Ahora ganas 1 punto extra por clic.",
      "green",
      "white"
    );
  } else {
    alert("¡No tienes suficientes puntos!");
  }
});

autoPointsButton.addEventListener("click", () => {
  if (score >= 50) {
    score -= 50;
    autoPoints += 1;
    updateScore();
    updateEvolutionShop();
    mostrarMensaje(
      "¡Has comprado un ataque automático! Ahora ganas 1 punto por segundo.",
      "green",
      "white"
    );
  } else {
    alert("¡No tienes suficientes puntos!");
  }
});

// Generar puntos automáticamente
setInterval(() => {
  if (autoPoints > 0) {
    score += autoPoints;

    updateScore();
    updatePokemonImages();
    updateEvolutionShop();
  }
}, 1000);

const attackCooldowns = {};

// Función para añadir un ataque al menú
function addAttack(pokemon) {
  if (pokemonAttacks[pokemon]) {
    // Aplicar la mejora al puntaje
    const attackData = pokemonAttacks[pokemon];

    // Verificar si ya existe un botón para este ataque
    const existingButton = document.querySelector(
      `button[data-pokemon="${pokemon}"]`
    );
    if (existingButton) {
      console.log(`El botón para ${pokemon} ya existe.`);
      return;
    }

    // Crear un botón para el ataque
    const attackButton = document.createElement("button");
    attackButton.textContent = `${pokemon}: ${attackData.attack}`;
    attackButton.classList.add("attack-button"); // Clase para estilos

    switch (attackData.effect) {
      case "grass":
        attackButton.style.backgroundColor = "green";
        break;
      case "fire":
        attackButton.style.backgroundColor = "red";
        break;
      case "water":
        attackButton.style.backgroundColor = "blue";
        break;
      case "electric":
        attackButton.style.backgroundColor = "yellow";
        attackButton.style.color = "black";
        break;

      default:
        break;
    }

    // Agregar evento al botón
    attackButton.addEventListener("click", () => {
      if (attackCooldowns[pokemon]) {
        mostrarMensaje(
          `${pokemon} está en cooldown. Espere ${attackCooldowns[pokemon]} segundos.`,
          "orange",
          "white"
        );
        return;
      }
      usarAtaque(pokemon, attackData); // Llamar a la función de ataque

      // Establecer el cooldown de 10 segundos
      attackCooldowns[pokemon] = 10;
      actualizarBotonCooldown(attackButton, pokemon); // Actualizar el texto y estado del botón
    });

    // Añadir el botón al menú de ataques
    attackList.appendChild(attackButton);

    // if (attackData.type === 'click') {
    //   score += attackData.points; // Incrementar los puntos por clic
    // } else if (attackData.type === 'auto') {
    //   autoPoints += attackData.points; // Incrementar los puntos por segundo
    // }
  } else {
    console.log(`El Pokémon ${pokemon} no tiene un ataque registrado.`);
  }
  updateScore();
}
function actualizarBotonCooldown(button, pokemon) {
  // Deshabilitar el botón y cambiar el texto
  button.disabled = true;
  button.textContent = `${pokemon}: ${attackCooldowns[pokemon]}s`;

  // Actualizar cada segundo el tiempo restante del cooldown
  const cooldownInterval = setInterval(() => {
    attackCooldowns[pokemon]--;
    button.textContent = `${pokemon}: ${attackCooldowns[pokemon]}s`;

    // Si el cooldown llega a 0, habilitar el botón de nuevo
    if (attackCooldowns[pokemon] <= 0) {
      clearInterval(cooldownInterval);
      attackCooldowns[pokemon] = 0;
      button.disabled = false;
      button.textContent = `${pokemon}: ${pokemonAttacks[pokemon].attack}`; // Volver al texto original
    }
  }, 1000);
}

function usarAtaque(pokemon, attackData) {
  // Mostrar la animación del ataque
  const attackContainer = document.getElementById("attack-animation-container");
  const attackImage = document.createElement("img");
  attackImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
    pokemon
  )}.png`;
  attackImage.classList.add("attack-image");

  // Añadir la imagen al contenedor
  attackContainer.appendChild(attackImage);

  // Eliminar la imagen después de la animación
  setTimeout(() => {
    attackImage.remove();
  }, 500); // Duración de la animación (coincide con la definida en CSS)

  if (attackData.type === "click") {
    // Incrementar puntos según el ataque
    score += attackData.points;
    mostrarMensaje(
      `¡${pokemon} usó ${attackData.attack}! Ganas ${attackData.points} puntos.`,
      "green",
      "white"
    );
    triggerEffect(attackData.effect); // Aplicar efecto visual del ataque
  } else if (attackData.type === "auto") {
    // Incrementar autoPoints por un tiempo limitado
    const bonus = attackData.points;
    autoPoints += bonus;
    mostrarMensaje(
      `¡${pokemon} usó ${attackData.attack}! Ganas ${bonus} puntos/seg por 10 segundos.`,
      "blue",
      "white"
    );
    triggerEffect(attackData.effect); // Aplicar efecto visual del ataque
    // Remover el efecto después de 10 segundos
    setTimeout(() => {
      autoPoints -= bonus;
      mostrarMensaje(
        `El efecto de ${attackData.attack} de ${pokemon} ha terminado.`,
        "red",
        "white"
      );
    }, 10000); // Duración en milisegundos
  }
  updateScore();
}

// Función auxiliar para obtener el ID del Pokémon a partir del nombre
function getPokemonId(pokemon) {
  const pokemonIds = {
    Bulbasaur: 1,
    Ivysaur: 2,
    Venusaur: 3,
    Charmander: 4,
    Charmeleon: 5,
    Charizard: 6,
    Squirtle: 7,
    Wartortle: 8,
    Blastoise: 9,
    Pikachu: 25,
  };
  return pokemonIds[pokemon];
}

function mostrarMensaje(texto, color = "white", colorTexto = "white") {
  const contenedor = document.getElementById("contenedor-mensajes");
  const mensaje = document.createElement("div");

  // Crear un nuevo mensaje

  mensaje.className = "mensaje";
  mensaje.textContent = texto;
  mensaje.style.color = colorTexto; // Establece el color del texto
  mensaje.style.backgroundColor = color; // Establece el color del fondo

  // Agregar el mensaje al contenedor
  contenedor.appendChild(mensaje);

  // Eliminar el mensaje automáticamente después de 5 segundos
  setTimeout(() => {
    if (mensaje.parentElement) {
      mensaje.remove();
    }
  }, 2000);
}

// Obtener referencias a los elementos
const achievementsContainer = document.getElementById("achievements");
const toggleAchievementsButton = document.getElementById("toggleAchievements");

// Alternar visibilidad de logros
toggleAchievementsButton.addEventListener("click", () => {
  const isHidden = achievementsContainer.style.display === "none";
  achievementsContainer.style.display = isHidden ? "block" : "none";
});

function updateEvolutionShop() {
  const shopContainer = document.getElementById("evolution-shop");
  shopContainer.innerHTML = ""; // Limpiar el contenido previo

  activePokemon.forEach((pokemonId, index) => {
    const evolutionData = evolutions[pokemonId];

    // Condición para mostrar el botón solo si el Pokémon base está desbloqueado
    if (
      (pokemonId === 1 && !bulbasaurUnlocked) || // Bulbasaur
      (pokemonId === 4 && !charmanderUnlocked) || // Charmander
      (pokemonId === 7 && !squirtleUnlocked) || // Squirtle
      (pokemonId === 25 && !pikachuUnlocked)
    ) {
      // Pikachu
      return; // No mostramos el botón de evolución si el Pokémon base no está desbloqueado
    }

    if (evolutionData && evolutionData.next) {
      const button = document.createElement("button");
      button.textContent = `Evolucionar ${getPokemonName(pokemonId)} (${
        evolutionData.cost
      } puntos)`;
      button.addEventListener("click", () =>
        evolveInShop(pokemonId, evolutionData.cost, index)
      );
      shopContainer.appendChild(button);
    }
  });
}

function evolveInShop(pokemonId, cost, index) {
  if (score >= cost) {
    const evolutionData = evolutions[pokemonId];
    const nextId = evolutionData.next;

    if (nextId) {
      // Reducir puntos
      score -= cost;
      updateScore();

      // Actualizar Pokémon en la lista activa
      activePokemon[index] = nextId;

      // Actualizar las variables de desbloqueo de cada Pokémon al evolucionar
      switch (pokemonId) {
        case 1: // Bulbasaur
          ivysaurUnlocked = true;
          break;
        case 2: // Ivysaur
          venusaurUnlocked = true;
          break;
        case 4: // Charmander
          charmeleonUnlocked = true;
          break;
        case 5: // Charmeleon
          charizardUnlocked = true;
          break;
        case 7: // Squirtle
          wartortleUnlocked = true;
          break;
        case 8: // Wartortle
          blastoiseUnlocked = true;
          break;
        default:
          break;
      }

      // Actualizar la imagen del Pokémon
      const pokemonImage = document.getElementById(`pokemon${index + 1}`);
      if (pokemonImage) {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`;
      }

      // Mostrar mensaje
      mostrarMensaje(
        `¡Has evolucionado a ${getPokemonName(nextId)}!`,
        "green",
        "white"
      );
    }

    addAttack(getPokemonName(nextId)); // Aquí se añade el ataque al menú

    // Actualizar la tienda
    updateEvolutionShop();
    checkAchievements();
  } else {
    mostrarMensaje(
      "No tienes suficientes puntos para evolucionar este Pokémon.",
      "red",
      "white"
    );
  }
}
