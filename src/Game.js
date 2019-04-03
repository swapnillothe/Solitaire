import lodash from "lodash";
import Pile from "./Pile.js";

class Game {
  constructor(deck, stack, cards) {
    this.piles = [];
    this.deck = deck;
    this.stack = stack;
    this.cards = cards;
  }

  startGame() {
    const cards = lodash.shuffle(this.cards);
    for (let index = 0; index < 7; index++) {
      const pile = new Pile();
      const restrictedCards = cards.splice(0, index);
      pile.addRestrictedCards(restrictedCards);
      pile.addAccessibleCard(cards.splice(0, 1));
      this.piles.push(pile);
    }
    this.stack.addAccessibleCard(cards.splice(0, 1));
    this.stack.addRestrictedCards(cards);
  }

  getStack() {
    return this.stack;
  }

  getPiles() {
    return this.piles;
  }
}

export default Game;
