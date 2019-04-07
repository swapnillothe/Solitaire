class Suit {
  constructor(suitType, colour) {
    this.suitType = suitType;
    this.colour = colour;
    this.accessibleCards = [];
    this.restrictedCards = [];
  }

  getRestrictedCards() {
    return this.restrictedCards.reverse();
  }
  getAccessibleCards() {
    return this.accessibleCards.reverse();
  }

  canCardPlaced(card) {
    return this.accessibleCards[0].sequenceNumber + 1 === card.sequenceNumber;
  }

  isFirstCard(card) {
    return card.sequenceNumber === 1;
  }

  validateCard(card) {
    if (this.isFirstCard(card)) {
      this.accessibleCards = [card];
      return true;
    }
    if (this.canCardPlaced(card)) {
      this.updateCards(card);
      return true;
    }
  }

  updateCards(card) {
    this.restrictedCards.push(this.accessibleCards[0]);
    this.accessibleCards = [card];
  }

  dropCard(card) {
    return card.suitType === this.suitType && this.validateCard(card);
  }
}

export default Suit;
