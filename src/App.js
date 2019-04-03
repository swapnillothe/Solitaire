import React from "react";
import "./App.css";

const Card = function(props) {
  const { card } = props;

  return (
    <div
      className="card"
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrag(e) {
    console.log(e.target.id);
  }

  handleDrop(event) {
    var data = event.dataTransfer.getData("text/plain");
    event.target.textContent = data;
    event.preventDefault();
    console.log(data);
  }

  renderPage() {
    return (
      <div>
        <div className="stack">
          <Cards cards={this.game.getStack()} />
        </div>
        <div className="piles">
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
