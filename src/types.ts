export type Cell = {
  x: number;
  y: number;
  flag: boolean;
  withBomb: boolean;
  open: boolean;
  bombsNearby: number;
};

export type Field = Cell[][];
