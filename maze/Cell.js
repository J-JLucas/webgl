import { Distances } from "./Distances.js"

export class Cell {
  constructor(i, j) {
    //set position in grid
    this.i = i;
    this.j = j;
    //this.walls = [true, true, true, true] // N,E,S,W
    //this.neighbors = [null, null, null, null]; // Cell objects: N,E,S,W
    this.north = null;
    this.east = null;
    this.south = null;
    this.west = null;

    this.links = new Map();
  }

  get position() {
    return [this.i, this.j];
  }

  // Links both cells when biDirectional true
  // one-way link from this cell to arg cell when 
  // biDirectional false
  link(cell, biDirectional = true) {
    this.links.set(cell, true);

    if (biDirectional) {
      cell.link(this, false);
    }

    return;
  }

  // Unlinks two cells when biDirectional true
  // one-way unlink from this cell to arg cell when
  // biDirectional false
  unlink(cell, biDirectional = true) {
    this.links.set(cell, false);

    if (biDirectional) {
      cell.unlink(this, false);
    }

    return;
  }

  // Returns if this cell is linked
  // at least one-way from this cell to arg cell
  isLinked(cell) {
    return this.links.get(cell);
  }

  distances() {
    const distances = new Distances(this);
    distances.setDist(this, 0);
    let frontier = [this];

    while (frontier.length > 0) {
      const new_frontier = [];

      frontier.forEach((cell) => {
        for (const neighbor of cell.links.keys()) {
          if (distances.getDist(neighbor) !== undefined) { continue; }
          distances.setDist(neighbor, distances.getDist(cell) + 1);
          new_frontier.push(neighbor);
        }
      });
      frontier = new_frontier;
    }

    return distances;
  }

}
