import React from "react";
import "./App.css";
import { Stack, Deck, Piles, drop, allowDrop } from "./display";

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
        <div className="stack" id="stack">
          <Stack stack={this.game.getStack()} game={this.game} />
        </div>
        <Deck deck={this.game.getDeck()} game={this.game} />
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
