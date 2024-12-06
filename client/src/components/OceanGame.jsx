// src/components/OceanGame.js
import React, { useState } from 'react';
import './OceanGame.css';

const OceanGame = () => {
  const [score, setScore] = useState(0);

  const handleTrashDrop = (e) => {
    // Add logic for trash falling and scoring
    setScore(score + 1);
  };

  return (
    <div className='ocean-game'>
      <h2 className='text-xl font-semibold'>Save the Ocean! 🌊♻️</h2>
      <div className='game-area' onClick={handleTrashDrop}>
        <p className='score'>Score: {score}</p>
        {/* Ocean game elements here */}
      </div>
    </div>
  );
};

export default OceanGame;
