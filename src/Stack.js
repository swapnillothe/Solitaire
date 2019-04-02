class Stack {
  constructor() {
    this.cards = [];
  }
  addCards(cards) {
    this.cards = this.cards.concat(cards);
  }
  getCards() {
    return this.cards;
  }
}

export default Stack;
