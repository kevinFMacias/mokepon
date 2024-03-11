// DOM elements
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
sectionReiniciar.style.display = "none";

// Buttons and spans
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanFotoJugador = document.getElementById("mascota-jugador");
const spanFotoEnemigo = document.getElementById("mascota-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");
const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

// Global variables
let jugadorId = null;
let enemigoId = null;
let mokepones = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionesDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let mascotaJugador;
let mascotaJugadorObjeto;
let botonAgua;
let botonTierra;
let botonFuego;
let botones = [];
let miniatura;
let miniatura2;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 350;

// Adjusting map width
if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;

// Setting map dimensions
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

// Definition of the Mokepon class
class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id; // Mokepon ID
    this.nombre = nombre; // Mokepon name
    this.foto = foto; // Image URL for the Mokepon
    this.vida = vida; // Mokepon's life points
    this.ataques = []; // Array to store Mokepon's attacks
    this.ancho = 40; // Width of the Mokepon on the map
    this.alto = 40; // Height of the Mokepon on the map
    this.x = aleatorio(0, mapa.width - this.ancho); // Random X-coordinate on the map
    this.y = aleatorio(0, mapa.height - this.alto); // Random Y-coordinate on the map
    this.mapaFoto = new Image(); // Image object for the map
    this.mapaFoto.src = fotoMapa; // URL of the map image
    this.velocidadX = 0; // X-axis velocity
    this.velocidadY = 0; // Y-axis velocity
  }

  // Method to draw the Mokepon on the map
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

// Instances of Mokepon
let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "./assets/hipodoge.png"
);
let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "./assets/capipepo.png"
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "./assets/ratigueya.png"
);

// Attacks for each Mokepon
const HIPODOGE_ATAQUES = [
  { nombre: "💦", id: "boton-agua" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" },
];

hipodoge.ataques.push(...HIPODOGE_ATAQUES);

const CAPIPEPO_ATAQUES = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💦", id: "boton-agua" },
];

capipepo.ataques.push(...CAPIPEPO_ATAQUES);

const RATIGUEYA_ATAQUES = [
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💦", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" },
];

ratigueya.ataques.push(...RATIGUEYA_ATAQUES);

// Adding Mokepons to the mokepones array
mokepones.push(hipodoge, capipepo, ratigueya);

// Function to initialize the game
function iniciarJuego() {
  // Hiding specific sections
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";

  // Creating radio buttons for each Mokepon
  mokepones.forEach((mokepon) => {
    opcionesDeMokepones = `
      <input type='radio' name='mascota' id=${mokepon.nombre} />
      <label class='tarjeta-de-mokepon' for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre} />
      </label>
      `;
    contenedorTarjetas.innerHTML += opcionesDeMokepones;

    // Getting radio button elements
    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
  });

  // Adding event listeners for buttons
  botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
  botonReiniciar.addEventListener('click', reiniciarJuego);

  // Joining the game
  unirseAlJuego();
}

// Function to join the game
function unirseAlJuego() {
  fetch('http://localhost:8080/unirse')
    .then(function (res) {
      if (res.ok) {
        res.text()
          .then(function (respuesta) {
            console.log(respuesta);
            jugadorId = respuesta;
          });
      }
    });
}

// Function to handle the selection of the player's Mokepon
function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
    miniatura = `
        <label class='combate-de-mokepon' for=${hipodoge.nombre}>
            <img src=${hipodoge.foto} alt=${hipodoge.nombre}>
            <p>${hipodoge.nombre}</p>
        </label>
        `;
    spanFotoJugador.innerHTML = miniatura;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
    miniatura = `
        <label class='combate-de-mokepon' for=${capipepo.nombre}>
            <img src=${capipepo.foto} alt=${capipepo.nombre}>
            <p>${capipepo.nombre}</p>
        </label>`;
    spanFotoJugador.innerHTML = miniatura;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
    miniatura = `
        <label class='combate-de-mokepon' for=${ratigueya.nombre}>
            <img src=${ratigueya.foto} alt=${ratigueya.nombre}>
            <p>${ratigueya.nombre}</p>
        </label>
        `;
    spanFotoJugador.innerHTML = miniatura;
  } else {
    alert("Selecciona una mascota");
    return;
  }

  // Additional logic for Mokepon selection
  seleccionarMokepon(mascotaJugador);
  extraerAtaques(mascotaJugador);
  sectionSeleccionarMascota.style.display = 'none';
  sectionVerMapa.style.display = 'flex';

  // Initializing the map
  iniciarMapa();
}


// Function to select a Mokepon for the player and send it to the server
function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

