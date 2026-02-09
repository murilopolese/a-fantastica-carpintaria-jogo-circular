// src/components/GameVictory.tsx
import React from 'react';
import './GameVictory.css';   // optional styling

export const GameVictory: React.FC = () => (
  <div className="victoryContainer">
    <h1>Você venceu!</h1>
    <p>Parabéns por completar o desafio.</p>
    {/* You can add a button to return home if desired */}
  </div>
);
