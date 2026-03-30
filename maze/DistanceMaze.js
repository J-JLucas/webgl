import { Maze } from "./Maze.js";
import { Distances } from "./Distances.js";

export class DistanceMaze extends Maze {
  constructor(height, width) {
    super(height, width);
    this.distances = new Distances();
  }

  contents_of(cell) {

    if (this.distances.getDist(cell) !== undefined) {
      return this.distances.getDist(cell).toString(32);
    }
    else {
      return super.contents_of(cell);
    }
  }
}