// Function to extract attacks for a selected Mokepon and display them
function extraerAtaques(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

// Function to display attacks on the UI
function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = `
        <button id=${ataque.id} class='boton-de-ataque BAtaque'>${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });

  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".BAtaque");
}

// Function to handle the player's attack sequence
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO 🔥");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💦") {
        ataqueJugador.push("AGUA 💦");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA 🌱");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }

      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    });
  });
}

// Function to send player's attacks to the server
function enviarAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}

// Function to retrieve attacks from the server
function obtenerAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ ataques }) {
            if (ataques.length === 5) {
              ataqueEnemigo = ataques;
              combate();
            }
          });
      }
    });
}

// Function to select an enemy Mokepon and display its information
function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;

  miniatura2 = `
  <label class='combate-de-mokepon' for=${mokepones.nombre}>
      <img src=${mokepones.foto} alt=${mokepones.nombre}>
      <p>${mokepones.nombre}</p>
  </label>
  `;
spanFotoEnemigo.innerHTML = miniatura2;

  secuenciaAtaque();
}

// Function to simulate a random enemy attack
function ataqueAleatorioEnemigo() {
  console.log('ataques enemigo', ataquesMokeponEnemigo);
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("FUEGO 🔥");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("AGUA 💦");
  } else {
    ataqueEnemigo.push("TIERRA 🌱");
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}

// Function to initiate the fight when both player and enemy have selected attacks
function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

// Function to get the index of attacks for both player and enemy
function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}


// Function to handle the combat between player and enemy
function combate() {
  clearInterval(intervalo);

  // Iterate through each attack round
  for (let index = 0; index < ataqueJugador.length; index++) {
    // Check if it's a draw
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
    } else if (
      // Check if player wins against enemy's attack
      ataqueJugador[index] === "FUEGO 🔥" &&
      ataqueEnemigo[index] === "TIERRA 🌱"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador + "🏆";
    } else if (
      ataqueJugador[index] === "AGUA 💦" &&
      ataqueEnemigo[index] === "FUEGO 🔥"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador + "🏆";
    } else if (
      ataqueJugador[index] === "TIERRA 🌱" &&
      ataqueEnemigo[index] === "AGUA 💦"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador + "🏆";
    } else {
      // Player loses against enemy's attack
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo + "🏆";
    }
  }

  // Check and display the final result of the game
  revisarVidas();
}

// Function to check and display the final result of the game
function revisarVidas() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("¡El juego terminó en empate! 😐");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("¡FELICITACIONES! Eres el campeón 🎉");
  } else {
    crearMensajeFinal("Oh no, perdiste la batalla 😔");
  }
}

// Function to create a message for each round of combat
function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

// Function to create a final message and display the restart section
function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "flex";
}

// Function to restart the game by reloading the page
function reiniciarJuego() {
  location.reload();
}

// Function to generate a random number within a range
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to paint the canvas with player and enemy Mokepons
function pintarCanvas() {
  // Update the position of the player's Mokepon
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  // Paint the player's Mokepon
  mascotaJugadorObjeto.pintarMokepon();

  // Send the player's position to the server
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  // Paint the enemy Mokepons
    mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();

    // Check for collisions between player and enemy Mokepons
    revisarColision(mokepon);
  });
}


// Function to send the player's position to the server and update the enemies
function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x,
      y
    }),
  })
  .then(function (res) {
    if (res.ok) {
      res.json()
        .then(function ({enemigos}) {
          console.log(enemigos);
          mokeponesEnemigos = enemigos.map(function (enemigo) {
            // Create enemy Mokepon objects based on server response
            let mokeponEnemigo = null;
            const mokeponNombre = enemigo.mokepon.nombre || '';
            if (mokeponNombre === 'Hipodoge') {
              mokeponEnemigo = new Mokepon(
                'Hipodoge',
                './assets/mokepons_mokepon_hipodoge_attack.png',
                5,
                './assets/hipodoge.png', enemigo.id
              );
            } else if (mokeponNombre === 'Capipepo') {
              mokeponEnemigo = new Mokepon(
                'Capipepo',
                './assets/mokepons_mokepon_capipepo_attack.png',
                5,
                './assets/capipepo.png', enemigo.id
              );
            } else if (mokeponNombre === 'Ratigueya') {
              mokeponEnemigo = new Mokepon(
                'Ratigueya',
                './assets/mokepons_mokepon_ratigueya_attack.png',
                5,
                './assets/ratigueya.png', enemigo.id
              );
            }

            mokeponEnemigo.x = enemigo.x;
            mokeponEnemigo.y = enemigo.y;

            return mokeponEnemigo;
          });
        });
    }
  });
}

// Movement functions for the player's Mokepon
function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

// Function to stop the movement of the player's Mokepon
function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

// Function to handle key events for player movement
function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    default:
      break;
  }
}

// Function to initialize the game map and set up event listeners
function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  console.log(mascotaJugadorObjeto, mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

// Function to retrieve the player's Mokepon object
function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

// Function to check for collisions between player and enemy Mokepons
function revisarColision(enemigo) {
  // Enemigos
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  // Jugador
  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  // Check for collision
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }

  // Handle collision
  detenerMovimiento();
  clearInterval(intervalo);
  console.log('Se detecto una colision');

  enemigoId = enemigo.id;
  sectionSeleccionarAtaque.style.display = 'flex';
  sectionVerMapa.style.display = 'none';
  seleccionarMascotaEnemigo(enemigo);
}

// Event listener for loading the game
window.addEventListener("load", iniciarJuego);
