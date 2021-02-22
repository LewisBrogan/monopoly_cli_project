class House {
  constructor(name, price, penaltyFee) {
    this.name = name;
    this.price = price;
    this.penaltyFee = price * penaltyFee;
    this.boughtBy = null;
  }

  // Setters and getters for attri
  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getPenaltyPrice() {
    return this.penaltyFee;
  }

  getPenaltyPriceAsString() {
    return this.penaltyFee.toFixed(2);
  }

  getOwner() {
  }

  isHouseBoughtBy(player) {
  }

  canBeBought() {
  }

  setBoughtBy(player) {
  }

  removeBought() {
    this.boughtBy = null;
  }
}

module.exports = House;
