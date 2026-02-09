import React from 'react';
import './GameOver.css';   // optional – you can style as needed

const GameOver: React.FC = () => (
  <div className="game-over">
    <h1>Game Over</h1>
    <p>Você não conseguiu completar a trave no tempo estipulado.</p>
    {/* You can add more UI or a restart button if desired */}
  </div>
);

export default GameOver;
