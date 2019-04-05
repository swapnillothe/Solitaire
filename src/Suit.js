class Suit {
  constructor(suitType, colour) {
    this.suitType = suitType;
    this.colour = colour;
    this.accessibleCards = [];
    this.restrictedCards = [];
  }

  getRestrictedCards() {
    return this.restrictedCards;
  }
  getAccessibleCards() {
    return this.accessibleCards;
  }

  validateCard(card) {
    console.log(this.accessibleCards.length);
    if (this.accessibleCards.length === 1) {
      if (this.accessibleCards[0].sequenceNumber + 1 === card.sequenceNumber) {
        this.updateCards(card);
        return true;
      }
    }
    if (0 === card.sequenceNumber) {
      this.accessibleCards = [card];
    }
    return true;
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
