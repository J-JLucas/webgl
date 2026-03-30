// Takes a Maze object as input and
// generates a binary tree maze on it
export class BinTreeGenerator {

  static generate_maze(maze) {

    maze.grid.forEach(row => {
      row.forEach(cell => {
        const neighbors = [];

        if (cell.north) { neighbors.push(cell.north); }
        if (cell.east) { neighbors.push(cell.east); }
        if (neighbors.length === 0) return;

        const coinflip = Math.floor(Math.random() * neighbors.length);
        cell.link(neighbors[coinflip]);
      });
    });
  }
}
