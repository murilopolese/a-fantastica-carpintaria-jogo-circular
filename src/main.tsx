// src/main.tsx

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './components/Home';
import Mission from './components/ui/Mission';
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
    description:
      "Antes de colocar a mão na massa, você vai fazer um tour rápido pelas três etapas do processo: coleta, trituração e extrusão. Depois disso, é hora de construir o gol com plástico descartado.",
    illustrationSrc: trave,
  },
  {
    title: "Parabéns!",
    callToAction: "O tutorial acabou",
    description:
      "Você já conhece todas as etapas: coleta, trituração e extrusão. Agora é hora de colocar tudo junto e construir o gol com plástico reciclado.",
    illustrationSrc: trave,
    timeout: 60000
  },
  {
    title: "Nova Encomenda!",
    callToAction: "Você conseguiu! Agora tem mais trabalho e menos tempo.",
    description:
      "Você recebeu uma nova ordem para construir a trave com plástico reciclado. No entanto, o prazo é reduzido: apenas 45 segundos para terminar. Boa sorte!",
    illustrationSrc: trave,
    timeout: 45000
  },
  {
    title: "Nova Encomenda!",
    callToAction: "Você conseguiu! Agora tem mais trabalho e menos tempo.",
    description:
      "Você recebeu uma nova ordem para construir a trave com plástico reciclado. No entanto, o prazo é reduzido: apenas 30 segundos para terminar. Boa sorte!",
    illustrationSrc: trave,
    timeout: 30000
  },
  {
    title: "Nova Encomenda!",
    callToAction: "Você conseguiu! Agora tem mais trabalho e menos tempo.",
    description:
      "Você recebeu uma nova ordem para construir a trave com plástico reciclado. No entanto, o prazo é reduzido: apenas 20 segundos para terminar. Boa sorte!",
    illustrationSrc: trave,
    timeout: 20000
  }
];

const gameover = {
  title: "Desafio Não Concluído",
  callToAction: "Não desista – você ainda pode tentar!",
  description:
    "Você não conseguiu entregar a trave dentro do tempo estipulado, mas lembre-se: cada tentativa é uma oportunidade de melhorar. Tente novamente e veja o que você consegue alcançar!",
  illustrationSrc: trave
}

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
  const goToGameOver = () => setPage('game-over');
  const goToVictory = () => {
    setCurrentMission((prev) => prev + 1);
    setPage('victory');
  }
  const goToNextMission = () => {
    setPage('game');
  }

  useEffect(() => {
    if (window.umami) {
      window.umami.track(`pageview ${page}`);
    }

  }, [page])

  
  return (
    <>
      {page === 'home' && <Home onNavigate={goToMission} />}
      {page === 'mission' && <M onNavigate={goToStep} {...mission[currentMission]} />}
      {page === 'step' && <TutorialStep onNavigate={goToNextStep} />}
      {page === 'next-step' && <TutorialNextStep onNavigate={goToFinalStep} />}
      {page === 'final-step' && <TutorialFinalStep onNavigate={goToGameIntro} />}
      {page === 'game-intro' && <M onNavigate={goToGame} {...mission[currentMission]} />}
      {page === 'game' && <Game onGameOver={goToGameOver} onDeliver={goToVictory} missionTimeout={mission[currentMission].timeout||0} />}
      {page === 'victory' && <M onNavigate={goToNextMission} {...mission[currentMission]} />}
      {page === 'game-over' && <M onNavigate={goToNextMission} {...gameover} />}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
