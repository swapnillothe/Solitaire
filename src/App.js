import React from "react";
import "./App.css";

const Card = function(props) {
  const { card } = props;
  console.log(card.unicode);

  return (
    <div className="card">
      {card.unicode}
      {/* <div>{card.colour}</div>
      <div>{card.sequenceNumber}</div>
      <div>{card.suitType}</div> */}
    </div>
  );
};

const Cards = function(props) {
  const { cards } = props;
  const cardsHtml = [];
  for (let index = 0; index < cards.length; index++) {
    cardsHtml.push(<Card card={cards[index]} key={index} />);
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
