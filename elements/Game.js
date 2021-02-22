const { input } = require("../utils/cli");
const StartingPoint = require("./tiles/StartingPoint");
const Jail = require("./tiles/Jail");
const House = require("./tiles/House");

const playerColours = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Pink",
  "Purple",
  "Gray",
];

class Game {
  constructor(players) {
    this.players = players;
    this.jailedPlayers = [];
    this.currentTurn = 0;
    this.board = [
      // Tiles to be added or deleted (ADD MORE!)
      new StartingPoint(),
      new House("Jordans Code of 2021 no mistakes blessed brackets Avenue", 150, 0.1),
      new House("Pika Avenue", 150, 0.1),
      new House("Hulkman Avenue", 200, 0.1),
      new Jail(),
      new House("Cpt America Avenue", 300, 0.2),
      new House("Deez Avenue", 300, 0.2),
      new House("Bob Avenue", 300, 0.2)
    ];
  }

  /*
  start(): Starts the match and will call the next turn..
  */
  async start() {
    this.hasStarted = true;
    this.players.forEach((player, idx) => player.setColour(playerColours[idx]));

    console.log("\n\n\n");
    console.log("Game started! :)");
    await this.nextTurn();
  }

  /*
  end(): Ends match...
  */
  async end() {
    this.hasStarted = false;
    console.log("\n\n\n");
    console.log("Game ended!!");
    process.exit();
  }

  /*
  nextTurn(): Gets nextTurn() and show the choices, if a player is jailed it will skip
  */
  async nextTurn() {
    const player = this.players[this.currentTurn];

    console.log(
      `\nPlayer n${this.currentTurn + 1} turn. ${player.getColour()} colour`
    );

    if (this.jailedPlayers.includes(player)) {
      return this.playerJailed(player);
    }

    // Player choices
    console.log("Type 'roll' to roll two dices");
    console.log("Type 'money' to view your money");
    console.log("Type 'houses' to view your houses");
    console.log("Remember to hit enter jordan..");
    console.log("\n");

    let hasChosen = false;
    while (!hasChosen) {
      const i = await input("What is your option?");
      if (i === "roll") {
        hasChosen = true;
        await this.rollPlayer(player);
      }
      if (i === "money") {
        await this.viewPlayerMoney(player);
      }
      if (i === "houses") {
      }
    }

    // Calls nextTurn
    await this.setNextTurn();
  }

  /*
  rollPlayer(player): Player has rolled the dices
  */
  async rollPlayer(player) {
    const roll1 = Math.floor(Math.random() * 6 + 1);
    const roll2 = Math.floor(Math.random() * 6 + 1);

    console.log(`You have rolled ${roll1} and ${roll2}`);

    // Sets new poisiton for the player
    const rolledNumbers = roll1 + roll2;

    if (player.getPosition() + rolledNumbers >= this.board.length) {
      // Not a valid position (sorry).. start from the starting point.
      const newPosition =
        (player.getPosition() + rolledNumbers) % this.board.length;

      player.setPosition(newPosition);
    } else {
      // Position is valid so just set
      player.incrementPosition(rolledNumbers);
    }

    console.log(`You landed at: ${this.board[player.getPosition()].getName()}`); // works with house jail and starting point as they have getName(), this can be called using it

    // Player landed in jail?
    if (this.board[player.getPosition()] instanceof Jail) {
      // Adds the pleb to jail..
      this.jailedPlayers.push(player);
    }

    // Player landing at startingpoint so gets rewarded money
    if (this.board[player.getPosition()] instanceof StartingPoint) {
      player.setMoney(player.getMoney() + 200);
      console.log(
        `You were rewarded £200. You now have: ${player.getMoney()}`
      );
    }
  }

  /*
  viewPlayerMoney(player): Player decided to view their amount of money owned
  */
  async viewPlayerMoney(player) {
    console.log(`You have: ${player.getMoney()}`);
  }

  /*
  setNextTurn(): Checks whos turn is next
  */
  async setNextTurn() {
    this.currentTurn = this.currentTurn + 1;
    if (this.currentTurn >= this.players.length) {
      this.currentTurn = 0;
    }

    const playersWhoHaveMoney = this.players.filter(
      (player) => player.getMoney() > 0
    );

    // If only one of the players in the game have money, game is over!
    if (playersWhoHaveMoney.length === 1) {
      console.log(
        `We have a winner! Colour ${playersWhoHaveMoney[0].getColour()} has won!`
      );
      return await this.end();
    }

    await this.nextTurn();
  }

  /*
  playerJailed(player): Player is jailed. Show him the choices
  */
  async playerJailed(player) {
    console.log("You are jailed!");

    let hasChosen = false;
    while (!hasChosen) {
      const i = await input(
        "Type 'pay' to pay jail expenses (£250) or type 'roll' to roll the dices and get out of jail: "
      );

      // Player decides to pay
      if (i === "pay") {
        hasChosen = true;
        // And doesn't have enough money to do so
        if (player.getMoney() < 250) {
          console.log(
            `You do not have enough money to pay. Your money: ${player.getMoney()}. Money required to pay: £250`
          );
        } else {
          // Player has enough money to do so
          player.setMoney(player.getMoney() - 250);
          console.log(
            `You paid your dues. You now are free... You have ${player.getMoney()}£`
          );
          await this.freePlayerFromJail(player);
        }
      }

      if (i === "roll") {
        hasChosen = true;
        const roll1 = Math.floor(Math.random() * 6 + 1);
        const roll2 = Math.floor(Math.random() * 6 + 1);

        console.log(`You have rolled ${roll1} and ${roll2}`);

        if (roll1 === roll2) {
          // Both dices are the same
          console.log(`You are free to go`);
          await this.freePlayerFromJail(player);
        } else {
          // Dices aren't the same.
          console.log("Bad luck, you stay in jail!");
        }
      }
    }

    // Next turn
    return await this.setNextTurn();
  }

  /*
  freePlayerFromJail(player): Make player free from the jail
  */
  async freePlayerFromJail(player) {
    this.jailedPlayers = this.jailedPlayers.filter((p) => p !== player);
  }
}

module.exports = Game;
