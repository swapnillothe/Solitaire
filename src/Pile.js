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

  isAbleToDrop(card) {
    if (
      this.accessibleCards[0].sequenceNumber - 1 === card.sequenceNumber &&
      this.accessibleCards[0].colour !== card.colour
    ) {
      this.restrictedCards = this.restrictedCards.concat(this.accessibleCards);
      this.accessibleCards = [card];
      return true;
    }
    return false;
  }
}

export default Pile;
