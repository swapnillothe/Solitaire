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
    pilesHtml.push(<div className="pile"> {pileHtml}</div>);
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
  const pileHtml = [];
  pileHtml.push(
    <Cards
      cards={stack.getRestrictedCards()}
      draggable={false}
      key={"restriceted-stack"}
    />
  );
  pileHtml.push(
    <Cards
      cards={stack.getAccessibleCards()}
      draggable={true}
      key={"accessible-stack"}
    />
  );
  return pileHtml;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
  }

  handleDrop(e) {
    drop(e);
  }

  renderPage() {
    console.log(this.game.getStack());
    return (
      <div>
        <div className="stack" id="stack">
          <Stack stack={this.game.getStack()} />
        </div>
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
