const { input } = require("./utils/cli");
const Game = require("./elements/Game");
const Player = require("./elements/Player");

(async function main() {
  console.log("Monopoly project for UHI Applied Software Development");

  let players = null; // Amount of players
  let startingMoney = null; // Startin money per player

  // Will ask for the amount of players
  while (!players) {
    const answer = await input(
      "How many players? (2-8 currently): "
    );
    const parseInput = parseInt(answer, 10);
    if (isFinite(parseInput) && parseInput >= 2 && parseInput <= 8) {
      players = parseInput;
    } else {
      console.log("Not a valid amount..");
    }
  }

  // Ask the starting money
  while (!startingMoney) {
    const answer = await input("Starting money (min 1000): ");
    const parseInput = parseInt(answer, 10);
    if (isFinite(parseInput) && parseInput >= 10000) {
      startingMoney = parseInput;
    } else {
      console.log("Not a valid amount..");
    }
  }

  const Players = [];

  for (let i = 0; i < players; i++) {
    Players.push(new Player(startingMoney));
  }

  const Match = new Game(Players);

  console.log(
    `Match started, players: ${Players.length} and ${startingMoney} for each player`
  );

  await Match.start();

  process.exit();
})();
