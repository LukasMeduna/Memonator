import { useState } from "react";
import DictionaryItem from "./DictionaryItem";
import Card from "./Card";
import "./styles.css";

export default function CardSet(props: {
  cards: DictionaryItem[];
  restart: () => void;
}) {
  const [cards, setCards] = useState<DictionaryItem[]>([...props.cards]);

  function cardAnswered(correct: Boolean) {
    const shiftedCard = cards.shift();
    if (!shiftedCard) return;
    if (correct && shiftedCard.hasBeenAnsweredWrong) {
      shiftedCard.hasBeenAnsweredWrong = false;
      cards.splice(3, 0, shiftedCard);
    } else if (!correct ) {
      shiftedCard.hasBeenAnsweredWrong = true;
      cards.splice(1, 0, shiftedCard);
    }
  }

  const nextCard = () => {
    //console.log(cards);
    setCards([...cards]);
  };

  const resetCards = () => {
    setCards([...props.cards]);
  };

  if (cards.length > 0) {
    return (
      <div className="cardContainer">
        <Card
          question={cards[0].question}
          answer={cards[0].answer}
          cardAnswered={cardAnswered}
          nextCard={nextCard}
          remainingCards={cards.length}
        />
      </div>
    );
  } else {
    return (
      <div className="cardContainer">
        All cards have been answered correctly.
        <br />
        <button onClick={resetCards}>Train again</button>
        <button onClick={props.restart}>Go back</button>
      </div>
    );
  }
}
