class Deck {
  constructor(heart, spade, diamond, club) {
    this.deck = { heart, spade, diamond, club };
  }
  addCard(card, cardSuit) {
    this.deck[cardSuit].addCard(card);
  }
  getDeck() {
    return this.deck;
  }
}

export default Deck;
