import { Cell, Field } from './types';

export const findSell = (x: number, y: number, field: Field): Cell | null => {
  if (x < 0 || x >= field[0].length) return null;
  if (y < 0 || y >= field.length) return null;

  return field[y][x];
};

export const FieldSizeInit = { w: 15, h: 15 };

// смещения координат всех ячеек вокруг ячейки [y, x]
export const mapPosNearbyCells = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export const makeField = (width: number, height: number) => {
  const field = Array(width).fill([]).map((_, rowI) => {
    const row: Cell[] = Array(height).fill({}).map((_, cellI) => {
      const randNum = Math.floor(Math.random() * 1000);

      return ({
        x: cellI,
        y: rowI,
        withBomb: randNum < 300 && randNum > 200,
        open: false,
        bombsNearby: 0,
      });
    });

    return row;
  });

  field.forEach((row) => {
    row.forEach((cell) => {
      const { x, y } = cell;
      let countBombs = 0;

      mapPosNearbyCells.forEach(([yOffset, xOffset]) => {
        const cell = findSell(x + xOffset, y + yOffset, field);
        if (cell) countBombs += cell.withBomb ? 1 : 0;
      });

      cell.bombsNearby = countBombs;
    });
  });

  return field;
};

export const openNearbyEmptyCell = (startCell: Cell, field: Field) => {
  const { x, y } = startCell;

  mapPosNearbyCells.forEach(([yOffset, xOffset]) => {
    const nearbyCell = findSell(x + xOffset, y + yOffset, field);

    if (!nearbyCell || nearbyCell.open || nearbyCell.withBomb) return;
    if (nearbyCell.bombsNearby > 0) {
      nearbyCell.open = true;
      return;
    }

    nearbyCell.open = true;
    openNearbyEmptyCell(nearbyCell, field);
  });
};
