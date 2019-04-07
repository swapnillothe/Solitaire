import lodash from 'lodash';
import Pile from './Pile.js';

class Game {
  constructor(deck, stack, cards) {
    this.piles = [];
    this.deck = deck;
    this.stack = stack;
    this.cards = cards;
  }

  startGame() {
    const cards = lodash.shuffle(this.cards);
    for (let index = 1; index <= 7; index++) {
      const pile = new Pile();
      const restrictedCards = cards.splice(0, index - 1);
      pile.addRestrictedCards(restrictedCards);
      pile.addAccessibleCard(cards.splice(0, 1));
      this.piles.push(pile);
    }
    this.stack.addAccessibleCards(cards);
  }

  getStack() {
    return this.stack;
  }

  getPiles() {
    return this.piles;
  }

  getDeck() {
    return this.deck;
  }

  moveCardBetweenPile(card, dragLocation, parentDropLocation) {
    const pileNumber = parentDropLocation.split('_')[1];
    if (pileNumber && this.piles[pileNumber].isAbleToDrop(card)) {
      if (this.piles[dragLocation]) {
        this.piles[dragLocation].moveCardToDeck();
      }
      if (parentDropLocation === 'deck' || card.draggingFrom === 'open-card') {
        this.stack.updateStack(card);
      }
      return true;
    }
    return false;
  }

  drop(cardDetails, dropLocation, parentDropLocation) {
    const card = JSON.parse(cardDetails);
    const dragLocation = card.draggingFrom.split('_')[1];
    if (this.deck.isAbleToDrop(card, dropLocation)) {
      if (this.piles[dragLocation]) {
        this.piles[dragLocation].moveCardToDeck();
      }
      if (parentDropLocation === 'deck') {
        this.stack.updateStack(card);
      }
      return true;
    }
    return this.moveCardBetweenPile(card, dragLocation, parentDropLocation);
  }
}

export default Game;
