import { Cell } from "./Cell";

export class Maze {
  constructor(height, width) {
    this.h = height;
    this.w = width;
    this.grid = [];

    this.init_grid();
    this.config_cells();
  }

  // access cell at position with bounds checking
  get_Cell(row, col) {
    if (row < 0 || row >= this.h) return undefined;
    if (col < 0 || col >= this.w) return undefined;

    return this.grid[row][col];
  }

  get_Rand_Cell() {
    //row = //random number [0,h]
    //col = //random number [0, w]

    return this.grid[row][col];
  }

  get size() {
    return this.h * this.w;
  }

  // populates grid with Cell objects
  init_grid() {
    for (let i = 0; i < this.h; i++) {
      const row = [];
      for (let j = 0; j < this.w; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
  }

  // populates each cell's neighbors
  config_cells() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        const [r, c] = cell.position;

        // N E S W 
        cell.neighbors[0] = this.get_Cell(r - 1, c);
        cell.neighbors[1] = this.get_Cell(r, c + 1);
        cell.neighbors[2] = this.get_Cell(r + 1, c);
        cell.neighbors[3] = this.get_Cell(r, c - 1);
      });
    });
  }
}

function main() {
  let h = 1;
  let w = 2;
  let maze = new Maze(h, w);

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const cell = maze.grid[i][j];
      console.log(cell);
    }
  }

  console.log(maze.grid[0][1].position);
}

main();
