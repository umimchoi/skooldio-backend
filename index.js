const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
const values = [
  { name: "A", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 0 },
  { name: "Jack", value: 0 },
  { name: "Queen", value: 0 },
  { name: "King", value: 0 },
];

function shuffle(deck) {
  for (let i = 0; i < 2000; i++) {
    let location1 = Math.floor(Math.random() * deck.length);
    let location2 = Math.floor(Math.random() * deck.length);
    let tmp = deck[location1];

    deck[location1] = deck[location2];
    deck[location2] = tmp;
  }
}

function getDeck() {
  let deck = new Array();
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }

  return deck;
}

function playPokDeng(bet) {
  const deck = getDeck();
  shuffle(deck);

  console.log(`You got ${getCardName(deck[0])}, ${getCardName(deck[1])}`);
  console.log(
    `The dealer got ${getCardName(deck[2])}, ${getCardName(deck[3])}`
  );
  let playerValue = getTotalValue(deck[0], deck[1]);
  let dealerValue = getTotalValue(deck[2], deck[3]);
  if (playerValue > dealerValue) {
    console.log(`You won!!!, received ${bet} chips`);
    return bet;
  } else if (playerValue === dealerValue) {
    console.log(`Tied!!!, received 0 chips`);
    return 0;
  } else {
    console.log(`You lost!!!, lost ${bet} chips`);
    return -bet;
  }
}

function getCardName(card) {
  return `${card.Suit}-${card.Value.name}`;
}

function getTotalValue(card1, card2) {
  return (card1.Value.value + card2.Value.value) % 10;
}
exports.playPokDeng = playPokDeng;

// run when this file is being run diretly from console (node index.js)
if (require.main === module) {
  const prompt = require("prompt-sync")(); // call prompt-sync to get input from user
  let playMore = true;
  let total = 0;
  while (playMore) {
    console.log("Please put your bet");
    const bet = parseInt(prompt());
    total += playPokDeng(bet);
    console.log("Wanna play more (Yes/No)?");
    const playMoreInput = prompt("");
    playMore = playMoreInput === "Yes";
  }
  console.log(`You got total ${total} chips`);
}
