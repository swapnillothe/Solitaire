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

  updateStack(cardToBeRemove) {
    for (let index = 0; index < this.accessibleCards.length; index++) {
      const element = this.accessibleCards[index];
      if (
        element.suitType === cardToBeRemove.suitType &&
        element.sequenceNumber === cardToBeRemove.sequenceNumber
      ) {
        this.accessibleCards.splice(index, 1);
      }
    }
  }
}

export default Stack;
