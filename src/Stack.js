class Stack {
  constructor() {
    this.cards = [];
  }
  addCards(cards) {
    this.cards = this.cards.concat(cards);
  }
}

export default Stack;
