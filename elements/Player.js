class Player {
  constructor(startingMoney) {
    this.money = startingMoney;
    this.position = 0; // Tile position currently
    this.colour = null;
  }

  setColour(colour) {
    this.colour = colour;
  }

  getColour() {
    if (this.colour) {
      return this.colour;
    }
    return "Colour not assigned";
  }

  getPosition() {
    return this.position;
  }

  incrementPosition(position) {
    this.position = this.position + position;
  }

  setPosition(position) {
    this.position = position;
  }

  getMoney() {
    return this.money;
  }

  setMoney(money) {
    this.money = money;
  }
}

module.exports = Player;
