import { ATLAS, getRandomTexture } from "~/textures";
import { Chunk, createChunk, renderChunk } from "./chunk";
import {
  CUBE_STRING_TO_INT_TYPE,
  CHUNK_SIZE,
  WORLD_SIZE,
  WORLD_HEIGHT,
  WORLD_SKY
} from "./constants";
import { SimplexNoise } from "./noise";

export type World = number[][][];

export const createWorld = (gl: WebGL2RenderingContext) =>
  genChunks(gl, genWorld());

export const renderWorld = (gl: WebGL2RenderingContext, chunks: Chunk[]) => {
  const count = chunks.length;
  for (let i = 0; i < count; i += 1) {
    renderChunk(gl, chunks[i]);
  }
};

const genWorld = () => {
  const world: World = [];
  for (let x = 0; x < WORLD_SIZE * CHUNK_SIZE; x += 1) {
    world[x] = [];
    for (let y = 0; y < WORLD_HEIGHT * CHUNK_SIZE; y += 1) {
      world[x][y] = [];
    }
  }
  for (let x = 0; x < WORLD_SIZE * CHUNK_SIZE; x += 1) {
    for (let z = 0; z < WORLD_SIZE * CHUNK_SIZE; z += 1) {
      const topY = Math.floor(
        (h(x / (WORLD_SKY * 4), 1, z / (WORLD_SKY * 4)) + 1) * WORLD_SKY / 2
      );

      const cave = Math.max(
        3,
        Math.floor(
          (h(x / (WORLD_SKY / 2), 1, z / (WORLD_SKY / 2)) + 1) * WORLD_SKY / 6
        )
      );

      for (let y = 0; y < topY; y++) {
        if (y !== cave) {
          const tex = getRandomTexture();
          world[x][y][z] = CUBE_STRING_TO_INT_TYPE[tex];
        }
      }
    }
  }
  return world;
};

const genChunks = (gl: WebGL2RenderingContext, world: World) => {
  const chunks: Chunk[] = [];
  for (let xOffset = 0; xOffset < WORLD_SIZE; xOffset += 1) {
    for (let yOffset = 0; yOffset < WORLD_HEIGHT; yOffset += 1) {
      for (let zOffset = 0; zOffset < WORLD_SIZE; zOffset += 1) {
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
