// src/main.tsx (or wherever you bootstrap your app)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './components/Home';
import Mission from './components/Mission';
import { TutorialStep } from './components/TutoriaStep';
import { TutorialNextStep } from './components/TutorialNextStep';
import { TutorialFinalStep } from './components/TutorialFinalStep';
import Game from './components/Game';
import { useState } from 'react';

import trave from './assets/trave.png'

const mission = [
  {
    title: "Desafio!", 
    callToAction: "Sua missão começa agora!", 
    description: "Construa um gol de futebol para uma escola usando plástico descartado. Colete, triture e processe o material para aprender as etapas.",
    illustrationSrc: trave
  },
  {
    title: "Arrasou!", 
    callToAction: "A trave ficou ótima!", 
    description: "Ficou tão boa que querem outra! Agora é pra valer: Em quanto tempo você consegue entregar essa trave?",
    illustrationSrc: trave
  },
]

type MissionProps = {
  onNavigate: () => void;

  illustrationSrc: string;
  illustrationAlt?: string;

  title: string;
  callToAction: string;
  description: string;
};

const M: React.FC<MissionProps> = ({onNavigate, title, description, callToAction, illustrationSrc} : MissionProps) => (
  <Mission
    onNavigate={onNavigate}
    title={title}
    description={description}
    callToAction={callToAction}
    illustrationSrc={illustrationSrc}
    />
)


const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'mission' | 'step' | 'next-step' | 'final-step' | 'game-intro' | 'game'>('home');
  const [ currentMission, setCurrentMission ] = useState(0)

  const goToMission = () => setPage('mission');
  const goToStep = () => setPage('step');
  const goToNextStep = () => setPage('next-step');
  const goToFinalStep = () => setPage('final-step');
  const goToGameIntro = () => {
    setCurrentMission(prev => prev + 1)
    setPage('game-intro')
  }
  const goToGame = () => {
    setPage('game')
  }

  return (
    <>
      {page === 'home' && <Home onNavigate={goToMission} />}
      {page === 'mission' && <M onNavigate={goToStep} {...mission[currentMission]}  />}
      {page === 'step' && <TutorialStep onNavigate={goToNextStep} />}
      {page === 'next-step' && <TutorialNextStep onNavigate={goToFinalStep} />}
      {page === 'final-step' && <TutorialFinalStep onNavigate={goToGameIntro} />}
      {page === 'game-intro' && <M onNavigate={goToGame} {...mission[currentMission]} />}
      {page === 'game' && <Game />}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
