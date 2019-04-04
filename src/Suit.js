class Suit {
  constructor(suitType, colour) {
    this.suitType = suitType;
    this.colour = colour;
    this.accessibleCards = [];
    this.restrictedCards = [];
  }
  // addRestrictedCards(cards) {
  //   this.restrictedCards = this.restrictedCards.concat(cards);
  // }
  // addAccessibleCard(card) {
  //   this.accessibleCards.push(card[0]);
  // }
  // addRestrictedCard(card) {
  //   this.restrictedCards.push(card);
  // }
  getRestrictedCards() {
    return this.restrictedCards;
  }
  getAccessibleCards() {
    return this.accessibleCards;
  }

  validateCard(card) {
    if (this.accessibleCards.length) {
      this.updateCards(card);
      return this.accessibleCards[0].sequenceNumber + 1 === card.sequenceNumber;
    }
    this.accessibleCards = [card];
    return 0 === card.sequenceNumber;
  }

  updateCards(card) {
    this.restrictedCards.push(this.accessibleCards[0]);
    this.accessibleCards.push(card);
  }

  dropCard(card) {
    return card.suitType === this.suitType && this.validateCard(card);
  }
}

export default Suit;
