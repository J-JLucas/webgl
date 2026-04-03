// Distances represents a collection of the distances
// between a root cell and every other cell in the grid
// with respect to the root
export class Distances {

  constructor(root) {
    this.root = root;
    this.cells = new Map();
    this.setDist(root, 0);
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

  path_to(goal) {
    let current = goal;
    const breadcrumbs = new Distances(this.root);
    breadcrumbs.setDist(current, this.getDist(current));

    while (current !== this.root) {

      for (const neighbor of current.links.keys()) {
        if (this.getDist(neighbor) < this.getDist(current)) {
          breadcrumbs.setDist(neighbor, this.getDist(neighbor));
          current = neighbor;
          break;
        }
      }
    }
    return breadcrumbs;
  }

}
