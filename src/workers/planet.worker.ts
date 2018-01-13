import { queue } from "async";
import { getRandomTexture } from "../textures/getRandomTexture";
import {
  ATLAS,
  BLOCK_STRING_TO_INT_TYPE,
  PLANET_SIZE,
  CHUNK_SIZE,
  PLANET_BORDER
} from "../constants";
import { Planet, ChunkBase } from "../types";
import { createChunkBase } from "../creators/chunk";
import { createBlock } from "../creators/block";
import { prand } from "../utils/rand";

const planetsQ = queue<{ reqid: number; planet: Planet }, {}>(
  (task, callback) => {
    const { reqid, planet } = task;

    genChunksBases(reqid, planet);
    get(planet);

    callback();
  },
  1
);

self.addEventListener(
  "message",
  e => {
    const { reqid, action, data } = e.data;

    switch (action) {
      case "BUILD_PLANET": {
        planetsQ.push({
          reqid,
          planet: data as Planet
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
  const blocks: number[][][] = [];
  for (let x = 0; x < CHUNK_SIZE; x += 1) {
    blocks[x] = [];
    for (let y = 0; y < CHUNK_SIZE; y += 1) {
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
  //       blocks[x][y][z] = BLOCK_STRING_TO_INT_TYPE[tex];
  //     }
  //   }
  // }

  for (let x = 0; x < CHUNK_SIZE; x += 1) {
    for (let y = 0; y < CHUNK_SIZE; y += 1) {
      for (let z = 0; z < CHUNK_SIZE; z += 1) {
        // if (Math.random() >= 0.49) {
        const tex = getRandomTexture();
        blocks[x][y][z] = BLOCK_STRING_TO_INT_TYPE[tex];
        // }
      }
    }
  }
  return blocks;
};

// https://github.com/mikolalysenko/mikolalysenko.github.com/blob/gh-pages/MinecraftMeshes2/js/greedy_tri.js
const genChunksBases = (reqid: any, planet: Planet) => {
  for (let chunkX = 0; chunkX < PLANET_SIZE; chunkX += 1) {
    for (let chunkY = 0; chunkY < PLANET_SIZE; chunkY += 1) {
      for (let chunkZ = 0; chunkZ < PLANET_SIZE; chunkZ += 1) {
        const blocks = genBlocks();
        const chunkBase = createChunkBase(
          blocks,
          planet.x,
          planet.y,
          planet.z,
          chunkX * CHUNK_SIZE,
          chunkY * CHUNK_SIZE,
          chunkZ * CHUNK_SIZE
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

const get = (planet: Planet) => {
  const chunks: number[][][] = [];

  const setOrGetBlockType = (
    blockType: number,
    chunkX: number,
    chunkY: number,
    chunkZ: number,
    blockX: number,
    blockY: number,
    blockZ: number
  ) => {
    if (typeof chunks[chunkX] === "undefined") {
      chunks[chunkX] = [];
    }
    if (typeof chunks[chunkX][chunkY] === "undefined") {
      chunks[chunkX][chunkY] = [];
    }
    if (typeof chunks[chunkX][chunkY][chunkZ] === "undefined") {
      chunks[chunkX][chunkY][chunkZ] = blockType;
    }
    return chunks[chunkX][chunkY][chunkZ];
  };

  const createNewBlock = (
    blockType: number,
    chunkX: number,
    chunkY: number,
    chunkZ: number,
    blockX: number,
    blockY: number,
    blockZ: number
  ) => {};

  for (let chunkX = 0; chunkX < PLANET_SIZE; chunkX += 1) {
    for (let chunkY = 0; chunkY < PLANET_SIZE; chunkY += 1) {
      for (let chunkZ = 0; chunkZ < PLANET_SIZE; chunkZ += 1) {
        for (let blockX = 0; blockX < CHUNK_SIZE; blockX += 1) {
          for (let blockY = 0; blockY < CHUNK_SIZE; blockY += 1) {
            for (let blockZ = 0; blockZ < CHUNK_SIZE; blockZ += 1) {}
          }
        }
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
