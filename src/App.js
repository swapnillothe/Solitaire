import React from "react";
import "./App.css";

const Card = function(props) {
  const { card, draggable } = props;
  return (
    <div
      className="card"
      draggable={draggable}
      onDragStart={drag}
      id={card.suitType + " " + card.sequenceNumber}
      style={{ color: card.colour }}
    >
      {card.unicode}
    </div>
  );
};

const Cards = function(props) {
  const { cards, draggable } = props;
  const cardsHtml = [];
  for (let index = 0; index < cards.length; index++) {
    cardsHtml.push(
      <Card card={cards[index]} draggable={draggable} key={index} />
    );
  }
  return cardsHtml;
};

const Piles = function(props) {
  const { piles } = props;
  const pilesHtml = [];
  for (let index = 0; index < piles.length; index++) {
    const pile = piles[index];
    const pileHtml = [];
    pileHtml.push(
      <Cards cards={pile.getRestrictedCards()} draggable={false} key={index} />
    );
    pileHtml.push(
      <Cards
        cards={pile.getAccessibleCards()}
        draggable={true}
        key={"accessible" + index}
      />
    );
    pilesHtml.push(
      <div className="pile" key={"pile" + index}>
        {pileHtml}
      </div>
    );
  }
  return pilesHtml;
};

const allowDrop = function(ev) {
  ev.preventDefault();
};

const drag = function(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
};

const drop = function(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
};

const Stack = function(props) {
  const { stack } = props;
  const stackHtml = [];
  stackHtml.push(
    <Cards
      cards={stack.getRestrictedCards()}
      draggable={false}
      key={"restriceted-stack"}
    />
  );
  stackHtml.push(
    <Cards
      cards={stack.getAccessibleCards()}
      draggable={true}
      key={"accessible-stack"}
    />
  );
  return stackHtml;
};

const Suit = function(props) {
  const { suit } = props;
  const suitHtml = [];
  suitHtml.push(
    <Cards cards={suit.getAccessibleCards()} key={"accessible-suit"} />
  );
  suitHtml.push(
    <Cards cards={suit.getRestrictedCards()} key={"restricted-suit"} />
  );
  return suitHtml;
};

const Deck = function(props) {
  const { deck } = props;
  const { heart, diamond, club, spade } = deck.getDeck();
  const deckHtml = [];
  deckHtml.push(
    <div className="suit" key={"heart"}>
      <Suit suit={heart} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={"diamond"}>
      <Suit suit={diamond} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={"club"}>
      <Suit suit={club} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={"spade"}>
      <Suit suit={spade} />
    </div>
  );
  return (
    <div className="deck" onDrop={drop} onDragOver={allowDrop}>
      {deckHtml}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
  }

  handleDrop(e) {
    drop(e);
    console.log(e.target.id);
  }

  renderPage() {
    return (
      <div>
        <section className="top-section">
          <div className="stack" id="stack">
            <Stack stack={this.game.getStack()} />
          </div>
          <div className="deck" id="deck">
            <Deck deck={this.game.getDeck()} />
          </div>
        </section>
        <div className="piles" onDrop={this.handleDrop} onDragOver={allowDrop}>
          <Piles piles={this.game.getPiles()} />
        </div>
      </div>
    );
  }

  render() {
    this.game.startGame();
    return this.renderPage();
  }
}

export default App;
