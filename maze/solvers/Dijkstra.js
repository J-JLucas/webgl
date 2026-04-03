
export class Dijkstra {

  static solve(maze) {

    maze.distances = maze.entrance.distances();
    console.log(maze.draw_debug());

    maze.distances = maze.distances.path_to(maze.exit);
    console.log(maze.draw_debug());
  }
}
