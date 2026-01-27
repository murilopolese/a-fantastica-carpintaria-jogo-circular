import React from 'react';
import './Game.css';

const Game: React.FC = () => {
  return (
    <div className="gameContainer">
      {/* Steps */}
      <div className="steps">
        <div className="background" />

        <div className="step">
          <div className="timer invisibleTimer" />
          <div className="clickable" />
          <div className="progress" />
          <div className="text">750 tampinhas coletadas.</div>
        </div>

        <div className="step">
          <div className="timer">
            <div className="number">3</div>
          </div>
          <div className="clickable" />
          <div className="progress" />
          <div className="text">750 tampinhas trituradas.</div>
        </div>

        <div className="step">
          <div className="timer">
            <div className="number">3</div>
          </div>
          <div className="clickable" />
          <div className="progress" />
          <div className="text">0 ripas prontas</div>
        </div>
      </div>

      {/* Mission */}
      <div className="mission">
        <div className="timer">
          <div className="number">1</div>
        </div>
        <div className="requirements">
          Para fazer a trave é preciso 3 ripas de plástico.
        </div>
        <div className="callToAction">
          Quão rápido você consegue terminar esse projeto?
        </div>
        <div className="button" />
      </div>
    </div>
  );
};

export default Game;
