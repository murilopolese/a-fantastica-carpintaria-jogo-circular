// src/main.tsx

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './index.css';

import Home from './components/Home';
import Mission from './components/ui/Mission';
import { TutorialStep } from './components/TutoriaStep';
import { TutorialNextStep } from './components/TutorialNextStep';
import { TutorialFinalStep } from './components/TutorialFinalStep';
import Game from './components/Game';
import { useState } from 'react';

import trave from './assets/trave.png'

declare global {
  interface Window {
    umami?: any;
  }
}

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
  const [currentMission, setCurrentMission] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToMission = () => navigate('/mission');
  const goToStep = () => navigate('/step');
  const goToNextStep = () => navigate('/next-step');
  const goToFinalStep = () => navigate('/final-step');

  // These two need to bump the mission index *before* navigating.
  const goToGameIntro = () => {
    setCurrentMission((prev) => prev + 1);
    navigate('/game-intro');
  };
  const goToVictory = () => {
    setCurrentMission((prev) => prev + 1);
    navigate('/victory');
  };

  const goToGame = () => navigate('/game');
  const goToGameOver = () => navigate('/game-over');
  const goToNextMission = () => navigate('/game');

  useEffect(() => {
    if (window.umami) {
      window.umami.track(`pageview ${pathname}`);
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home onNavigate={goToMission} />} />

      <Route
        path="/mission"
        element={
          <M
            onNavigate={goToStep}
            {...mission[currentMission]}
          />
        }
      />

      <Route path="/step" element={<TutorialStep onNavigate={goToNextStep} />} />
      <Route path="/next-step" element={<TutorialNextStep onNavigate={goToFinalStep} />} />
      <Route
        path="/final-step"
        element={<TutorialFinalStep onNavigate={goToGameIntro} />}
      />

      <Route
        path="/game-intro"
        element={
          <M
            onNavigate={goToGame}
            {...mission[currentMission]}
          />
        }
      />

      <Route
        path="/game"
        element={
          <Game
            onGameOver={goToGameOver}
            onDeliver={goToVictory}
            missionTimeout={mission[currentMission].timeout || 0}
          />
        }
      />

      <Route
        path="/victory"
        element={
          <M
            onNavigate={goToNextMission}
            {...mission[currentMission]}
          />
        }
      />

      <Route
        path="/game-over"
        element={<M onNavigate={goToNextMission} {...gameover} />}
      />
    </Routes>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
