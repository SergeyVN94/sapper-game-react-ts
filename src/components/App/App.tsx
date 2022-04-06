import React, { useState, useCallback, useEffect } from 'react';

import './App.css';

import { Cell, Field } from '../../types';
import { makeField, openNearbyEmptyCell, FieldSizeInit, findSell } from '../../lib';
import GameField from '../GameField/GameField';

function App() {
  const [fieldSize] = useState(FieldSizeInit);
  const [field, setField] = useState<Field>(() => makeField(fieldSize.w, fieldSize.h));
  const [gameState, setGameState] = useState<'running' | 'victory' | 'gameOver'>('running');
  const resetGame = useCallback(() => setField(makeField(fieldSize.w, fieldSize.h)), [setField, fieldSize]);

  useEffect(() => {
    if (gameState === 'running') return;

    setTimeout(() => {
      alert(gameState === 'gameOver' ? 'Game Over!' : 'You win!');
      resetGame();
      setGameState('running');
    }, 50);
  }, [gameState, resetGame]);

  const handleSellClick = (cell: Cell, type: 'select' | 'flag') => {
    if (cell.open || gameState === 'gameOver' || gameState === 'victory') return;

    const newField = [...field].map(
      row => [...row].map(_cell => ({ ..._cell }))
    );
    const targetSell = findSell(cell.x, cell.y, newField);
    if (!targetSell) return;

    if (type === 'flag') {
      targetSell.flag = !targetSell.flag;
      setField(newField);
      return;
    }

    if (targetSell.flag) {
      targetSell.flag = false;
      setField(newField);
      return;
    }

    targetSell.open = true;

    if (targetSell.bombsNearby === 0 && !targetSell.withBomb) openNearbyEmptyCell(targetSell, newField);
    setField(newField);

    if (targetSell.withBomb) {
      setGameState('gameOver');
      return;
    };

    const isVictory = newField.every(row => row.every(col => (col.open || col.flag)));
    if (isVictory) setGameState('victory');
  };

  return (
    <div className="App">
      <GameField field={field} onCellClick={handleSellClick} />
      <button type="button" onClick={resetGame} className="btn">Сбросить</button>
    </div>
  );
}

export default App;
