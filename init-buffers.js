import { Maze } from "./maze/Maze.js"
import { SidewinderGenerator } from "./maze/genAlgs/Sidewinder.js";
import { MazeGeoBuilder } from "./MazeGeoBuilder.js";

function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl, positionBuffer.vertexCount);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function initPositionBuffer(gl) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.

  const maze = new Maze(16, 16);
  SidewinderGenerator.generate_maze(maze);
  const positions = MazeGeoBuilder.build_geometry(maze);

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return {
    buffer: positionBuffer,
    vertexCount: positions.length / 2,
  };
}

function initColorBuffer(gl, vertexCount) {
  const colors = [];

  for (let i = 0; i < vertexCount; i++) {
    colors.push(1.0, 1.0, 1.0, 1.0);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };
