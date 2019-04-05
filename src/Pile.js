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

  moveCardToStack() {
    if (this.accessibleCards.length === 0) {
      this.accessibleCards.pop();
      this.accessibleCards(this.restrictedCards.pop());
    }
  }

  updateCards() {
    if (this.accessibleCards.length === 0) {
      this.accessibleCards.push(this.restrictedCards.pop());
    }
  }

  isAbleToDrop(card) {
    if (
      this.accessibleCards[this.accessibleCards.length - 1].sequenceNumber -
        1 ===
        card.sequenceNumber &&
      this.accessibleCards[this.accessibleCards.length - 1].colour !==
        card.colour
    ) {
      this.restrictedCards = this.restrictedCards.concat(this.accessibleCards);
      this.accessibleCards.push(card);
      return true;
    }
    return false;
  }
}

export default Pile;
