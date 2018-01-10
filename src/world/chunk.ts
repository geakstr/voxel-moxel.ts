import * as is from "is";
import { vec3 } from "gl-matrix";
import { getAtlas } from "~/textures";
import { ATLAS, ATLAS_SIZE, CROP_SIZE, getRandomTexture } from "~/textures";
import { getUniform, SHADER_UNIFORM } from "~/shaders";
import { createVertexArray } from "./common";
import { createCube, SIDE } from "./cube";
import {
  CUBE_INT_TO_STRING_TYPE,
  PLANET_SIZE,
  PLANET_BORDER,
  CHUNK_SIZE
} from "./constants";

export interface Chunk {
  position: vec3;
  indicesCount: number;
  vao?: WebGLVertexArrayObject;
}

export const createChunk = (
  blocks: number[][][],
  planetXOffset: number,
  planetYOffset: number,
  planetZOffset: number,
  chunkXOffset: number,
  chunkYOffset: number,
  chunkZOffset: number
): Chunk => {
  const data = [];
  for (let blockX = 0; blockX < CHUNK_SIZE; blockX += 1) {
    for (let blockY = 0; blockY < CHUNK_SIZE; blockY += 1) {
      for (let blockZ = 0; blockZ < CHUNK_SIZE; blockZ += 1) {
        const cubeType =
          blocks[chunkXOffset + blockX][chunkYOffset + blockY][
            chunkZOffset + blockZ
          ];
        if (typeof cubeType !== "undefined") {
          const xx = blockX + chunkXOffset;
          const yy = blockY + chunkYOffset;
          const zz = blockZ + chunkZOffset;
          const texture = ATLAS[
            CUBE_INT_TO_STRING_TYPE[cubeType] as any
          ] as ATLAS;
          const cube = createCube(
            xx + planetXOffset,
            yy + planetYOffset,
            zz + planetZOffset,
            texture,
            renderableSides(blocks, xx, yy, zz)
          );
          data.push(...cube);
        }
      }
    }
  }
  return {
    position: vec3.fromValues(
      chunkXOffset + planetXOffset,
      chunkYOffset + planetYOffset,
      chunkZOffset + planetZOffset
    ),
    indicesCount: data.length / 5 * 3 / 2
  };
};

const renderableSides = (
  blocks: number[][][],
  x: number,
  y: number,
  z: number
): SIDE[] => {
  const sides: SIDE[] = [];
  if (x + 1 > PLANET_BORDER || is.undefined(blocks[x + 1][y][z])) {
    sides.push(SIDE.RIGHT);
  }
  if (x - 1 < 0 || is.undefined(blocks[x - 1][y][z])) {
    sides.push(SIDE.LEFT);
  }
  if (z + 1 > PLANET_BORDER || is.undefined(blocks[x][y][z + 1])) {
    sides.push(SIDE.FRONT);
  }
  if (z - 1 < 0 || is.undefined(blocks[x][y][z - 1])) {
    sides.push(SIDE.BACK);
  }
  if (y + 1 > PLANET_BORDER || is.undefined(blocks[x][y + 1][z])) {
    sides.push(SIDE.TOP);
  }
  if (y - 1 < 0 || is.undefined(blocks[x][y - 1][z])) {
    sides.push(SIDE.BOTTOM);
  }
  return sides;
};

export const renderChunk = (gl: WebGL2RenderingContext, chunk: Chunk) => {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, getAtlas());
  gl.uniform1i(getUniform(SHADER_UNIFORM.SAMPLER), 0);

  gl.bindVertexArray(chunk.vao!);
  gl.drawElements(gl.TRIANGLES, chunk.indicesCount, gl.UNSIGNED_INT, 0);
  gl.bindVertexArray(null);
};
