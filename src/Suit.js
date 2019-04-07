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

  dropValidCard(card) {
    if (this.isFirstCard(card)) return (this.accessibleCards = [card]);
    if (this.canCardPlaced(card)) return this.updateCards(card);
  }

  updateCards(card) {
    this.restrictedCards.push(this.accessibleCards[0]);
    this.accessibleCards = [card];
  }

  isOfsameSuit(card) {
    return this.suitType === card.suitType;
  }

  dropCard(card) {
    if (this.isOfsameSuit(card)) return this.dropValidCard(card);
  }
}

export default Suit;
