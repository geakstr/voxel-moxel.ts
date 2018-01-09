import * as is from "is";
import { vec3 } from "gl-matrix";
import { getAtlas } from "~/textures";
import { ATLAS, ATLAS_SIZE, CROP_SIZE, getRandomTexture } from "~/textures";
import { getUniform, SHADER_UNIFORM } from "~/shaders";
import { createVertexArray } from "./common";
import { createCube, SIDE } from "./cube";
import { Planet } from "./planet";
import {
  CUBE_INT_TO_STRING_TYPE,
  PLANET_SIZE,
  PLANET_HEIGHT,
  PLANET_BORDER,
  PLANET_SKY,
  CHUNK_SIZE
} from "./constants";

export interface Chunk {
  readonly position: vec3;
  readonly vao: WebGLVertexArrayObject;
  readonly indicesCount: number;
}

export const createChunk = (
  gl: WebGL2RenderingContext,
  planet: Planet,
  xOffset: number,
  yOffset: number,
  zOffset: number
): Chunk => {
  const data = [];
  for (let x = 0; x < CHUNK_SIZE; x += 1) {
    for (let y = 0; y < CHUNK_SIZE; y += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        const cubeType = planet[xOffset + x][yOffset + y][zOffset + z];
        if (typeof cubeType !== "undefined") {
          const xx = x + xOffset;
          const yy = y + yOffset;
          const zz = z + zOffset;
          const texture = ATLAS[
            CUBE_INT_TO_STRING_TYPE[cubeType] as any
          ] as ATLAS;
          const cube = createCube(
            gl,
            xx,
            yy,
            zz,
            texture,
            renderableSides(planet, xx, yy, zz)
          );
          data.push(...cube);
        }
      }
    }
  }
  const indicesCount = data.length / 7 * 3 / 2;
  return {
    position: vec3.fromValues(xOffset, yOffset, zOffset),
    indicesCount,
    vao: createVertexArray(gl, data, indicesCount)
  };
};

const renderableSides = (
  planet: Planet,
  x: number,
  y: number,
  z: number
): SIDE[] => {
  const sides: SIDE[] = [];
  if (x + 1 > PLANET_BORDER || is.undefined(planet[x + 1][y][z])) {
    sides.push(SIDE.RIGHT);
  }
  if (x - 1 < 0 || is.undefined(planet[x - 1][y][z])) {
    sides.push(SIDE.LEFT);
  }
  if (z + 1 > PLANET_BORDER || is.undefined(planet[x][y][z + 1])) {
    sides.push(SIDE.FRONT);
  }
  if (z - 1 < 0 || is.undefined(planet[x][y][z - 1])) {
    sides.push(SIDE.BACK);
  }
  if (y + 1 > PLANET_SKY || is.undefined(planet[x][y + 1][z])) {
    sides.push(SIDE.TOP);
  }
  if (y - 1 < 0 || is.undefined(planet[x][y - 1][z])) {
    sides.push(SIDE.BOTTOM);
  }
  return sides;
};

export const renderChunk = (gl: WebGL2RenderingContext, chunk: Chunk) => {
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, getAtlas());
  gl.uniform1i(getUniform(SHADER_UNIFORM.SAMPLER), 0);
  gl.uniform2f(getUniform(SHADER_UNIFORM.TEX_INFO), ATLAS_SIZE, CROP_SIZE);

  gl.bindVertexArray(chunk.vao);
  gl.drawElements(gl.TRIANGLES, chunk.indicesCount, gl.UNSIGNED_INT, 0);
  gl.bindVertexArray(null);
};
