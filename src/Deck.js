class Deck {
  constructor(heart, spade, diamond, club) {
    this.deck = { heart, spade, diamond, club };
  }

  getDeck() {
    return this.deck;
  }

  addCard(card) {
    if (this.deck[card.suitType]) {
      return this.deck[card.suitType].addCard(card);
    }
    return false;
  }

  removeCard(card) {
    this.deck[card.suitType].removeCard(card);
  }
}

export default Deck;
