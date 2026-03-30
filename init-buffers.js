import { Maze } from "./maze/Maze.js"
import { BinTreeGenerator } from "./maze/generators/BinTree.js"
import { SidewinderGenerator } from "./maze/generators/Sidewinder.js";
import { MazeGeoBuilder } from "./MazeGeoBuilder.js";

function initBuffers(gl, generationAlg) {
  const positionBuffer = initPositionBuffer(gl, generationAlg);
  const colorBuffer = initColorBuffer(gl, positionBuffer.vertexCount);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function initPositionBuffer(gl, generationAlg) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  console.log("generating maze...");
  // Now generate maze geometry according to selected algorithm.
  const maze = new Maze(16, 16);

  switch (generationAlg) {
    case "binTree":
      BinTreeGenerator.generate_maze(maze);
      break;
    case "sidewinder":
      SidewinderGenerator.generate_maze(maze);
      break;
  }
  console.log(`Generated ${generationAlg} maze`);

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
    colors.push(0 / 255.0, 255.0 / 255.0, 166.0 / 255.0, 1.0);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };
