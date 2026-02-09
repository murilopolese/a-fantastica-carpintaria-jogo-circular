// src/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './components/Home';
import Mission from './components/ui/Mission';
import { TutorialStep } from './components/TutoriaStep';
import { TutorialNextStep } from './components/TutorialNextStep';
import { TutorialFinalStep } from './components/TutorialFinalStep';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { GameVictory } from './components/GameVictory';   // NEW component
import { useState } from 'react';

import trave from './assets/trave.png'

const mission = [
  {
    title: "Desafio!",
    callToAction: "Sua missão começa agora!",
    description:
      "Construa um gol de futebol para uma escola usando plástico descartado. Colete, triture e processe o material para aprender as etapas.",
    illustrationSrc: trave,
  },
  {
    title: "Arrasou!",
    callToAction: "A trave ficou ótima!",
    description:
      "Ficou tão boa que querem outra! Agora é pra valer: Em quanto tempo você consegue entregar essa trave?",
    illustrationSrc: trave,
  },
];

type MissionProps = {
  onNavigate: () => void;
  illustrationSrc: string;
  illustrationAlt?: string;
  title: string;
  callToAction: string;
  description: string;
};

const M: React.FC<MissionProps> = ({
  onNavigate,
  title,
  description,
  callToAction,
  illustrationSrc,
}: MissionProps) => (
  <Mission
    onNavigate={onNavigate}
    title={title}
    description={description}
    callToAction={callToAction}
    illustrationSrc={illustrationSrc}
  />
);

const App: React.FC = () => {
  const [page, setPage] = useState<
    | 'home'
    | 'mission'
    | 'step'
    | 'next-step'
    | 'final-step'
    | 'game-intro'
    | 'game'
    | 'game-over'
    | 'victory'
  >('home');
  const [currentMission, setCurrentMission] = useState(0);

  /* ---- navigation helpers ------------------------------------------- */
  const goToMission = () => setPage('mission');
  const goToStep = () => setPage('step');
  const goToNextStep = () => setPage('next-step');
  const goToFinalStep = () => setPage('final-step');
  const goToGameIntro = () => {
    setCurrentMission((prev) => prev + 1);
    setPage('game-intro');
  };
  const goToGame = () => setPage('game');
  const goToGameOver = () => setPage('game-over');   // existing route
  const goToVictory = () => setPage('victory');       // NEW route

  return (
    <>
      {page === 'home' && <Home onNavigate={goToMission} />}
      {page === 'mission' && <M onNavigate={goToStep} {...mission[currentMission]} />}
      {page === 'step' && <TutorialStep onNavigate={goToNextStep} />}
      {page === 'next-step' && <TutorialNextStep onNavigate={goToFinalStep} />}
      {page === 'final-step' && <TutorialFinalStep onNavigate={goToGameIntro} />}
      {page === 'game-intro' && <M onNavigate={goToGame} {...mission[currentMission]} />}
      {page === 'game' && <Game onGameOver={goToGameOver} onDeliver={goToVictory} />}
      {page === 'game-over' && <GameOver />}
      {page === 'victory' && <GameVictory />}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
