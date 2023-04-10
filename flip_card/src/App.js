import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import Lottie from "lottie-react";
import memoryanimation from "./cardmemory.json";

const tiles = [
  { src: "/img/dolphin.png", matched: false },
  { src: "/img/elephant.png", matched: false },
  { src: "/img/panda.png", matched: false },
  { src: "/img/dog.png", matched: false },
  { src: "/img/racoon.png", matched: false },
];

function App() {
  
  const [cards, setCards] = useState([]);
  function getCards() {
  //  let res = [];
  //  const temp = (localStorage.getItem("cards_game_state"));
    try {
   //   res = JSON.parse(temp);
    } catch (e) {
  //    return [];
    }
   // return res;
}


  const [turns, setTurns] = useState(getTurns());
  function getTurns() {
    let tries = 0;
    const temp = localStorage.getItem("number_of_tries");
    try {
      tries = parseInt(JSON.parse(temp));
    } catch (e) {
      return 0;
    }
    return tries;
  }

  const [choice1, setChoiceOne] = useState(null);
  const [choice2, setChoiceTwo] = useState(null);
  const [locked, setLocked] = useState(false);

  //shuffle cards
  const shuffle_tiles = () => {
   
const arr = JSON.parse(localStorage.getItem("cards_game_state"));
  console.log( ">>>__>>" + arr);
    const grid = [...arr];//
   
    const tries = parseInt( JSON.parse(localStorage.getItem("number_of_tries")));

    const _first = JSON.parse(localStorage.getItem("first_choice"));

    const _second = JSON.parse(localStorage.getItem("second_choice"));

    setChoiceOne(_first);
    setChoiceTwo(_second);
    setCards(grid);
    setTurns(tries);



    // const shuffled = cards;
   // return [];// setCards(k);
  };

  const reset_tiles = () => {
    const shuffled = [...tiles, ...tiles]
      .sort(() => Math.random() - 0.5)
      .map(tile => ({ ...tile, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
  };

  const handleChoice = card => {
    if (choice1) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  // Start the game automatically

  useEffect(
    () => {
      shuffle_tiles();
    },
    []
  );

  // Save Game State to local storage

  useEffect(
    () => {

      window.localStorage.setItem("cards_game_state", JSON.stringify(cards));
      window.localStorage.setItem("number_of_tries", JSON.stringify(turns));
      window.localStorage.setItem("first_choice", JSON.stringify(choice1));
      window.localStorage.setItem("second_choice", JSON.stringify(choice2));
      //  setChoiceOne(null);
    },
    [turns, choice1, choice2, cards]
  );

  //Check for matching cards

  useEffect(
    () => {
      if (choice1 && choice2) {
        setLocked(true);
        if (choice1.src === choice2.src) {
          setCards(prevTurns => {
            return prevTurns.map(card => {
              if (card.src === choice1.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });

          setTimeout(() => resetTurn(), 1200);
        } else {
          setTimeout(() => resetTurn(), 1200);
        }
      }
    },
    [choice1, choice2]
  );

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setLocked(false);

    if (turns >= 20) {
      reset_tiles();
    }
  };

  return (
    <div className="App">
      <div className="c_animation">
        <Lottie animationData={memoryanimation} />
        <span>
          Tries : {turns} /15
        </span>
      </div>

      <button onClick={reset_tiles}>New Game</button>

      <div className="card_grid">
        {cards.map(card =>
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
            locked={locked}
          />
        )}
      </div>

      <p>
        CardFlip is a timed card memory game. Click the cards to see what
        symbol they uncover and try to find the matching symbol underneath the
        other cards. Uncover two matching symbols at once to eliminate them from
        the game. Eliminate all cards as fast as you can to win the game
      </p>
    </div>
  );
}

export default App;
