// src/main.tsx (or wherever you bootstrap your app)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import Home from './components/Home';
import Mission from './components/Mission';
import { useState } from 'react';

const App: React.FC = () => {
  const [page, setPage] = useState<'home' | 'mission'>('home');

  const goToMission = () => setPage('mission');

  return (
    <>
      {page === 'home' && <Home onNavigate={goToMission} />}
      {page === 'mission' && <Mission />}
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
