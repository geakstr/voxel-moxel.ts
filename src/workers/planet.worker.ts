import { getRandomTexture } from "../textures/getRandomTexture";
import {
  ATLAS,
  CUBE_STRING_TO_INT_TYPE,
  PLANET_SIZE,
  CHUNK_SIZE
} from "../constants";
import { Planet, Chunk } from "../types";
import { createChunk } from "../world/createChunk";

self.addEventListener(
  "message",
  e => {
    const { reqid, action, data } = e.data;

    switch (action) {
      case "BUILD_PLANET": {
        (self.postMessage as any)({
          resid: reqid,
          action: "BUILD_PLANET",
          data: buildPlanet(data as Planet)
        });
        break;
      }
      default:
        break;
    }
  },
  false
);

const buildPlanet = (planet: Planet): Planet => {
  planet.blocks = genBlocks();
  planet.chunks = genChunks(planet);
  return planet;
};

const genBlocks = () => {
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

const genChunks = (planet: Planet) => {
  const chunks: Chunk[] = [];
  for (let chunkX = 0; chunkX < PLANET_SIZE; chunkX += 1) {
    for (let chunkY = 0; chunkY < PLANET_SIZE; chunkY += 1) {
      for (let chunkZ = 0; chunkZ < PLANET_SIZE; chunkZ += 1) {
        chunks.push(
          createChunk(
            planet.blocks,
            planet.x,
            planet.y,
            planet.z,
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

// const simplex = new (SimplexNoise as any)(Math.random);
// const h = (x: number, y: number, z: number) => {
//   return (simplex as any).noise3d(x, y, z);
// };

// const simplex2 = new (SimplexNoise as any)(Math.random);
// const c = (x: number, y: number, z: number) => {
//   return (simplex as any).noise3d(x, y, z);
// };
