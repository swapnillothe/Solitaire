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

  moveCardToDeck() {
    this.accessibleCards.pop();
    if (this.restrictedCards.length > 0) {
      this.accessibleCards.push(this.restrictedCards.pop());
    }
    return;
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

  isAbleToDrop(card) {
    if (!this.isKing(card) && !this.canCardPlaced(card)) return false;
    this.accessibleCards.push(card);
    return true;
  }
}

export default Pile;
