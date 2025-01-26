const express = require('express');
const firebaseAdmin = require('firebase-admin');
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
