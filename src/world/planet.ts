import { vec4 } from "gl-matrix";
import { ATLAS, getRandomTexture } from "~/textures";
import * as frustum from "~/frustum";
import { position } from "~/camera";
import { Chunk, createChunk, renderChunk } from "./chunk";
import { CUBE_STRING_TO_INT_TYPE, CHUNK_SIZE, PLANET_SIZE } from "./constants";
import { SimplexNoise } from "./noise";

export interface Planet {
  readonly chunks: Chunk[];
}

export const createPlanet = (
  gl: WebGL2RenderingContext,
  x: number,
  y: number,
  z: number
): Planet => ({
  chunks: genChunks(gl, genPlanet(), x, y, z)
});

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

const genPlanet = () => {
  const blocks: number[][][] = [];
  for (let x = 0; x < PLANET_SIZE * CHUNK_SIZE; x += 1) {
    blocks[x] = [];
    for (let y = 0; y < PLANET_SIZE * CHUNK_SIZE; y += 1) {
      blocks[x][y] = [];
    }
  }
  // for (let x = 0; x < PLANET_SIZE * CHUNK_SIZE; x += 1) {
  //   for (let z = 0; z < PLANET_SIZE * CHUNK_SIZE; z += 1) {
  //     const topY = Math.floor(
  //       (h(x / (PLANET_SKY * 4), 1, z / (PLANET_SKY * 4)) + 1) * PLANET_SKY / 2
  //     );

  //     for (let y = 0; y < topY; y++) {
  //       const tex = getRandomTexture();
  //       blocks[x][y][z] = CUBE_STRING_TO_INT_TYPE[tex];
  //     }
  //   }
  // }

  for (let x = 0; x < PLANET_SIZE * CHUNK_SIZE; x += 1) {
    for (let y = 0; y < PLANET_SIZE * CHUNK_SIZE; y += 1) {
      for (let z = 0; z < PLANET_SIZE * CHUNK_SIZE; z += 1) {
        // if (Math.random() >= 0.49) {
        const tex = getRandomTexture();
        blocks[x][y][z] = CUBE_STRING_TO_INT_TYPE[tex];
        // }
      }
    }
  }
  return blocks;
};

const genChunks = (
  gl: WebGL2RenderingContext,
  blocks: number[][][],
  planetXOffset: number,
  planetYOffset: number,
  planetZOffset: number
) => {
  const chunks: Chunk[] = [];
  for (let chunkX = 0; chunkX < PLANET_SIZE; chunkX += 1) {
    for (let chunkY = 0; chunkY < PLANET_SIZE; chunkY += 1) {
      for (let chunkZ = 0; chunkZ < PLANET_SIZE; chunkZ += 1) {
        chunks.push(
          createChunk(
            gl,
            blocks,
            planetXOffset,
            planetYOffset,
            planetZOffset,
            chunkX * CHUNK_SIZE,
            chunkY * CHUNK_SIZE,
            chunkZ * CHUNK_SIZE
          )
        );
      }
    }
  }
  return chunks;
};

const simplex = new (SimplexNoise as any)(Math.random);
const h = (x: number, y: number, z: number) => {
  return (simplex as any).noise3d(x, y, z);
};

const simplex2 = new (SimplexNoise as any)(Math.random);
const c = (x: number, y: number, z: number) => {
  return (simplex as any).noise3d(x, y, z);
};
