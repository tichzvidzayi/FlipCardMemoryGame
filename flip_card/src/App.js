//import logo from './logo.svg';
//  <img src={ } className="App-logo" alt="logo" />
import './App.css';

import {useEffect, useState} from 'react';
import SingleCard from './components/SingleCard';

const tiles = [
{"src": "/img/dolphin.png", matched: false},
{"src": "/img/elephant.png", matched: false},
{"src": "/img/chick.png", matched: false},
{"src": "/img/rhino.png", matched: false},
{"src": "/img/kitten.png", matched: false},

]


function App() {

const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);

const [choice1 , setChoiceOne] = useState (null);
const [choice2, setChoiceTwo] = useState (null);

const [locked, setLocked ] = useState(false);
  //shuffle cards

const shuffle_tiles = () =>{

  const shuffled = [...tiles, ...tiles]
   .sort(() => Math.random() -0.5 )
   .map((tile)=> ({...tile, id:Math.random()})  )
   setChoiceOne(null);
   setChoiceTwo(null);
   setCards(shuffled);
   setTurns(0);
}

const handleChoice = (card) =>
{
 if (choice1)
 {
  setChoiceTwo(card);
 }
 else
 {
  setChoiceOne(card);
 }
}

// Start the game automatically

useEffect(()=> {

  shuffle_tiles();
}, [])


//Check for matching cards

useEffect( ()=>{
  
 if (choice1 && choice2){
  setLocked(true);
  if(choice1.src === choice2.src){
    console.log( choice1.src +' cards matches');
   setCards(prevTurns => {
    return prevTurns.map(card => {
      if (card.src === choice1.src)
      { return {...card, matched:true}}
      else{
        return card;
      }

     } )
   })

   setTimeout(() =>resetTurn(), 1200);
  }
  else{

   console.log('No match');
   setTimeout(() =>resetTurn(), 1200);
  }
 }


},[choice1, choice2])
console.log(cards);
const resetTurn = () => 
{
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns + 1);
  setLocked(false);

}




  return (
    <div className="App">
       <h1> Flip cards</h1>
       <button   style={{ width: "100px", height: "50px",}}      onClick={shuffle_tiles}> New Game</button>

<div className='card_grid'>

 {cards.map(card => (
<SingleCard 
key = {card.id} 
card={card}
handleChoice ={handleChoice}
flipped = {card===choice1 || card === choice2 || card.matched}
locked ={locked}
/>
  ))} 

</div>
   <p> Turns :{turns} </p>
    </div>
  );
}

export default App;
