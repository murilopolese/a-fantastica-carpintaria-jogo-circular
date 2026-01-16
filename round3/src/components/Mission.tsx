import React from 'react';
import './Mission.css';
import trave from '../assets/trave.png'
import corner1 from '../assets/corner1.png'
import corner2 from '../assets/corner2.png'
import corner3 from '../assets/corner3.png'
import corner4 from '../assets/corner4.png'

const Mission: React.FC = () => {
  return (
    <div className="mission-container">

        <img src={corner1} className="shape top-left" />

        <img src={corner2} className="shape top-right"/>

        <img src={corner4} className="shape bottom-left"/>

        <img src={corner3} className="shape bottom-right"/>

      <div className="content">
        <div className="text-section">
          <h1 className="title">Desafio!</h1>

          <p className="bold-text">
            Sua missão começa agora!
          </p>

          <p className="description">
            Construa um gol de futebol para uma escola usando plástico descartado. 
            Colete, limpe, triture e processe o material dentro do tempo estipulado 
            para ganhar moedas como recompensa.
          </p>
        </div>

        <div className="illustration">
          <img src={trave} alt="trave" className="rectangle" />
        </div>
      </div>

      <div className="button"></div>
      
    </div>
  );
};

export default Mission;
