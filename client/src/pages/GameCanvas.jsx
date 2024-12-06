import React, { useEffect, useState, useRef } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  let character = { x: 50, y: 100, size: 30 }; // Player character
  let obstacles = []; // Array of trash patches
  let speed = 2; // Speed of obstacles
  let animationFrameId;

  const emojis = ['🛍️', '🧴', '🍾', '🥤', '🚬']; // Plastic-related emojis
  const plants = ['🌿', '🌱', '🎋', '🍃']; // Ocean plant emojis

  // Add a new obstacle every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      obstacles.push({
        x: 800, // Start at the far right of the screen
        y: Math.random() * 400, // Random vertical position
        emoji: emojis[Math.floor(Math.random() * emojis.length)], // Random plastic emoji
      });
    }, 750);

    return () => clearInterval(interval);
  }, []);

  // Draw ocean plants at the bottom of the canvas
  const drawOceanPlants = (ctx) => {
    ctx.font = '20px Arial';
    for (let i = 0; i < 800; i += 50) {
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];
      ctx.fillText(randomPlant, i, 380); // Place plants near the bottom
    }
  };

  // Main game loop
  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ocean plants
    drawOceanPlants(ctx);

    // Draw character (🐟 emoji)
    // ctx.font = '30px Arial';
    // ctx.fillText('🐟', character.x, character.y + character.size);
    ctx.save(); // Save the current canvas state
    ctx.translate(
      character.x + character.size / 2,
      character.y + character.size / 2
    ); // Move to the character's position
    ctx.scale(-1, 1); // Flip horizontally
    ctx.translate(
      -(character.x + character.size / 2),
      -(character.y + character.size / 2)
    ); // Move back to origin
    ctx.fillText('🐟', character.x, character.y + character.size);
    ctx.restore(); // Restore the canvas state

    // Update and draw obstacles (plastic emojis)
    obstacles = obstacles.map((obstacle) => ({
      ...obstacle,
      x: obstacle.x - speed, // Move left
    }));

    obstacles.forEach((obstacle) => {
      ctx.fillText(obstacle.emoji, obstacle.x, obstacle.y + 20);

      // Check collision
      if (
        character.x < obstacle.x + 20 &&
        character.x + character.size > obstacle.x &&
        character.y < obstacle.y + 20 &&
        character.y + character.size > obstacle.y
      ) {
        setGameOver(true);
        cancelAnimationFrame(animationFrameId);
      }
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter((obstacle) => obstacle.x > 0);

    // Increment score
    setScore((prevScore) => prevScore + 1);

    // Continue the game loop
    animationFrameId = requestAnimationFrame(gameLoop);
  };

  // Start the game loop on mount
  useEffect(() => {
    animationFrameId = requestAnimationFrame(gameLoop);

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle player movement
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' && character.y > 0) character.y -= 20;
    if (e.key === 'ArrowDown' && character.y < 370) character.y += 20;
    if (e.key === 'ArrowLeft' && character.x > 0) character.x -= 20;
    if (e.key === 'ArrowRight' && character.x < 770) character.x += 20;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <DefaultLayout>
      {!gameOver ? (
        <div className='w-full'>
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className='w-full h-[100%]'
          />
          <div className='text-lg font-bold mt-2'>Score: {score}</div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='text-5xl font-bold mb-4'>💀 Game Over!</div>
          <p className='text-xl font-semibold mb-4'>
            🌟 Your Score: {score} 🌟
          </p>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all'
          >
            🔄
          </button>
        </div>
      )}
    </DefaultLayout>
  );
};

export default GameCanvas;
