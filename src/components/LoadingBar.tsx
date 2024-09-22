import React from 'react';
import './LoadingBar.css';

const LoadingBar: React.FC = () => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar"></div>
    </div>
  );
};

export {LoadingBar};