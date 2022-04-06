import React, { useState, useCallback } from 'react';
import './App.css';

import { Cell, Field } from './types';
import { makeField, openNearbyEmptyCell, FieldSizeInit } from './lib';
import GameField from './GameField';

function App() {
  const [fieldSize] = useState(FieldSizeInit);
  const [field, setField] = useState<Field>(() => makeField(fieldSize.w, fieldSize.h));
  const resetGame = useCallback(() => setField(makeField(fieldSize.w, fieldSize.h)), [setField, fieldSize]);

  const selectCell = (cell: Cell) => {
    if (cell.open) return;

    let openedCell: Cell | undefined;

    const newField = [...field].map(
      row => [...row].map(_cell => {
        if (_cell.open) return _cell;
        const openFlagNewState = (_cell.x === cell.x && _cell.y === cell.y);
        const newCell = { ..._cell, open: openFlagNewState };

        if (openFlagNewState) openedCell = newCell;

        return newCell;
      })
    );

    if (!openedCell) return;

    if (openedCell.bombsNearby === 0 || !openedCell.withBomb) openNearbyEmptyCell(openedCell, newField);
    setField(newField);
  };

  return (
    <div className="App">
      <GameField field={field} onCellClick={selectCell} />
      <button type="button" onClick={resetGame} className="btn">Сбросить</button>
    </div>
  );
}

export default App;
