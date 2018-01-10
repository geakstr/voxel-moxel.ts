import { vec4 } from "gl-matrix";
import { ATLAS, getRandomTexture } from "../textures";
import * as frustum from "../frustum";
import { position } from "../camera";
import { Chunk, createChunk, renderChunk } from "./chunk";
import { CUBE_STRING_TO_INT_TYPE, CHUNK_SIZE, PLANET_SIZE } from "./constants";
// import { SimplexNoise } from "./noise";

export interface Planet {
  chunks: Chunk[];
  blocks: number[][][];
  x: number;
  y: number;
  z: number;
  building: boolean;
}

export const createPlanet = (
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  z: number
): Planet => {
  const planet = {
    x,
    y,
    z,
    chunks: [],
    blocks: [],
    building: true
  };

  return planet;
};

export const renderPlanet = (
  gl: WebGL2RenderingContext,
  frustumPlanes: vec4[],
  planet: Planet
) => {
  const count = planet.chunks.length;
  for (let i = 0; i < count; i += 1) {
    const chunk = planet.chunks[i];
    if (frustum.isChunkInFrustum(frustumPlanes, chunk)) {
      renderChunk(gl, chunk);
    }
  }
};
