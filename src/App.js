import React from "react";
import "./App.css";

const Card = function(props) {
  const { card } = props;

  return (
    <div
      className="card"
      draggable="true"
      onDragStart={drag}
      id={card.suitType + " " + card.sequenceNumber}
      style={{ color: card.colour }}
    >
      {card.unicode}
    </div>
  );
};

const Cards = function(props) {
  const { cards } = props;
  const cardsHtml = [];
  for (let index = 0; index < cards.length; index++) {
    cardsHtml.push(<Card card={cards[index]} draggable key={index} />);
  }
  return cardsHtml;
};

const Piles = function(props) {
  const { piles } = props;
  const pilesHtml = [];
  for (let index = 0; index < piles.length; index++) {
    const pile = piles[index];
    pilesHtml.push(<Cards cards={pile.getRestrictedCards()} key={index} />);
    pilesHtml.push(
      <Cards cards={pile.getAccessibleCards()} key={"accessible" + index} />
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
  }

  renderPage() {
    return (
      <div>
        <div className="stack" id="stack">
          <Cards cards={this.game.getStack()} />
        </div>
        <div className="piles" onDrop={drop} onDragOver={allowDrop}>
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
