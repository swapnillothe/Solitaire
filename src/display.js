import React from 'react';

const drag = function(card, ev) {
  ev.dataTransfer.setData('text', ev.target.id);
  const draggingFrom = ev.target.parentNode.id;
  card.draggingFrom = draggingFrom;
  ev.dataTransfer.setData('cardDetails', JSON.stringify(card));
};

const allowDrop = function(game, ev) {
  ev.preventDefault();
};

const drop = function(app, ev) {
  const game = app.game;
  ev.preventDefault();
  const secondaryDestination = ev.target.id;
  const parentDropLocation = ev.target.parentNode.id;
  const cardDetails = ev.dataTransfer.getData('cardDetails');
  const card = JSON.parse(cardDetails);
  card.secondaryDestination = secondaryDestination;

  game.drop(card, parentDropLocation);
  if (game.hasWon()) {
    alert('You won the game');
  }
  app.updateState();
};

const Card = function(props) {
  let { card, draggable, unicode, classname } = props;
  if (!unicode) unicode = card.unicode;
  return (
    <img
      className={classname}
      draggable={draggable}
      id={card.suitType + '_' + card.sequenceNumber}
      onDragStart={drag.bind(null, card)}
      src={require('' + unicode)}
      alt={unicode}
    />
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
  const { piles, classname } = props;
  const pilesHtml = [];
  for (let index = 0; index < piles.length; index++) {
    const pile = piles[index];
    const pileHtml = [];
    pileHtml.push(
      <Cards
        cards={pile.getRestrictedCards()}
        draggable={false}
        key={index}
        unicode="./cards/back.png"
        classname={classname}
      />
    );
    pileHtml.push(
      <Cards
        cards={pile.getAccessibleCards()}
        draggable={true}
        key={'accessible' + index}
        classname={classname}
      />
    );
    pilesHtml.push(
      <div className="pile" id={'pile_' + index} key={'pile' + index}>
        {pileHtml}
      </div>
    );
  }
  return pilesHtml;
};

const Stack = function(props) {
  const { stack } = props;
  const stackHtml = [];
  if (stack.getAccessibleCards().length > 0) {
    stackHtml.push(
      <Cards
        cards={stack.getAccessibleCards()}
        draggable={true}
        key={'accessible-stack'}
        classname="card-on-stack"
      />
    );
  }
  return stackHtml;
};

const Suit = function(props) {
  const { suit } = props;
  const suitHtml = [];
  suitHtml.push(
    <Cards
      cards={suit.getAccessibleCards()}
      draggable={true}
      key={'accessible-suit'}
      classname="card-on-suit"
    />
  );
  return suitHtml;
};

const Deck = function(props) {
  const { deck, app } = props;
  const { heart, diamond, club, spade } = deck.getDeck();
  const deckHtml = [];
  deckHtml.push(
    <div className="suit" key={'heart'} id="heart" style={{ color: 'red' }}>
      ♥
      <Suit suit={heart} />
    </div>
  );

  deckHtml.push(
    <div className="suit" key={'club'} id="club">
      ♣
      <Suit suit={club} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={'diamond'} id="diamond" style={{ color: 'red' }}>
      ♦
      <Suit suit={diamond} />
    </div>
  );
  deckHtml.push(
    <div className="suit" key={'spade'} id="spade">
      ♠
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
