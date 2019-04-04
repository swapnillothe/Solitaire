class Suit {
  constructor(suitType, colour) {
    this.suitType = suitType;
    this.colour = colour;
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

  validateCard(card) {
    if (this.getAccessibleCards.length) {
      return this.accessibleCards[0].sequenceNumber + 1 === card.sequenceNumber;
    }
    return 0 === card.sequenceNumber;
  }

  dropCard(card) {
    if (card.suitType === this.suitType && this.validateCard(card)) {
      return true;
    }
  }
}

export default Suit;
