import React from 'react';
import './Progress.css';

export function Progress({ value = 0 }) {
  return (
    <div className="progress">
      <div className="value" style={{ width: `${value}%` }}></div>
    </div>
  );
}
