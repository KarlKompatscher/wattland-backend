const express = require('express');
const firebaseAdmin = require('firebase-admin');
const { createNewGame } = require('./gameLogic');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('..wattland-f4776-firebase-adminsdk-fbsvc-2023737c5c.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const db = firebaseAdmin.firestore();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Define basic routes for the API
app.get('/', (req, res) => {
  res.send('Wattland Game API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Start a new game (API endpoint)
app.post('/start-game', async (req, res) => {
    const { gameId, players } = req.body;
    try {
      await createNewGame(gameId, players);
      res.status(200).send(`Game ${gameId} started successfully!`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error starting the game.');
    }
  });