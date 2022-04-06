import React from 'react'

import { Cell, Field } from '../../types';

import './game-field.css';

const FieldCell: React.FC<{
  cell: Cell,
  onClick: React.MouseEventHandler,
}> = ({ cell, onClick }) => {
  const classes = [
    'cell',
    cell.open && '_open',
    (!cell.withBomb && (cell.bombsNearby > 0)) && '_bombs-nearby',
    cell.withBomb && '_bomb',
    !cell.open && cell.flag && '_flag',
  ].filter(Boolean).join(' ');

  const handleContextMenuClick: React.MouseEventHandler = ev => {
    ev.preventDefault();
    onClick(ev);
  };

  return (
    <td
      className={classes}
      data-x={cell.x}
      data-y={cell.y}
      data-bombs-nearby={cell.bombsNearby}
      onClick={onClick}
      onContextMenu={handleContextMenuClick}
    >{cell.bombsNearby > 0 && cell.open && !cell.withBomb ? cell.bombsNearby : ''}</td>
  );
};

const GameField: React.FC<{
  onCellClick: (cell: Cell, type: 'select' | 'flag') => void,
  field: Field,
}> = ({ onCellClick, field }) => {
  const handleClick = (ev: React.MouseEvent, cell: Cell) => {
    if (![0, 2].includes(ev.button)) return;
    onCellClick(cell, ev.button === 0 ? 'select' : 'flag');
  };

  const fieldElements = field.map((row, rowI) => {
    const cells = row.map(cell => (
      <FieldCell
        key={`${cell.x}-${cell.y}`}
        cell={cell}
        onClick={ev => handleClick(ev, cell)}
      />
    ));

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
