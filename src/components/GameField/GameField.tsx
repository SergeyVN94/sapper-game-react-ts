import React from 'react'

import { Cell, Field } from '../../types';

import './game-field.css';

const FieldCell: React.FC<{ cell: Cell, onClick: () => void }> = ({ cell, onClick }) => {
  const classes = [
    'cell',
    cell.open && '_open',
    (!cell.withBomb && (cell.bombsNearby > 0)) && '_bombs-nearby',
    cell.withBomb && '_bomb',
  ].filter(Boolean).join(' ');

  return (
    <td
      className={classes}
      data-x={cell.x}
      data-y={cell.y}
      data-bombs-nearby={cell.bombsNearby}
      onClick={onClick}
    >{cell.bombsNearby > 0 && cell.open && !cell.withBomb ? cell.bombsNearby : ''}</td>
  );
};

const GameField: React.FC<{ onCellClick: (cell: Cell) => void, field: Field }> = ({ onCellClick, field }) => {
  const fieldElements = field.map((row, rowI) => {
    const cells = row.map(cell => (<FieldCell key={`${cell.x}-${cell.y}`} cell={cell} onClick={() => onCellClick(cell)} />));

    return (<tr className="row" key={rowI}>{cells}</tr>);
  });

  return (
    <table className="field">
      <tbody>
        {fieldElements}
      </tbody>
    </table>
  );
};

export default GameField;
