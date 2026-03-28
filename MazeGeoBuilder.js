// Takes a maze object as input and 
// generates a 3d geometry as a set of vertices
// for use by OpenGL

export class MazeGeoBuilder {
  static build_geometry(maze, cell_size = 1) {
    const vertices = [];

    maze.grid.forEach(row => {
      row.forEach(cell => {
        // get cell coordinates
        const [r, c] = cell.position;
        const x1 = c * cell_size;
        const x2 = (c + 1) * cell_size;
        const y1 = r * cell_size;
        const y2 = (r + 1) * cell_size;

        // calc line geometry
        // lines represent walls

        // draw north border wall
        if (cell.north === null) {
          vertices.push(...[x1, y1, x2, y1]);
        }

        // draw east
        if (!cell.isLinked(cell.east)) {
          vertices.push(...[x2, y1, x2, y2]);
        }

        // draw south
        if (!cell.isLinked(cell.south)) {
          vertices.push(...[x1, y2, x2, y2]);
        }

        // draw west border wall
        if (cell.west === null) {
          vertices.push(...[x1, y1, x1, y2]);
        }
      });
    });
    return vertices;
  }
}
