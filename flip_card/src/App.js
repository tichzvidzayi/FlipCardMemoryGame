import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import Lottie from "lottie-react";
import memoryanimation from "./cardmemory.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const tiles = [
  { src: "/img/dolphin.png", matched: false },
  { src: "/img/elephant.png", matched: false },
  { src: "/img/chick.png", matched: false },
  { src: "/img/rhino.png", matched: false },
  { src: "/img/kitten.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choice1, setChoiceOne] = useState(null);
  const [choice2, setChoiceTwo] = useState(null);

  const [locked, setLocked] = useState(false);
  //shuffle cards

  const shuffle_tiles = () => {
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

  useEffect(() => {
    shuffle_tiles();
  }, []);


// Reset the game.




  //Check for matching cards

  useEffect(
    () => {
      if (choice1 && choice2) {
        setLocked(true);
        if (choice1.src === choice2.src) {
         // console.log(choice1.src + " cards matches");
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
        //  console.log("No match");
          setTimeout(() => resetTurn(), 1200);
        }
      }
    },
    [choice1, choice2]
  );
//  console.log(cards);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setLocked(false);

    if(turns >= 3)
    {
      toast("Wow so easy!");
      shuffle_tiles();
     // resetGame();
    }
  };

  return (
    <div className="App">
      <div className="c_animation"><Lottie animationData={memoryanimation}/>
      <span>
        Turns : {turns}
      </span>
      </div>
     
      <button
        onClick={shuffle_tiles}
      >New Game
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
      
      <p> Flip is a timed card memory game. 
        Click the cards to see what symbol they uncover and try to 
        find the matching symbol underneath the other cards.
         Uncover two matching symbols at once to eliminate them from the game.
          Eliminate all cards as fast as you can to win the game
      </p>
    </div>
  );
}

export default App;
