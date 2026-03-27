// Takes a Maze object as input and
// generates Sidewinder maze on it
export class SidewinderGenerator {

  static generate_maze(maze) {

    maze.grid.forEach(row => {
      const run = []

      row.forEach(cell => {
        // Add cell to current run
        run.push(cell);

        const heads = Math.random() > 0.5;
        const at_east_boundary = (cell.east === null);
        const at_north_boundary = (cell.north === null);
        const should_end_run = (at_east_boundary || (heads && !at_north_boundary));

        if (should_end_run) {
          // Choose a random cell from the run and open north
          // starting a new run afterward
          const coinflip = Math.floor(Math.random() * run.length);
          const run_cell = run[coinflip];
          const [r, c] = run_cell.position;

          if (run_cell.north) {
            run_cell.link(run_cell.north);
          }
          run.length = 0; // clear run array
        }
        else {
          // Go east
          cell.link(cell.east);
        }
      });
    });
  }
}
