import React from "react";
import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, locked }) {
  const play = () => {
    if (!locked) {
      handleChoice(card);
    }
  };

  return (
    <div className="card" onClick={play}>
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <img className="front" src={card.src} alt="front" />
        <img className="back" src="/img/cover.png" alt="back" />
      </div>
    </div>
  );
}
