import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Stack, Deck, Piles, drop, allowDrop, Cards, Card } from "./display";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
    this.state = {
      piles: this.game.piles,
      stack: this.game.stack,
      deck: this.game.deck,
      openCards: []
    };
  }

  handleDrop(e) {
    drop(this.game, e);
    this.setState(state => {
      state.piles = this.game.piles;
      state.stack = this.game.stack;
      state.deck = this.game.deck;
      state.openCards = this.game.getStack().getDrawnCards();
    });
  }

  getCard() {
    this.state.openCards = this.game.getStack().getDrawnCards();
    let cards = (
      <Cards
        cards={this.state.openCards}
        hello={"hello"}
        draggable={true}
        classname="card-on-stack"
      />
    );
    ReactDOM.render(cards, document.getElementById("open-card"));
  }

  renderPage() {
    return (
      <div>
        <section className="top-section">
          <div className="stack" id="stack">
            <div className="clickable-div" onClick={this.getCard.bind(this)}>
              <Card
                card={{ colour: " black" }}
                unicode={"\uD83C\uDCA0"}
                draggable={false}
                classname="card"
              />
            </div>
            <div id="open-card" className="open-card">
              <Cards
                cards={this.state.openCards}
                hello={"hello"}
                draggable={true}
                classname="card-on-stack"
              />
            </div>
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
