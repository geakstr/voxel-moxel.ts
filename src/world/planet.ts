import { vec4 } from "gl-matrix";
import { ATLAS, getRandomTexture } from "~/textures";
import * as frustum from "~/frustum";
import { position } from "~/camera";
import { Chunk, createChunk, renderChunk } from "./chunk";
import {
  CUBE_STRING_TO_INT_TYPE,
  CHUNK_SIZE,
  PLANET_SIZE,
  PLANET_HEIGHT,
  PLANET_SKY
} from "./constants";
import { SimplexNoise } from "./noise";

export type Planet = number[][][];

export const createPlanet = (gl: WebGL2RenderingContext) =>
  genChunks(gl, genPlanet());

export const renderPlanet = (
  gl: WebGL2RenderingContext,
  frustumPlanes: vec4[],
  chunks: Chunk[]
) => {
  const count = chunks.length;
  for (let i = 0; i < count; i += 1) {
    const chunk = chunks[i];
    if (frustum.isChunkInFrustum(frustumPlanes, chunk)) {
      renderChunk(gl, chunk);
    }
  }
};

const genPlanet = () => {
  const planet: Planet = [];
  for (let x = 0; x < PLANET_SIZE * CHUNK_SIZE; x += 1) {
    planet[x] = [];
    for (let y = 0; y < PLANET_HEIGHT * CHUNK_SIZE; y += 1) {
      planet[x][y] = [];
    }
  }
  for (let x = 0; x < PLANET_SIZE * CHUNK_SIZE; x += 1) {
    for (let z = 0; z < PLANET_SIZE * CHUNK_SIZE; z += 1) {
      const topY = Math.floor(
        (h(x / (PLANET_SKY * 4), 1, z / (PLANET_SKY * 4)) + 1) * PLANET_SKY / 2
      );

      for (let y = 0; y < topY; y++) {
        const tex = getRandomTexture();
        planet[x][y][z] = CUBE_STRING_TO_INT_TYPE[tex];
      }
    }
  }
  return planet;
};

const genChunks = (gl: WebGL2RenderingContext, world: Planet) => {
  const chunks: Chunk[] = [];
  for (let xOffset = 0; xOffset < PLANET_SIZE; xOffset += 1) {
    for (let yOffset = 0; yOffset < PLANET_HEIGHT; yOffset += 1) {
      for (let zOffset = 0; zOffset < PLANET_SIZE; zOffset += 1) {
        chunks.push(
          createChunk(
            gl,
            world,
            xOffset * CHUNK_SIZE,
            yOffset * CHUNK_SIZE,
            zOffset * CHUNK_SIZE
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
