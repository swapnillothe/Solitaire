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

  getRestrictedCards() {
    return this.restrictedCards;
  }
  getAccessibleCards() {
    return this.accessibleCards;
  }

  removeCard() {
    this.accessibleCards.pop();
    if (this.restrictedCards.length > 0) {
      this.accessibleCards.push(this.restrictedCards.pop());
    }
    return true;
  }

  isKing(card) {
    return card.sequenceNumber === 13 && this.accessibleCards.length === 0;
  }

  canCardPlaced(card) {
    const length = this.accessibleCards.length - 1;
    return (
      this.accessibleCards[length].sequenceNumber - 1 === card.sequenceNumber &&
      this.accessibleCards[length].colour !== card.colour
    );
  }

  addCard(card) {
    if (this.isKing(card) || this.canCardPlaced(card)) {
      return this.accessibleCards.push(card);
    }
  }
}

export default Pile;
