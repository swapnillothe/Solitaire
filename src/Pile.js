class Pile {
  constructor() {
    this.accessibleCards = [];
    this.restrictedCards = [];
  }
  addRestrictedCards(cards) {
    this.restrictedCards = this.restrictedCards.concat(cards);
  }
  addAccessibleCard(card) {
    this.accessibleCards.push(card);
  }
  addRestrictedCard(card) {
    this.restrictedCards.push(card);
  }
}

export default Pile;
