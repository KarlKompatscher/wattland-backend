const firebaseAdmin = require('firebase-admin');
const db = firebaseAdmin.firestore();

// Function to create a new game
const createNewGame = async (gameId, players) => {
  const deck = shuffleDeck(createDeck());

  const gameState = {
    players: players,
    currentTurn: players[0],
    dealer: players[0],
    deck: deck,
    hands: dealCards(deck, players),
    currentRound: {
      bettingSize: 2,
      biddingPlayer: players[0],
      trumpColor: null,
      schlag: null,
      guate: null,
      stiches: { TeamA: 0, TeamB: 0 },
      roundWinner: null,
    },
  };

  await db.collection('games').doc(gameId).set(gameState);
  console.log('New game created:', gameId);
};

// Helper function to shuffle the deck
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

// Function to create a deck of cards (33 total)
const createDeck = () => {
  const colors = ['Laub', 'Herz', 'Eichel', 'Schell'];
  const ranks = ['7', '8', '9', '10', 'Unter', 'Ober', 'König', 'Ass'];
  const deck = [];

  colors.forEach((color) => {
    ranks.forEach((rank) => {
      deck.push({ color, rank });
    });
  });

  // Add the Weli card
  deck.push({ color: 'Schell', rank: 'Weli' });

  return deck;
};

// Function to deal cards to players (5 cards each)
const dealCards = (deck, players) => {
  const hands = {};
  players.forEach((player) => {
    hands[player] = deck.splice(0, 5); // Give the first 5 cards to each player
  });
  return hands;
};

module.exports = { createNewGame };
