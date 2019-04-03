class Pile {
  constructor() {
    this.accessibleCards = [];
    this.restrictedCards = [];
  }
  addRestrictedCards(cards) {
    this.restrictedCards = this.restrictedCards.concat(cards);
  }
  addAccessibleCard(card) {
    this.accessibleCards.push(card[0]);
  }
  addRestrictedCard(card) {
    this.restrictedCards.push(card);
  }
  getRestrictedCards() {
    return this.restrictedCards;
  }
  getAccessibleCards() {
    return this.accessibleCards;
  }
}

export default Pile;
