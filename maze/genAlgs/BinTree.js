// Takes a Maze object as input and
// generates a binary tree maze on it
export class BinTreeGenerator {

  static generate_maze(maze) {

    maze.grid.forEach(row => {
      row.forEach(cell => {

        const [r, c] = cell.position;
        const neighbors = [];

        if (r > 0) { neighbors.push(maze.get_cell(r - 1, c)); } // north
        if (c < maze.w - 1) { neighbors.push(maze.get_cell(r, c + 1)); } // east

        if (neighbors.length === 0) return;

        const coinflip = Math.floor(Math.random() * neighbors.length);
        cell.link(neighbors[coinflip]);
      });
    });
  }
}
