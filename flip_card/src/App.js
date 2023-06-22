import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import Lottie from "lottie-react";
import memoryanimation from "./cardmemory.json";

const tiles = [
  {
    src: "/img/dolphin.png",
    matched: false
  },
  {
    src: "/img/elephant.png",
    matched: false
  },
  {
    src: "/img/panda.png",
    matched: false
  },
  {
    src: "/img/dog.png",
    matched: false
  },
  {
    src: "/img/racoon.png",
    matched: false
  }
];

function App() {
  function TryJson(json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choice1, setChoiceOne] = useState(null);
  const [choice2, setChoiceTwo] = useState(null);
  const [locked, setLocked] = useState(false);

  /*  
  Show cards::If the is already variables stored in Localstorage use it else a new game is started 
     
  */

  const show_tiles = () => {
    const arr = TryJson(localStorage.getItem("cards_game_state"));
    let grid = [];
    if (arr) {
      grid = [...arr];
    }
    const tries = TryJson(JSON.parse(localStorage.getItem("number_of_tries")));
    // const _first = TryJson(localStorage.getItem("first_choice"));
    //const _second = TryJson(localStorage.getItem("second_choice"));

    setCards(grid == null ? [] : grid);
    setTurns(tries == null ? 0 : tries);
  };
  /* 
    Reset the tiles/cards if tries >= 15, players chooses to, or when Browser's localstorage is corrupted/empty 
    The function spreads the tiles, sorts, randomises the order and assigns random ids (float) 
 */
  const reset_tiles = () => {
    const shuffled = [...tiles, ...tiles]
      .sort(() => Math.random() - 0.5)
      .map(tile => ({
        ...tile,
        id: Math.random()
      }));
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
  useEffect(() => {
    show_tiles();
  }, []);

  // Save Game State to local storage

  useEffect(
    () => {
      window.localStorage.setItem("cards_game_state", JSON.stringify(cards));
      window.localStorage.setItem("number_of_tries", JSON.stringify(turns));
    },
    [turns, choice1, choice2, cards]
  );

  // Check for matching cards

  useEffect(
    () => {
      if (choice1 && choice2) {
        setLocked(true);
        if (choice1.src === choice2.src) {
          setCards(prevTurns => {
            return prevTurns.map(card => {
              if (card.src === choice1.src) {
                return {
                  ...card,
                  matched: true
                };
              } else {
                return card;
              }
            });
          });
          // Allow for a smooth flip of the card
          setTimeout(() => resetTurn(), 1200);
        } else {
          setTimeout(() => resetTurn(), 1200);
        }
      }
    },
    [choice1, choice2]
  );
  // Reset the number of turns and restart the game
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setLocked(false);

    if (turns >= 20) {
      reset_tiles();
    }
  };
  // Include a Lottie animation
  return (
    <div className="App">
      <div className="c_animation">
        <Lottie animationData={memoryanimation} />
        <span>
          Tries : {turns}
          /15
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
        )}{" "}
      </div>
      <p>
        CardFlip is a timed card memory game. Click the cards to see what symbol
        they uncover and try to find the matching symbol underneath the other
        cards. Uncover two matching symbols at once to eliminate them from the
        game. Eliminate all cards as fast as you can to win the game
      </p>
    </div>
  );
}

export default App;
