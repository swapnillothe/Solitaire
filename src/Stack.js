class Stack {
  constructor() {
    this.accessibleCards = [];
  }

  addAccessibleCards(cards) {
    this.accessibleCards = cards;
  }

  getAccessibleCards() {
    return this.accessibleCards;
  }
}

export default Stack;
