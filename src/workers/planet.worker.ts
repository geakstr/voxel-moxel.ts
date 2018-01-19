import { queue } from "async";
import * as ndarray from "ndarray";
import { vec3 } from "gl-matrix";
import { getRandomTexture } from "../textures/getRandomTexture";
import {
  ATLAS,
  BLOCK_STRING_TO_INT_TYPE,
  PLANET_SIZE,
  CHUNK_SIZE,
  CHUNK_VOLUME,
  PLANET_BORDER
} from "../constants";
import { Chunk, Planet } from "../types";
import { fillChunkData } from "../creators/chunk";
import { createBlock } from "../creators/block";
import { prand } from "../utils/rand";

const planetsQ = queue<
  { reqid: number; planet: Planet; chunk: Chunk; position: vec3 },
  {}
>((task, callback) => {
  const { reqid, planet, chunk, position } = task;

  genChunksBases(reqid, planet, chunk, position);

  callback();
}, 1);

self.addEventListener(
  "message",
  e => {
    const { reqid, action, data } = e.data;

    switch (action) {
      case "BUILD_CHUNKS_AROUND": {
        planetsQ.push({
          reqid,
          planet: data.planet as Planet,
          chunk: data.chunk as Chunk,
          position: data.position as vec3
        });
        break;
      }
      default:
        break;
    }
  },
  false
);

const genBlocks = () => {
  const blocks = ndarray(new Uint8Array(CHUNK_VOLUME), [
    CHUNK_SIZE,
    CHUNK_SIZE,
    CHUNK_SIZE
  ]);

  // for (let x = 0; x < CHUNK_SIZE; x += 1) {
  //   for (let y = 0; y < CHUNK_SIZE; y += 1) {
  //     blocks[x][y] = [];
  //   }
  // }
  // for (let x = 0; x < PLANET_SIZE * CHUNK_SIZE; x += 1) {
  //   for (let z = 0; z < PLANET_SIZE * CHUNK_SIZE; z += 1) {
  //     const topY = Math.floor(
  //       (h(x / (PLANET_SKY * 4), 1, z / (PLANET_SKY * 4)) + 1) * PLANET_SKY / 2
  //     );

  //     for (let y = 0; y < topY; y++) {
  //       const tex = getRandomTexture();
  //       blocks[x][y][z] = BLOCK_STRING_TO_INT_TYPE[tex];
  //     }
  //   }
  // }

  for (let x = 0; x < CHUNK_SIZE; x += 1) {
    for (let y = 0; y < CHUNK_SIZE; y += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        // if (Math.random() >= 0.49) {
        const tex = getRandomTexture();
        blocks.set(x, y, z, BLOCK_STRING_TO_INT_TYPE[tex]);
        // }
      }
    }
  }
  return blocks;
};

// https://github.com/mikolalysenko/mikolalysenko.github.com/blob/gh-pages/MinecraftMeshes2/js/greedy_tri.js
const genChunksBases = (
  reqid: any,
  planet: Planet,
  chunk: Chunk,
  position: vec3
) => {
  const currentChunkX = Math.round(position[0] / CHUNK_SIZE) - 1;
  const currentChunkY = Math.round(position[1] / CHUNK_SIZE) - 1;
  const currentChunkZ = Math.round(position[2] / CHUNK_SIZE) - 1;

  for (let x = currentChunkX - 2; x <= currentChunkX + 2; x += 1) {
    for (let y = currentChunkY - 2; y < currentChunkY; y += 1) {
      for (let z = currentChunkZ - 2; z <= currentChunkZ + 2; z += 1) {
        const blocks = genBlocks();
        const chunkBase = fillChunkData(
          chunk,
          blocks,
          planet.x,
          planet.y,
          planet.z,
          x * CHUNK_SIZE,
          y * CHUNK_SIZE,
          z * CHUNK_SIZE
        );
        (self.postMessage as any)({
          resid: reqid,
          action: "BUILD_CHUNK",
          data: chunkBase
        });
      }
    }
  }
};

// const simplex = new (SimplexNoise as any)(Math.random);
// const h = (x: number, y: number, z: number) => {
//   return (simplex as any).noise3d(x, y, z);
// };

// const simplex2 = new (SimplexNoise as any)(Math.random);
// const c = (x: number, y: number, z: number) => {
//   return (simplex as any).noise3d(x, y, z);
// };
