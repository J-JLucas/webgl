import { Maze } from "./Maze.js";
import { BinTreeGenerator } from "./genAlgs/BinTree.js";
import { SidewinderGenerator } from "./genAlgs/Sidewinder.js"

function main() {
  let h = 4;
  let w = 4;
  let maze = new Maze(h, w);

  /*
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const cell = maze.grid[i][j];
      console.log(cell);
    }
  }
  */

  //BinTreeGenerator.generate_maze(maze);
  SidewinderGenerator.generate_maze(maze);

  console.log(maze.draw_debug());

}

main();
