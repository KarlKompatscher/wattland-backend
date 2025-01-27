const express = require('express');
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');
const path = require('path');
const { createNewGame } = require('./gameLogic');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('../wattland-f4776-firebase-adminsdk-fbsvc-2023737c5c.json');
if (!firebaseAdmin.apps.length) {
    console.log('Initializing Firebase app...');
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
    });
} else {
    console.log('Using existing Firebase app...');
    firebaseAdmin.app(); // If already initialized, reuse the existing instance
}

const db = firebaseAdmin.firestore();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());  // Allow all origins (for development purposes)
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