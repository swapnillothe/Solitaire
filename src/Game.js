import lodash from 'lodash';
import Pile from './Pile.js';

class Game {
  constructor(deck, stack, cards) {
    this.piles = [];
    this.deck = deck;
    this.stack = stack;
    this.cards = cards;
    this.suits = ['diamond', 'heart', 'spade', 'club'];
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

  drop(card, destination) {
    const source = card.draggingFrom;
    if (source === 'open-card' && destination.includes('pile')) {
      const pileNumber = destination.split('_')[1];
      return (
        this.piles[pileNumber].addCard(card) && this.stack.removeCard(card)
      );
    }

    if (source.includes('pile') && card.sequenceNumber === 13) {
      const sourcePileNumber = card.draggingFrom.split('_')[1];
      const destinationPileNumber = card.secondaryDestination.split('_')[1];
      if (this.piles[sourcePileNumber].isCardInBetween(card)) {
        let cardsToMove = this.piles[sourcePileNumber].getCardsToMove(card);
        return this.piles[destinationPileNumber].addAccessibleCards(
          cardsToMove
        );
      }
      return (
        this.piles[destinationPileNumber].addCard(card) &&
        this.piles[sourcePileNumber].removeCard(card)
      );
    }

    if (source === 'open-card' && destination === 'deck') {
      return this.deck.addCard(card) && this.stack.removeCard(card);
    }

    if (source.includes('pile') && destination === 'deck') {
      const pileNumber = card.draggingFrom.split('_')[1];
      const condition = this.deck.addCard(card);
      return condition && this.piles[pileNumber].removeCard(card);
    }

    if (source.includes('pile') && destination.includes('pile')) {
      const sourcePileNumber = card.draggingFrom.split('_')[1];
      const destinationPileNumber = destination.split('_')[1];
      if (this.piles[sourcePileNumber].isCardInBetween(card)) {
        let cardsToMove = this.piles[sourcePileNumber].getCardsToMove(card);
        return this.piles[destinationPileNumber].addAccessibleCards(
          cardsToMove
        );
      }
      return (
        this.piles[sourcePileNumber].removeCard(card) &&
        this.piles[destinationPileNumber].addCard(card)
      );
    }

    if (this.suits.includes(source) && destination.includes('pile')) {
      const pileNumber = destination.split('_')[1];
      return this.deck.removeCard(card) && this.piles[pileNumber].addCard(card);
    }

    if (
      card.secondaryDestination.includes('pile') &&
      card.sequenceNumber === 13
    ) {
      const pileNumber = card.secondaryDestination.split('_')[1];
      return (
        this.piles[pileNumber].addCard(card) && this.stack.removeCard(card)
      );
    }
  }

  hasWon() {
    return this.deck.hasWon();
  }
}

export default Game;
