import Card from "./Card";

class CardStore {
  constructor() {
    this.CardStore = [];
    // this.unicodes = {
    //   spade: ["🂡", "🂢", "🂣", "🂤", "🂥", "🂦", "🂧", "🃈", "🂩", "🂪", "🂫", "🂭", "🂮"],
    //   heart: ["🂱", "🂲", "🂳", "🂴", "🂵", "🂶", "🂷", "🂸", "🂹", "🂺", "🂻", "🂽", "🂾"],
    //   diamond: [
    //     "🃁",
    //     "🃂",
    //     "🃃",
    //     "🃄",
    //     "🃅",
    //     "🃆",
    //     "🃇",
    //     "🃈",
    //     "🃉",
    //     "🃊",
    //     "🃋",
    //     "🃍",
    //     "🃎"
    //   ],
    //   club: ["🃑", "🃒", "🃓", "🃔", "🃕", "🃖", "🃗", "🃘", "🃙", "🃚", "🃛", "🃝", "🂮"]
    // };
    this.unicodes = {
      BACK: ["\uD83C\uDCA0"],
      spade: [
        "\u{1F0A1}",
        "\u{1F0A2}",
        "\u{1F0A3}",
        "\u{1F0A4}",
        "\u{1F0A5}",
        "\u{1F0A6}",
        "\u{1F0A7}",
        "\u{1F0A8}",
        "\u{1F0A9}",
        "\u{1F0AA}",
        "\u{1F0AB}",
        "\u{1F0AD}",
        "\u{1F0AE}"
      ],
      heart: [
        "\u{1F0B1}",
        "\u{1F0B2}",
        "\u{1F0B3}",
        "\u{1F0B4}",
        "\u{1F0B5}",
        "\u{1F0B6}",
        "\u{1F0B7}",
        "\u{1F0B8}",
        "\u{1F0B9}",
        "\u{1F0BA}",
        "\u{1F0BB}",
        "\u{1F0BD}",
        "\u{1F0BE}"
      ],
      diamond: [
        "\u{1F0C1}",
        "\u{1F0C2}",
        "\u{1F0C3}",
        "\u{1F0C4}",
        "\u{1F0C5}",
        "\u{1F0C6}",
        "\u{1F0C7}",
        "\u{1F0C8}",
        "\u{1F0C9}",
        "\u{1F0CA}",
        "\u{1F0CB}",
        "\u{1F0CD}",
        "\u{1F0CE}"
      ],
      club: [
        "\u{1F0D1}",
        "\u{1F0D2}",
        "\u{1F0D3}",
        "\u{1F0D4}",
        "\u{1F0D5}",
        "\u{1F0D6}",
        "\u{1F0D7}",
        "\u{1F0D8}",
        "\u{1F0D9}",
        "\u{1F0DA}",
        "\u{1F0DB}",
        "\u{1F0DD}",
        "\u{1F0DE}"
      ]
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
