import Card from "./Card";

class CardStore {
  constructor() {
    this.CardStore = [];
  }

  createCard(suitType, colour, element, index) {
    return new Card(suitType, colour, index);
  }

  getCards() {
    const heartCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(null, "heart", "red"));
    const diamondCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(null, "diamond", "red"));
    const spadeCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(null, "spade", "black"));
    const clubCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(null, "club", "black"));
    return heartCards.concat(spadeCards, clubCards, diamondCards);
  }
}

export default CardStore;
