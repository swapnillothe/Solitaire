class Stack {
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
  addAccessibleCards(cards) {
    this.accessibleCards = this.accessibleCards.concat(cards);
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

export default Stack;
