import { Cell } from "./Cell.js";

export class Maze {
  constructor(height, width) {
    this.h = height;
    this.w = width;
    this.grid = [];

    this.init_grid();
    this.config_cells();
  }

  // Access cell at position
  get_cell(row, col) {
    if (row < 0 || row >= this.h) return null;
    if (col < 0 || col >= this.w) return null;

    return this.grid[row][col];
  }

  // Returns a random cell
  get_rand_cell() {
    const row = Math.floor(Math.random() * this.h);
    const col = Math.floor(Math.random() * this.w);

    return this.grid[row][col];
  }

  get size() {
    return this.h * this.w;
  }

  // Populates grid with Cell objects
  init_grid() {
    for (let i = 0; i < this.h; i++) {
      const row = [];
      for (let j = 0; j < this.w; j++) {
        row.push(new Cell(i, j));
      }
      this.grid.push(row);
    }
  }

  // Populates each cell's neighbors
  config_cells() {
    this.grid.forEach(row => {
      row.forEach(cell => {
        const [r, c] = cell.position;

        // N E S W 
        cell.north = this.get_cell(r - 1, c);
        cell.east = this.get_cell(r, c + 1);
        cell.south = this.get_cell(r + 1, c);
        cell.west = this.get_cell(r, c - 1);
      });
    });
  }

  draw_debug() {
    let output = "+" + "---+".repeat(this.w) + "\n";

    this.grid.forEach(row => {
      let top = "|";
      let bottom = "+";

      row.forEach(cell => {
        const body = "   ";
        const east_boundary = (cell.east && cell.isLinked(cell.east)) ? " " : "|";
        top += body + east_boundary;

        const south_boundary = (cell.south && cell.isLinked(cell.south)) ? "   " : "---";
        bottom += south_boundary + "+";
      });

      output += top + "\n";
      output += bottom + "\n";
    });

    return output;
  }
}

