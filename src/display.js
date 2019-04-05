import React from "react";

const drag = function(card, ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  const draggingFrom = ev.target.parentNode.id;
  card.draggingFrom = draggingFrom;
  ev.dataTransfer.setData("cardDetails", JSON.stringify(card));
};

const allowDrop = function(game, ev) {
  ev.preventDefault();
};

const drop = function(app, ev) {
  const game = app.game;
  ev.preventDefault();
  const dropLocation = ev.target.id;
  const data = ev.dataTransfer.getData("text");
  const card = ev.dataTransfer.getData("cardDetails");
  if (game.drop(card, dropLocation)) {
    const element = document.getElementById(data);
    if (ev.target.parentNode.id === "deck") {
      element.className = "card-on-suit";
    }
  }
  app.updateState();
};

const Card = function(props) {
  let { card, draggable, unicode, classname } = props;
  if (!unicode) unicode = card.unicode;
  return (
    <div
      className={classname}
      draggable={draggable}
      onDragStart={drag.bind(null, card)}
      id={card.suitType + " " + card.sequenceNumber}
      style={{ color: card.colour }}
    >
      {unicode}
    </div>
  );
};

const Cards = function(props) {
  const { cards, draggable, unicode, classname } = props;
  const cardsHtml = [];
  for (let index = 0; index < cards.length; index++) {
    cardsHtml.push(
      <Card
        card={cards[index]}
        draggable={draggable}
        key={index}
        unicode={unicode}
        classname={classname}
      />
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
      <Cards
        cards={pile.getRestrictedCards()}
        draggable={false}
        key={index}
        unicode={"\uD83C\uDCA0"}
        classname="card"
      />
    );
    pileHtml.push(
      <Cards
        cards={pile.getAccessibleCards()}
        draggable={true}
        key={"accessible" + index}
        classname="card"
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

const Stack = function(props) {
  const { stack } = props;
  const stackHtml = [];
  stackHtml.push(
    <Cards
      cards={stack.getAccessibleCards()}
      draggable={true}
      key={"accessible-stack"}
      classname="card"
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
      classname="card"
    />
  );
  suitHtml.push(
    <Cards
      cards={suit.getRestrictedCards()}
      draggable={false}
      key={"restricted-suit"}
      classname="card"
    />
  );
  return suitHtml;
};

const Deck = function(props) {
  const { deck, app } = props;
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
      id="deck"
      onDrop={drop.bind(null, app)}
      onDragOver={allowDrop.bind(null, app.game)}
    >
      {deckHtml}
    </div>
  );
};

export { Card, Cards, Piles, Deck, Stack, drop, allowDrop };
