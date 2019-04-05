import React from "react";
import "./App.css";

const Card = function(props) {
  const { card, draggable } = props;
  return (
    <div
      className="card"
      draggable={draggable}
      onDragStart={drag.bind(null, card)}
      id={card.suitType + " " + card.sequenceNumber}
      style={{ color: card.colour }}
      // card={card}
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
      <div className="pile" id={"pile " + index} key={"pile" + index}>
        {pileHtml}
      </div>
    );
  }
  return pilesHtml;
};

const allowDrop = function(game, ev) {
  ev.preventDefault();
};

const drag = function(card, ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  const draggingFrom = ev.target.parentNode.id;
  card.draggingFrom = draggingFrom;
  ev.dataTransfer.setData("cardDetails", JSON.stringify(card));
};

const drop = function(game, ev) {
  ev.preventDefault();
  const dropLocation = ev.target.id;
  const data = ev.dataTransfer.getData("text");
  const card = ev.dataTransfer.getData("cardDetails");
  if (game.drop(card, dropLocation)) {
    ev.target.appendChild(document.getElementById(data));
  }
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
    <Cards
      cards={suit.getAccessibleCards()}
      draggable={true}
      key={"accessible-suit"}
    />
  );
  suitHtml.push(
    <Cards
      cards={suit.getRestrictedCards()}
      draggable={false}
      key={"restricted-suit"}
    />
  );
  return suitHtml;
};

const Deck = function(props) {
  const { deck, game } = props;
  const { heart, diamond, club, spade } = deck.getDeck();
  const deckHtml = [];
  deckHtml.push(
    <div className="suit" key={"heart"} id="heart">
      heart
      <Suit suit={heart} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={"diamond"} id="diamond">
      diamond
      <Suit suit={diamond} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={"club"} id="club">
      club
      <Suit suit={club} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={"spade"} id="spade">
      spade
      <Suit suit={spade} />
    </div>
  );
  return (
    <div
      className="deck"
      onDrop={drop.bind(null, game)}
      onDragOver={allowDrop.bind(null, game)}
    >
      {deckHtml}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
    this.state = {
      piles: this.game.piles,
      stack: this.game.stack,
      deck: this.game.deck
    };
  }

  handleDrop(e) {
    drop(this.game, e);
    this.setState(state => {
      state.piles = this.game.piles;
      state.stack = this.game.stack;
      state.deck = this.game.deck;
    });
  }

  renderPage() {
    return (
      <div>
        <section className="top-section">
          <div className="stack" id="stack">
            <Stack stack={this.game.getStack()} game={this.game} />
          </div>
          <Deck deck={this.game.getDeck()} game={this.game} />
        </section>
        <div
          className="piles"
          onDrop={this.handleDrop.bind(this)}
          onDragOver={allowDrop.bind(null, this.game)}
        >
          <Piles piles={this.game.getPiles()} game={this.game} />
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
