import React, { useEffect, useState } from 'react';
import './TutorialStep.css';

import coletor from '../assets/coletor.png';
import ProgressBar from './ui/ProgressBar';
import Rugged from './ui/Rugged';

type TutorialStepProps = {
  onNavigate: () => void
}

export const TutorialStep: React.FC<TutorialStepProps> = ({ onNavigate }) => {
  // State and constants
  const [count, setCount] = useState(0);
  const [visible, setVisible] = React.useState(true);
  const capacity = 750;                               // renamed target → capacity
  const percent = Math.min((count / capacity) * 100, 100); // clamp to 100%

  // Click handler – never exceed the capacity
  const handleClick = () => {
    setCount(prev => Math.min(prev + 50, capacity));
  };
  
  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onNavigate, 250); // match CSS transition
      return () => clearTimeout(timer);
    }
  }, [visible, onNavigate]);

  return (
    <div className={`tutorialContainer ${visible ? '' : 'out'}`}>
      <div className="leftSide">
        <div className="currentStep">
          <div className="stepNumber">1</div>
          <div className="stepLabel">coleta</div>
        </div>

        <div className="objectBox">
          <div className={`clickableBox ${count >= capacity ? 'done': ''}`} onClick={handleClick}>
            <img src={coletor} alt="coletor" />
          </div>

          <ProgressBar percent={percent} />

          <p className="labelText">{count} tampinhas coletadas.</p>
        </div>
      </div>

      <div className="rightSide">
        <div className="textContainer">
          <p className="explanationText">
            Para fazer a trave é preciso coletar um total de <strong>3.000 tampinhas</strong>.
            <br /><br />
            Porém só cabem <strong>750 tampinhas</strong> no coletor.
          </p>

            {count >= capacity
              ? <div className="button"><Rugged onClick={() => setVisible(false)}>TRITURAR</Rugged></div>
              : <p className="callToAction">Clique no coletor para depositar tampinhas!</p>}

        </div>
      </div>
    </div>
  );
};
