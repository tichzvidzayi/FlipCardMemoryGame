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

  //shuffle cards

const shuffle_tiles = () =>{

  const shuffled = [...tiles, ...tiles]
   .sort(() => Math.random() -0.5 )
   .map((tile)=> ({...tile, id:Math.random()})  )

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
//Check for matching cards

useEffect( ()=>{
 if (choice1 && choice2){

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


    resetTurn();
  }
  else{

   console.log('No match');
   resetTurn();
  }
 }


},[choice1, choice2])
console.log(cards);
const resetTurn = () => 
{
  setChoiceOne(null);
  setChoiceTwo(null);
  setTurns(prevTurns => prevTurns++);

}




  return (
    <div className="App">
       <h1> Flip cards</h1>
       <button onClick={shuffle_tiles}> New Game</button>

<div className='card_grid'>

 {cards.map(card => (
<SingleCard 
key = {card.id} 
card={card}
handleChoice ={handleChoice}
flipped = {card===choice1 || card === choice2 || card.matched}
/>
  ))} 

</div>

    </div>
  );
}

export default App;
