import React, { useEffect, useState } from 'react';
import './TutorialNextStep.css';

import trituradora from '../assets/trituradora.png';
import clock from '../assets/clock.png'
import ProgressBar from './ui/ProgressBar';
import Rugged from './ui/Rugged';

type TutorialNextStepProps = {
  onNavigate: () => void;
};

const target = 1500;
const runTime = 3000;

export const TutorialNextStep: React.FC<TutorialNextStepProps> = ({ onNavigate }) => {
  const [on, setOn] = useState(false);
  const [counter, setCounter] = useState(0);
  const [countDown, setCountDown] = useState(runTime)
  const [visible, setVisible] = useState(true)

  const percent = (counter / target) * 100;

  const handleClick = () => {
    if (on || counter === target) return;
    setOn(true);
    setCountDown(runTime)
    const interval = setInterval(() => {
      setCountDown(prev => prev - 1000)
    }, 1000)
    setTimeout(() => {
      clearInterval(interval)
      setOn(false);
      setCounter(prev => Math.min(prev + 500, target));
    }, runTime);
  };

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onNavigate, 250); // match CSS transition
      return () => clearTimeout(timer);
    }
  }, [visible, onNavigate]);

  return (
    <div className={`tutorialNextContainer ${visible ? '' : 'out'}`}>
      <div className="leftSide">
        <div className="currentStep">
          <div className="stepNumber">2</div>
          <div className="stepLabel">tritura</div>
        </div>

        <div className={`objectBox`}>

          <div className={`timer ${on ? 'on' : ''}`}>
            <img className='background' src={clock} />
            <div className="number">{Math.floor(countDown/1000)}</div>
          </div>

          <div
            className={`clickableBox ${on ? 'on' : ''} ${counter === target ? 'done' : ''}`}
            onClick={handleClick}
          >
            <img src={trituradora} alt="trituradora" />
          </div>

          <ProgressBar percent={percent} />

          <p className="labelText">{counter} tampinhas trituradas.</p>

        </div>
      </div>

      <div className="rightSide">
        <div className="textContainer">
          <p className="explanationText">
            Depois de coletar, você precisa triturar todas as tampinhas.
            <br /><br />
            Demora para triturar e só tritura <strong>500</strong> tampinhas por vez.
          </p>

          {counter === target ? (
            <div className="button"><Rugged onClick={() => setVisible(false)}>DERRETER</Rugged></div>
          ) : on ? (
            <p className="callToAction">Triturando...</p>
          ) : (
            <p className="callToAction">
              Clique na trituradora para ligar a máquina!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
