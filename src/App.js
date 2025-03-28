import React, { useState, useEffect } from 'react';
import './App.css';

const bunnyPositions = [
  { id: 1, row: 0, col: 0 },
  { id: 2, row: 0, col: 1 },
  { id: 3, row: 0, col: 2 },
  { id: 4, row: 1, col: 0 },
  { id: 5, row: 1, col: 1 },
  { id: 6, row: 1, col: 2 },
  { id: 7, row: 2, col: 0 },
  { id: 8, row: 2, col: 1 },
  { id: 9, row: 2, col: 2 },
];

const App = () => {
  const [score, setScore] = useState(0);
  const [bunnyId, setBunnyId] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(30);

  // Randomly generate bunny appearance every second
  useEffect(() => {
    if (gameOver) return;
    const timerInterval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(timerInterval);
          setGameOver(true);
        }
        return prev - 1;
      });
      
      setBunnyId(bunnyPositions[Math.floor(Math.random() * bunnyPositions.length)].id);
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [gameOver]);

  const handleWhack = (id) => {
    if (id === bunnyId) {
      setScore(score + 1);
    }
  };

  return (
    <div className="game-container">
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Whack-a-Bunny</h1>
      <Scoreboard score={score} timer={timer} />
      <GameBoard bunnyId={bunnyId} handleWhack={handleWhack} />
      {gameOver && <h2 style={{ fontSize: '2rem' }}>Game Over! Your Score: {score}</h2>}
    </div>
  );
};

const GameBoard = ({ bunnyId, handleWhack }) => {
  return (
    <div className="board">
      {bunnyPositions.map((position) => (
        <Bunny
          key={position.id}
          id={position.id}
          bunnyId={bunnyId}
          handleWhack={handleWhack}
          position={position}
        />
      ))}
    </div>
  );
};

const Bunny = ({ id, bunnyId, handleWhack, position }) => {
  return (
    <div
      className={`bunny ${bunnyId === id ? 'visible' : ''}`}
      onClick={() => handleWhack(id)}
      style={{
        gridRowStart: position.row + 1,
        gridColumnStart: position.col + 1,
      }}
    ></div>
  );
};

const Scoreboard = ({ score, timer }) => {
  return (
    <div className="scoreboard">
      <div>Score: {score}</div>
      <div>Time: {timer}</div>
    </div>
  );
};

export default App;
