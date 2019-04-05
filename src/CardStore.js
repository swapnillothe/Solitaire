import Card from "./Card";

class CardStore {
  constructor() {
    this.CardStore = [];
    this.unicodes = {
      spade: ["🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🃈", "🂩", "🂪", "🂫", "🂭", "🂮"],
      heart: ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾"],
      diamond: [
        "🃁",
        "🃂",
        "🃃",
        "🃄",
        "🃅",
        "🃆",
        "🃇",
        "🃈",
        "🃉",
        "🃊",
        "🃋",
        "🃍",
        "🃎"
      ],
      club: ["🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🂮"]
    };
  }

  createCard(suitType, colour, element, index) {
    const unicode = this.unicodes[suitType][index];
    return new Card(suitType, colour, index, unicode);
  }

  getCards() {
    const heartCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(this, "heart", "red"));
    const diamondCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(this, "diamond", "red"));
    const spadeCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(this, "spade", "black"));
    const clubCards = new Array(13)
      .fill("")
      .map(this.createCard.bind(this, "club", "black"));
    return heartCards.concat(spadeCards, clubCards, diamondCards);
  }
}

export default CardStore;
