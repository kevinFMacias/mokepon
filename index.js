const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS support
app.use(cors());

// Enable JSON parsing for incoming requests
app.use(express.json());

// Array to store player objects
const jugadores = [];

// Class representing a player
class Jugador {
  constructor(id) {
    this.id = id;
  }

  // Assign a Mokepon to the player
  asignarMokepon(mokepon) {
    this.mokepon = mokepon;
  }

  // Update the player's position
  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }

  // Assign attacks to the player
  asignarAtaques(ataques) {
    this.ataques = ataques;
  }
}

// Class representing a Mokepon
class Mokepon {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

// Endpoint for players to join the game
app.get('/unirse', (req, res) => {
  const id = `${Math.random()}`;
  const jugador = new Jugador(id);
  jugadores.push(jugador);

  // Enable CORS for the response
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Return the player's unique identifier (id)
  res.send(id);
});

// Endpoint to create a Mokepon for a player
app.post('/mokepon/:jugadorId', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const nombre = req.body.mokepon || '';
  const mokepon = new Mokepon(nombre);

  // Find the player by their identifier
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

  // If the player exists, assign the Mokepon to them
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMokepon(mokepon);
  }

  // Log information for debugging
  console.log(jugadores);
  console.log(jugadorId);

  // Respond to the request
  res.end();
});

// Endpoint to update a player's position and get information about enemies
app.post('/mokepon/:jugadorId/posicion', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  // Find the player by their identifier
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

  // If the player exists, update their position
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }

  // Get information about enemies (other players)
  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

  // Respond with information about enemies
  res.send({
    enemigos,
  });
});

// Endpoint to assign attacks to a player
app.post('/mokepon/:jugadorId/ataques', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const ataques = req.body.ataques || [];

  // Find the player by their identifier
  const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id);

  // If the player exists, assign attacks to them
  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarAtaques(ataques);
  }

  // Respond to the request
  res.end();
});

// Endpoint to retrieve information about attacks assigned to a player
app.get('/mokepon/:jugadorId/ataques', (req, res) => {
  const jugadorId = req.params.jugadorId || '';
  const jugador = jugadores.find((jugador) => jugador.id === jugadorId);

  // Respond with information about the player's attacks
  res.send({
    ataques: jugador.ataques || [],
  });
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log('Servidor funcionando');
});
