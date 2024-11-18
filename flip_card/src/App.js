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
  { src: "/img/racoon.png", matched: false }
];

function App() {
  const MAX_TURNS = 20;

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoiceOne] = useState(null);
  const [choice2, setChoiceTwo] = useState(null);
  const [locked, setLocked] = useState(false);

  const show_tiles = () => {
    const arr = TryJson(localStorage.getItem("cards_game_state")) || [];
    const tries = TryJson(localStorage.getItem("number_of_tries")) || 0;

    setCards(arr);
    setTurns(tries);
  };

  const reset_tiles = () => {
    const shuffled = [...tiles, ...tiles]
      .sort(() => Math.random() - 0.5)
      .map(tile => ({ ...tile, id: Math.random() }));

    setCards(shuffled);
    setTurns(0);

    localStorage.removeItem("cards_game_state");
    localStorage.removeItem("number_of_tries");

    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = card => {
    if (!locked && choice1 !== card) {
      choice1 ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    show_tiles();
  }, []);

  useEffect(
    () => {
      localStorage.setItem("cards_game_state", JSON.stringify(cards));
      localStorage.setItem("number_of_tries", JSON.stringify(turns));

      if (choice1 && choice2) {
        setLocked(true);
        if (choice1.src === choice2.src) {
          setCards(prevCards =>
            prevCards.map(
              card =>
                card.src === choice1.src ? { ...card, matched: true } : card
            )
          );
        }
        setTimeout(resetTurn, 1200);
      }

      // Check for game completion
      if (cards.length && cards.every(card => card.matched)) {
        alert("Congratulations! You've matched all the cards!");
        reset_tiles();
      }

      // Reset turn after checking for a match
      const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + (locked ? 1 : 0));
        setLocked(false);

        if (turns + (locked ? 1 : 0) >= MAX_TURNS) reset_tiles();
      };

      // Save game state to localStorage
    },
    [choice1, choice2, cards]
  );

  return (
    <div className="App">
      <div className="c_animation">
        <span>
          Tries: {turns}/{MAX_TURNS}
        </span>
      </div>
      <button className="button" onClick={reset_tiles}>
        New Game
      </button>
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
        CardFlip is a timed card memory game. Click the cards to see what symbol
        they uncover and try to find the matching symbol underneath the other
        cards. Uncover two matching symbols at once to eliminate them from the
        game. Eliminate all cards as fast as you can to win the game.
      </p>
    </div>
  );
}

export default App;
