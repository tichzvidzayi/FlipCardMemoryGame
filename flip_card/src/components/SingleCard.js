import React from 'react'
import './SingleCard.css'
export default function SingleCard( {card, handleChoice}) {

const play = () =>{
handleChoice(card);
}  


  return (
      
      <div className = "card" >
   <div>
      <img className='front' src= {card.src} alt = 'front' />
      <img onClick ={play} className='back' src= "/img/cover.png" alt = 'back' />
   </div>
   </div>
   
  )
}
