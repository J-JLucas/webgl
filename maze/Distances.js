// Distances represents a collection of the distances
// between a root cell and every other cell in the grid
// with respect to the root
export class Distances {

  constructor(root) {
    this.root = root;
    this.cells = new Map();
    this.cells[root] = 0;
  }

  getDist(cell) {
    return this.cells.get(cell);
  }

  setDist(cell, distance) {
    this.cells.set(cell, distance);
  }

  getCells() {
    return this.cells.keys();
  }
}
