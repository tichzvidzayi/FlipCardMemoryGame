import React from "react";
import "./SingleCard.css";
export default function SingleCard({ card, handleChoice, flipped, locked }) {
  const play = () => {
    if (!locked) {
      handleChoice(card);
      console.log(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="front" />
        <img onClick={play} className="back" src="/img/cover.png" alt="back" />
      </div>
    </div>
  );
}
