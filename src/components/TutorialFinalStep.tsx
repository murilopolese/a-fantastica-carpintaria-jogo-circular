import React, { useEffect, useState } from 'react';
import './TutorialFinalStep.css';

import extrusora from '../assets/extrusora.png';
import clock from '../assets/clock.png'
import ProgressBar from './ProgressBar';

type TutorialFinalStepProps = {
  onNavigate: () => void;
};

const target = 3;
const runTime = 3000;

export const TutorialFinalStep: React.FC<TutorialFinalStepProps> = ({ onNavigate }) => {
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
      setCounter(prev => Math.min(prev + 1, target));
    }, runTime);
  };

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onNavigate, 250);
      return () => clearTimeout(timer);
    }
  }, [visible, onNavigate]);

  return (
    <div className="tutorialFinalContainer">
      <div className="leftSide">
        <div className="currentStep">
          <div className="stepNumber">3</div>
          <div className="stepLabel">ripas</div>
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
            <img src={extrusora} alt="extrusora" />
            <div className="ripa"></div>
          </div>

          <ProgressBar percent={percent} />

          <p className="labelText">{counter} ripas prontas.</p>
        </div>
      </div>

      <div className="rightSide">
        <div className="textContainer">
          <p className="explanationText">
            As tampinhas trituradas são derretidas e viram ripas plásticas na
            máquina <strong>extrusora</strong>.
          </p>

          {counter === target ? (
            <button onClick={() => setVisible(false)}>Agora é entregar o projeto!</button>
          ) : on ? (
            <p className="callToAction">Extrudindo...</p>
          ) : (
            <p className="callToAction">
              Clique na extrusora para começar a produção!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
