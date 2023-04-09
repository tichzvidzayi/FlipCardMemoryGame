//import logo from './logo.svg';
//  <img src={ } className="App-logo" alt="logo" />
import './App.css';

import {useState} from 'react';
import SingleCard from './components/SingleCard';

const tiles = [
{"src": "/img/dolphin.png"},
{"src": "/img/elephant.png"},
{"src": "/img/chick.png"},
{"src": "/img/rhino.png"},
{"src": "/img/kitten.png"},

]


function App() {

const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);

  //shuffle cards

const shuffle_tiles = () =>{

  const shuffled = [...tiles, ...tiles]
   .sort(() => Math.random() -0.5 )
   .map((tile)=> ({...tile, id:Math.random()})  )

   setCards(shuffled);
   setTurns(0);
}

console.log(cards, turns);


  return (
    <div className="App">
       <h1> Flip cards</h1>
       <button onClick={shuffle_tiles}> New Game</button>

<div className='card_grid'>

 {cards.map(card => (
<SingleCard key = {card.id} card={card}/>
  ))}

</div>

    </div>
  );
}

export default App;
