import { getAtlas } from "~/textures";
import { ATLAS, ATLAS_SIZE, CROP_SIZE, getRandomTexture } from "~/textures";
import { getUniform, SHADER_UNIFORM } from "~/shaders";
import { createVertexArray } from "./common";
import { createCube, SIDE } from "./cube";

export interface Chunk {
  readonly vao: WebGLVertexArrayObject;
  readonly indicesCount: number;
}

export const CHUNK_SIZE = 10;

export const createChunk = (
  gl: WebGL2RenderingContext,
  xOffset: number,
  yOffset: number,
  zOffset: number
): Chunk => {
  const data = [];
  for (let x = 0; x < CHUNK_SIZE; x += 1) {
    for (let y = 0; y < CHUNK_SIZE; y += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        if (Math.random() > 0.2) {
          const cube = createCube(
            gl,
            x + xOffset,
            y + yOffset,
            z + zOffset,
            getRandomTexture(),
            [SIDE.ALL]
          );
          data.push(...cube);
        }
      }
    }
  }
  const indicesCount = data.length / 7 * 3 / 2;
  return {
    indicesCount,
    vao: createVertexArray(gl, data, indicesCount)
  };
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
