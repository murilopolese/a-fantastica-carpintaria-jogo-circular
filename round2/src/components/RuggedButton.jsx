import React from 'react';
import './RuggedButton.css';

export function RuggedButton({ onClick = () => false, children }) {
  return (
    <button className="rugged-button column" onClick={onClick}>
      <span className="top row">
        <span className="semi-circle"></span>
        <span className="semi-circle"></span>
        <span className="semi-circle"></span>
      </span>

      <span className="text">{children}</span>

      <span className="bottom row">
        <span className="semi-circle"></span>
        <span className="semi-circle"></span>
        <span className="semi-circle"></span>
      </span>
    </button>
  );
}
