import React from "react";
export default function Card(props: {
  question: string;
  answer: string;
  cardAnswered: (correct: Boolean) => void;
  nextCard: () => void;
  remainingCards: number;
}) {
  //const [points,setPoints] = useState(props.points);
  let answered: Boolean = false;

  const checkInput = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const drillCardElement = document.querySelector(
      "#drillCard"
    ) as HTMLInputElement;
    const userInputElement = document.querySelector(
      "#userInput"
    ) as HTMLInputElement;
    if (answered) {
      drillCardElement.classList.remove("flip");
      drillCardElement.classList.remove("wrong");
      userInputElement.value = "";
      props.nextCard();
      return true;
    }
    drillCardElement.classList.add("flip");
    let userInput = userInputElement.value.trim();
    const correct =
      userInput.toLowerCase() === props.answer.trim().toLowerCase();
    if (!correct) {
      drillCardElement.classList.add("wrong");
    }

    userInputElement.value = "";
    props.cardAnswered(correct);
    answered = true;
  };

  return (
    <div id="drillCard">
      <div className="drillCardInner">
        <div className="drillCardFront">
          <div id="cardsInfo">Remains: {props.remainingCards}</div>
          <div id="questionText">{props.question}</div>
          <form onSubmit={checkInput} autoComplete="off">
            <input id="userInput" type="text" autoFocus />
            {/*<button type="submit">odpovědět</button>*/}
          </form>
        </div>
        <div className="drillCardBack">
          <div className="cardBackOverlay"></div>
          <small>Question: </small>
          {props.question} <br />
          <small>Correct answer: </small>
          {props.answer}
          <div>
            <button onClick={checkInput}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
