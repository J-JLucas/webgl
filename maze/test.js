import { Maze } from "./Maze.js";
import { DistanceMaze } from "./DistanceMaze.js"
import { BinTreeGenerator } from "./generators/BinTree.js";
import { SidewinderGenerator } from "./generators/Sidewinder.js"
import { Dijkstra } from "./solvers/Dijkstra.js";

function main() {
  let h = 6;
  let w = 6;
  let maze = new DistanceMaze(h, w);

  /*
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const cell = maze.grid[i][j];
      console.log(cell);
    }
  }
  */



  // Generate
  //BinTreeGenerator.generate_maze(maze);
  SidewinderGenerator.generate_maze(maze);
  console.log(maze.draw_debug());

  // Solve
  Dijkstra.solve(maze);

}

main();
