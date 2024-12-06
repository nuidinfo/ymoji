import React, { useState, useEffect } from 'react';
import './../styles/memory-game.css'; // Add some CSS for styling
import DefaultLayout from '../layouts/DefaultLayout';
import { Button } from '@/components/ui/button';
import bottles from '../assets/cards/bottles.png';
import hot from '../assets/cards/hot.png';
import penguin from '../assets/cards/penguin.png';
import oil from '../assets/cards/oil.png';
import trash from '../assets/cards/trash.png';
import turtle from '../assets/cards/turtle.png';
import deadFish from '../assets/cards/dead_fish.png';
import fish from '../assets/cards/fish.png';

const imageSet = [bottles, hot, penguin, oil, trash, turtle, deadFish, fish];
const shuffledImages = [...imageSet, ...imageSet].sort(
  () => Math.random() - 0.5
);
const losingMessages = ['🤣', '😭', '😝', '🤪', '🥸', '🤡'];
const winningMessages = ['😶', '🙃', '🫠', '😓', '😌'];

function MemoryGame() {
  const [cards, setCards] = useState(shuffledImages);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        const randomMessage =
          winningMessages[Math.floor(Math.random() * winningMessages.length)]; // Random message on correct guess
        setMessage(randomMessage);
        setMatchedCards([...matchedCards, cards[firstIndex]]);
      } else {
        const randomMessage =
          losingMessages[Math.floor(Math.random() * losingMessages.length)]; // Random message on wrong guess
        setMessage(randomMessage);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  const handleCardClick = (index) => {
    if (!flippedCards.includes(index) && flippedCards.length < 2) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  const isFlipped = (index) =>
    flippedCards.includes(index) || matchedCards.includes(cards[index]);

  const resetGame = () => {
    setCards([...imageSet, ...imageSet].sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  return (
    <DefaultLayout>
      <div className='memory-game-container'>
        <h1 className='text-2xl'>🧠🎮</h1>
        <div className='memory-grid'>
          {cards.map((image, index) => (
            <div
              key={index}
              className={`memory-card ${isFlipped(index) ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className='memory-card-inner'>
                <div className='memory-card-front'>❓</div>
                <div className='memory-card-back'>
                  <img
                    src={image}
                    alt='Card'
                    className={`card-image ${image === fish ? 'rotated' : ''}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className='text-5xl'>
          {message.length > 0 &&
            matchedCards.length !== imageSet.length &&
            message}
        </p>
        <p className='text-5xl'>
          {matchedCards.length === imageSet.length ? '🎉🎊' : ''}
        </p>
        <Button
          disabled={matchedCards.length !== imageSet.length}
          onClick={resetGame}
          className='mt-2'
        >
          🔄🎮🌀
        </Button>
      </div>
    </DefaultLayout>
  );
}

export default MemoryGame;
