/* eslint-disable react/react-in-jsx-scope */
import Game from "./Game.js";
import ReactDom from "react-dom";
import React from "react";
import Deck from "./Deck";
import Suit from "./Suit";
import CardStore from "./CardStore";
import Stack from "./Stack";

const deck = new Deck(
  new Suit("heart", "red"),
  new Suit("spade", "black"),
  new Suit("diamond", "red"),
  new Suit("club", "black")
);

const cards = new CardStore().getCards();
const game = new Game(deck, new Stack(), cards);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.game = props.game;
  }

  render() {
    this.game.startGame();
    return <div>Hello</div>;
  }
}

ReactDom.render(<App game={game} />, document.getElementById("root"));
