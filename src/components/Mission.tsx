// Mission.tsx
import React from 'react';
import './Mission.css';

import corner1 from '../assets/corner1.png';
import corner2 from '../assets/corner2.png';
import corner3 from '../assets/corner3.png';
import corner4 from '../assets/corner4.png';

type MissionProps = {
  /** Callback that gets called after the fade‑out animation finishes. */
  onNavigate: () => void;

  /** Path / URL of the illustration image (e.g. '/assets/trave.png'). */
  illustrationSrc: string;
  /** Alt text for the illustration – useful for accessibility. */
  illustrationAlt?: string;

  /** The main title that appears in the left column. */
  title: string;
  /** Text that is styled as a “call‑to‑action” (the bold paragraph). */
  callToAction: string;
  /** Supporting description text. */
  description: string;
};

const Mission: React.FC<MissionProps> = ({
  onNavigate,
  illustrationSrc,
  illustrationAlt = '',
  title,
  callToAction,
  description,
}) => {
  const [visible, setVisible] = React.useState(true);

  const handleClick = () => {
    setVisible(false);
  };

  // Trigger the navigation callback once the fade‑out animation has finished.
  React.useEffect(() => {
    if (!visible) {
      const timer = setTimeout(onNavigate, 500); // 500 ms matches the CSS transition
      return () => clearTimeout(timer);
    }
  }, [visible, onNavigate]);

  const fadeClass = visible ? '' : 'out';

  return (
    <div className={`mission-container ${fadeClass}`}>
      {/* Decorative corners */}
      <img src={corner1} className="shape top-left" />
      <img src={corner2} className="shape top-right" />
      <img src={corner4} className="shape bottom-left" />
      <img src={corner3} className="shape bottom-right" />

      {/* Main content */}
      <div className="content">
        <div className="text-section">
          <h1 className="title">{title}</h1>

          <p className="bold-text">{callToAction}</p>

          <p className="description">{description}</p>
        </div>

        {/* Illustration – now driven by props */}
        <div className="illustration">
          <img src={illustrationSrc} alt={illustrationAlt} className="rectangle" />
        </div>
      </div>

      {/* The invisible button that triggers the fade‑out */}
      <div className="button" onClick={handleClick}></div>
    </div>
  );
};

export default Mission;
