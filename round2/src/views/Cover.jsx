// src/pages/Cover.jsx
import { RuggedButton } from '../components/RuggedButton';
import { Sponsors   } from '../components/Sponsors';
import lettering from '../assets/lettering.png'

import './Cover.css';            // ← our own stylesheet

/**
 * Props:
 *  - emit: function(name, payload) – optional callback that mimics
 *    Choo's event bus. If omitted the button does nothing.
 */
export default function Cover({ emit }) {
  const onBigButtonClick = () => {
    if (emit) emit('pushState', '#missao');
  };

  return (
    <div id="app" className="cover">
      {/* Lettering image */}
      <div className="lettering">
        <img
          src={lettering}
          alt="Jogo Circular - AFC 2025"
        />
      </div>

      {/* Re‑used pill components */}
      <div className='column'>
        <div className='row justify-center align-center'>
          <div className='column justify-center'>
            Vamos lá reciclar <br />
            resíduos plásticos?
          </div>
          <RuggedButton onClick={onBigButtonClick}>Iniciar</RuggedButton>
        </div>
      </div>
      <Sponsors />
    </div>
  );
}
