export type Cell = {
  x: number;
  y: number;
  withBomb: boolean;
  open: boolean;
  bombsNearby: number;
};

export type Field = Cell[][];
